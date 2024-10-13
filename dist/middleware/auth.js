"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // receiving token from cookie
    if (!token) {
        res.status(401).send('Access Denied');
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
};
exports.authenticateToken = authenticateToken;
const authorizeRole = (role) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            res.status(403).send('Permission Denied');
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
