import { Request, Response, Router } from "express";
import CountryRepo from "../core/flags/CountryRepository";
import verifyToken from "../middlewares/authentication";

const router = Router();

router.get("/",verifyToken,async (req:Request,res:Response):Promise<void> => {
  const data = await CountryRepo.getAllFlags();
  res.status(200).send(data);  
});

export default router;