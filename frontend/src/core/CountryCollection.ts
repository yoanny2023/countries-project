import Request from "./Request";

export default class CountryCollection {
  async getAll(){
    const result = await Request.get("/countries");
    return result;
  }

  // added now to make login request to backend later
  async loginUser(email:string,password:string){
    const result = await Request.post("/login",{email,password});
    return result;
  }
}