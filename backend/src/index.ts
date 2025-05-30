import express from "express"
import cors from "cors"
import routerCountry from "./routes/countries";
import routerLogin from "./routes/login";
import routerRegister from "./routes/register";
import dotenv from "dotenv";

dotenv.config();

const PORT = 4000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
  origin:['http://localhost:3000','https://countries-project-theta.vercel.app'],
  credentials: true,
}));

app.use("/countries",routerCountry);
app.use("/login",routerLogin);
app.use("/register",routerRegister);

app.listen(PORT,()=>{
console.log("Server running on port:",PORT);
})