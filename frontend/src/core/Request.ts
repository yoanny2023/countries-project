/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import Router from "next/router";  

//from frontend make request to the backend
export default class Request {

static port = 4000;
static baseUrl = process.env.NEXT_PUBLIC_API_URL || `http://localhost:${this.port}`;

static getHeaders():HeadersInit{

  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  // enable cors from different origin.
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

static async generalRerest(method:string,urlComplement:string,bodyData?:any){
  try {
      const response = await fetch(`${this.baseUrl}${urlComplement}`,{
      method:method,
      headers:this.getHeaders(),
      body:JSON.stringify(bodyData)
    });
    
     if (response.status === 401) {
        console.warn("Unauthorized request");
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          Router.push("/"); 
          return;
          
      }

    const result = response.status !== 204 ? await response.json() : null;
    return result
  } catch (error) {
    toast.error("Server error or network issue");
    return { error: true, message: "Network/server error" };
  }
}

static async get(urlComplement:string){
  const result = await Request.generalRerest("GET",urlComplement);
  return result;
}

//added for later.
static async post(urlComplement:string,bodyData:any){
  const result = await Request.generalRerest("POST",urlComplement,bodyData);
  return result;
}
}