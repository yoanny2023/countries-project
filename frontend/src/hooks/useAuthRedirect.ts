import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {useEffect } from "react";

export default function useAuthRedirect(){
  const router = useRouter();
  useEffect(()=>{
  if(typeof window !== "undefined"){
      const token = localStorage.getItem("token")
  if(!token){
    toast.error("Unauthorized, please login!");
    router.push("/")
  }
  }
  },[router])
}