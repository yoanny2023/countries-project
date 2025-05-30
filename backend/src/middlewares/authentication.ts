/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export default function verifyToken(req:Request,res:Response,next:NextFunction):void{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
     res.status(401).json({error:"Notoken provided!"});
     return;
  }

  const token = authHeader?.split(" ")[1];
  try {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
   res.status(403).json({ error: "Invalid token" });
   return;
  }
}