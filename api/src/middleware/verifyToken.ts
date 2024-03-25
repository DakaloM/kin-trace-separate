import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.toString().split(" ")[1];
    jwt.verify(token, accessSecret, (err, data) => {
      if (err)
        return res.status(403).json({
          message:
            err.message === "jwt expired"
              ? "Token expired "
              : `Token invalid ${token}`,
        });

      req.user = data;
      next();
    });
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.query.userId || req.user.role === "Admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Permission Denied!", user: req.user });
    }
  });
};

const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "Permission Denied!" });
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
