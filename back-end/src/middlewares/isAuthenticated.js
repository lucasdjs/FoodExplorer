import express from "express";
import jwt from "jsonwebtoken";


export function isAdmin(req, res, next) {
    // Verifica se o usuário é administrador
    if (req.isAdmin) {
        next(); // Se for administrador, chama o próximo middleware
    } else {
        res.status(403).json({ message: "Acesso negado. Você não é um administrador." });
    }
}

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

        req.userId = sub;
        req.isAdmin = false;

        next();
    } catch (error) {
        return res.status(401).end();
    }
}
