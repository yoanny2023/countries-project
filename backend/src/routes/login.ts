import { Router,Request, Response } from "express";
import UserRepository from "../core/users/UserRepository";
import Jwt from "jsonwebtoken";

const router = Router();
const repo = new UserRepository();

router.post("/",async (req:Request,res:Response) => {
  const{email,password} = req.body;

  try {
    const user = await repo.findUserByEmail(email);

    const isCorrect = user && await repo.loginIsCorrect(email,password);
    if(!isCorrect){
      console.log("Invalid credentials")
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
      console.error("ACCESS_TOKEN_SECRET is not defined in environment!");
      res.status(500).json({ error: "Server misconfiguration" });
      return;
    }

    const userId = user?.id;
    const token = Jwt.sign(
      {id:userId},secret as string,{ expiresIn: "1h" }
    );
 
   res.status(200).json({token});
   return;

  }catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  } 
});

export default router;

/* email: user.email */