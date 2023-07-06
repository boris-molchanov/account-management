import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import getSecret from "./createAccessSecret";

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

async function isAuthenticated (req, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    
    if (!authorization) {
        createError(401, 'Un-Authorized error')
    }
    
    try {
        const token = authorization.split(' ')[1];
        const accessSecret = await getSecret(jwtAccessSecret);

        const payload = jwt.verify(token, accessSecret);
        req.payload = payload;
        next();
    } catch (err) {
        next(createError(401, 'Un-Authorizedsss error'))
    }
}

export default isAuthenticated;