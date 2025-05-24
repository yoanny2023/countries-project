import { Router,Request, Response  } from "express";
import UserRepository from "../core/users/UserRepository";

const router = Router();
const repo = new UserRepository();

router.post("/",async(req:Request,res:Response):Promise<void> => {
  try {
    const{name,email,password} = req.body;

    const ifExists = await repo.userExists(email)
    if (ifExists) {
      console.log("User already exists!")
      res.status(409).json({ error: "User already exists" });
      return;
    }

    await repo.registerUser(name, email, password);
    console.log("registado com successo!");
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
     console.error("Registration error:", error);
     res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;