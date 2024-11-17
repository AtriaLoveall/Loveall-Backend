import jwt from 'jsonwebtoken';

const createJWT = (payload) => {
    console.log("Creating JWT with payload:", payload);
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: 60 * 60 * 24 * 7}
    );
    console.log("Created token:", token.substring(0, 10) + "...");
    return token;
}

const verifyJWT = (token) => {
    try {
        console.log("Verifying JWT:", token.substring(0, 10) + "...");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT verified successfully. Decoded:", decoded);
        return decoded;
    } catch (error) {
        console.error("Error in JWT verification:", error);
        throw new Error("Unauthorized! Kindly login");
    }
}

export {createJWT, verifyJWT};