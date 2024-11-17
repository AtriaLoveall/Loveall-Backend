import Business from "../models/Business.model.js"; // Import the Business model
import { verifyJWT } from "../services/jwt.js";

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    console.log("Authorization header:", authorization);
    if (!authorization) {
        console.log("No authorization header found");
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    };

    const token = authorization.split(' ')[1];
    console.log("Extracted token:", token ? token.substring(0, 10) + "..." : "null");

    try {
        const decoded = await verifyJWT(token);
        console.log("Decoded token:", decoded);

        // Query the business table with the decoded business_id
        const business = await Business.findByPk(decoded.id);
        if (business) {
            console.log("Business found:", business.business_id);
            req.user = decoded;
            next();
        } else {
            console.log("Business not found in database");
            return res.status(403).json({
                message: "Unauthorized! Kindly register",
                redirectTo: "register"
            });
        }
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    }
};

const loginAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("Authorization header in loginAuth:", token);
    if (!token) {
        console.log("No token provided in loginAuth");
        return res.status(403).json({message: "No token provided", redirectTo: "login"});
    } else {
        console.log("Token found in loginAuth");
        return res.status(200).json({success: true, message: "Login Successfully"});
    }
};

export { authMiddleware, loginAuth };
