import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    if (typeof err === "string") {
        const is404 = err.toLowerCase().endsWith("not found");
        const statusCode = is404 ? 404 : 400;
        res.status(statusCode).json({ message: err });
        return;
    }

    res.status(500).json({ message: err.message || "Internal Server Error" });
};

export default errorHandler;