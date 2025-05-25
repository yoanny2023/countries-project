import Request from "./Request";
import Router from "next/router";
import {toast} from "react-toastify";

export default class CountryCollection {
  async getAll(){
    const result = await Request.get("/countries");
    return result;
  }

  static logoutHandler(){
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    toast.info("Redirecting to login...");
    Router.push("/");
  }

  // added now to make login request to backend later
  async loginUser(email:string,password:string){
    const result = await Request.post("/login",{email,password});
    return result;
  }
}