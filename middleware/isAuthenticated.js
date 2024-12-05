import {User, Business} from "../models/association.js";
import { verifyJWT } from "../services/jwt.js";
import jwt from 'jsonwebtoken';

const userAuthMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    };
    const token = authorization.split(' ')[1];
    try {
        const decoded = verifyJWT(token);
        const user = await User.findByPk(decoded.id);
        if (user) {
            if (decoded.type == 'business' ) {
                return res.status(403).json({
                    message: "Unauthorized! User route is not accessible",
                    redirectTo: "business"
                });
            }
            req.user = decoded;
            next();
        }
        else  {
            return res.status(403).json({
                message: "Unauthorized! Kindly register",
                redirectTo: "register"
            });
        }
        
    }
    catch (error) {
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    }
}

const loginAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({message: "No token provided", redirectTo: "login"});
    }
    else {
        return res.status(200).json({success: true, message: "Login Successfully"});
    }
}

const businessAuthMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    };
    const token = authorization.split(' ')[1];
    try {
        // const decoded = verifyJWT(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const business = await Business.findByPk(decoded.id);
        if (business) {
            if (decoded.type == 'user' ) {
                return res.status(403).json({
                    message: "Unauthorized! Business route is not accessible",
                    redirectTo: "/"
                });
            }
            req.business = decoded;
            next();
        }
        else  {
            return res.status(403).json({
                message: "Unauthorized! Kindly register",
                redirectTo: "register"
            });
        }
        
    }
    catch (error) {
        console.log(error)
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    }

}
export {userAuthMiddleware, loginAuth, businessAuthMiddleware};