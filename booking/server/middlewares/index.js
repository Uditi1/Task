import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
    // secret , expiryDate
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});