import { Router,Request, Response } from "express";
import UserRepository from "../core/users/UserRepository";
import Jwt from "jsonwebtoken";

const router = Router();
const repo = new UserRepository();

router.post("/",async (req:Request,res:Response) => {
  const{email,password} = req.body;

  try {
    const user = await repo.findUserByEmail(email);

    if(!user) {
      console.log("User not registered yet")
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isCorrect = await repo.loginIsCorrect(email,password);
    if(!isCorrect){
      console.log("Invalid credentials")
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = Jwt.sign(
      {email},
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

   res.status(200).json({token});
   return;

  }catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  } 
});

export default router;