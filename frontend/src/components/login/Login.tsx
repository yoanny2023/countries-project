"use client"
import React from 'react'
import Input from '../Input'
import Button from '../Button'
import Image from 'next/image'
import logo from "@/images/logo.png"
import { IconLockPassword, IconMail} from '@tabler/icons-react'
import Link from "next/link"
import {SubmitHandler, useForm} from "react-hook-form"
import { formSchema,formFields } from './schema/formSignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {toast} from "react-toastify"
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter();

  const {register,
    handleSubmit,
    setError,
    reset,
    formState:{errors,isSubmitting,isLoading}
  } = useForm<formFields>(
    {
      resolver:zodResolver(formSchema)}
  );

  const onFormSubmit: SubmitHandler<formFields> = async (data)=>{
    try {
        const resp = await fetch("http://localhost:4000/login",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
             email: data.email,
             password: data.password
          })
        });

         if(resp.status === 200){
          const responseData = await resp.json();
          const token = responseData.token;

          localStorage.setItem("token", token);

          //console.log("dados",token);

          toast.success("Successfully logged in");
          toast.info("Redirecting to flag page...");
          router.push("/flags/flag");
          reset();
         }else if(resp.status === 204 || resp.status === 401){
          toast.error("Invalid email or password");
          setError("root",{
          message: "one of the fields is incorrect!"
          })
         }
         else {
          throw new Error("Unexpected error");
        }
    } catch (error) {
      console.log("Login Error",error)
      setError("root",{
        message: "Network error or server is unavailable."
      });
    }
  }
 
  return (    
    <div className="w-[90%] my-4 xs_w sm:w-2/3 md:w-[60%] lg:w-5/12">
      <form onSubmit={handleSubmit(onFormSubmit)}
        className='flex flex-col gap-2 justify-center items-center
        border border-white/10 bg-zinc-800/30 backdrop-blur-md shadow-lg rounded-2xl
        px-4 padd_x2 sm:px-16 md:px-20 lg:px-14 xl:px-20 py-6 xl:py-10'> 
        
        <div className="relative w-[104px] aspect-[104/70]">
          <Image
            src={logo}
            alt="Logo image"
            fill
            className="object-contain"
            priority
            sizes="104px"
          />
        </div>
    
        <h2 className='text-2xl h_xsm sm:text-3xl font-semibold text-center
          bg-gradient-to-b from-white to-teal-500 text-transparent bg-clip-text'>
          Login to your account
        </h2>      
        <Input {...register("email")} 
          type='email' placeholder='example@email.com' label='Email'
          Icon={IconMail}
        />
        {errors.email && <div className='self-start text-sm text-red-500'>{errors.email.message}</div> }
        <Input {...register("password")} 
          type='password' placeholder='*****' label="Password"
          Icon={IconLockPassword}
        />
        {errors.password && <div className='self-start text-sm text-red-500'>{errors.password?.message}</div>}
        <Button 
          type='submit' 
          text='Login' 
          className='bg-gradient-to-b from-teal-600 to-teal-700 
          hover:from-teal-500 hover:to-teal-600 
          hover:border-teal-400 hover:scale-105 hover:shadow-lg
           w-full'
          isSubmitting ={isSubmitting}
          isLoading={isLoading}
        />
        {errors.root && <div className='text-sm text-red-500'>{errors.root.message}</div> }
      </form>
       <div className="flex items-center gap-2 w-full">
            <div className="w-full border-t border-zinc-500" />
            <span className="font-semibold text-sm text-zinc-500 mt-2">OR</span>
            <div className="w-full border-t border-zinc-500" />
          </div>
          <p className="text-sm text-center text-zinc-400 font-semibold tracking-wide">
             Don't have an account yet?
                <Link
                  href={"/signUp"}
                  className="
                    text-teal-600 hover:text-teal-500 transition-colors duration-500
                    cursor-pointer
                    hover:underline
                  "
                > Register here</Link>
            </p>
    </div>
  )
}

export default Login;
