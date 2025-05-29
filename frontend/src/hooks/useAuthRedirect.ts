import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {useLayoutEffect } from "react";

export default function useAuthRedirect(){
  const router = useRouter();
  useLayoutEffect(()=>{
  const token = localStorage.getItem("token")
  if(!token){
    toast.error("Unauthorized, please login!");
    router.push("/")
  }
  },[router])
}