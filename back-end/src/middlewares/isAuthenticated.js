import express from "express";
import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    
    if (!authToken) {
        console.log("Token não encontrado");
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = jwt.verify(
            token,
            "SecretKey"
        );
        console.log(sub);
        next(); // Chame a próxima função middleware
    } catch (error) {
        return res.status(401).end();
    }
}
