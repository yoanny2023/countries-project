import { Router } from "express";
import CountryRepo from "../core/flags/CountryRepository";

const router = Router();

router.get("/",async (req,res)=>{
 /*  try {
    const data = await CountryRepo.getAllFlags();
  res.status(200).send(data);
  } catch (error) {
    res.status(404).send()
  } */
  const data = await CountryRepo.getAllFlags();
  res.status(200).send(data);
});

export default router;