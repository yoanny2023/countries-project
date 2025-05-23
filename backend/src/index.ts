import express from "express"
import cors from "cors"
import routerCountry from "./routes/countries";

const PORT = 4000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/countries",routerCountry);

app.listen(PORT,()=>{
console.log("Server running on port:",PORT);
})