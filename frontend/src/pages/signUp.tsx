"use client"
import Button from '@/components/Button'
import Input from '@/components/Input'
import Pagina from '@/components/Pagina'
import { formFields, formSchema } from '@/components/sign-up/schema/formSignUpSchema'
import logo from "@/images/logo.png"
import { zodResolver } from '@hookform/resolvers/zod'
import { IconLockPassword, IconMail, IconUser } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {useForm,SubmitHandler} from "react-hook-form"
import {toast} from "react-toastify"

function signUp() {
  const router = useRouter();

  const{
    register,
    handleSubmit,
    setError,
    reset,
    formState:{errors,isSubmitting}
  } = useForm<formFields>({
    resolver: zodResolver(formSchema)
  });

    const onFormSubmit:SubmitHandler<formFields> = async (data) => {
      try {
          const res = await fetch("http://localhost:4000/register",{
            method:"POST",
            headers:{
             "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
        })
        });
          
        if(res.ok){
          console.log(data);
          reset();
          toast.success("Registered successfully!");
          toast.info("Redirecting to Login page");
          router.push("/");
        }else if(res.status === 409){
          toast.error("User already exists!");
        } else {
         toast.error("Something went wrong. Try again.");
        }
      } catch (error) {
        setError("root",{
          message:"Network error. Please try again later."
        })
      }
  }

  return (
    <Pagina>
     <div className="w-5/12">
           <form onSubmit={handleSubmit(onFormSubmit)}
            className='flex flex-col gap-2 justify-center items-center
             border border-white/10 bg-zinc-800/30 backdrop-blur-md shadow-lg rounded-2xl
             px-16 py-6' >  
             <Image src={logo} width={104} height={90} alt='Logo image'
             className="w-24 h-auto" style={{height:"auto"}}
             />
             <h2 className='text-3xl font-semibold 
               bg-gradient-to-b from-white to-teal-500 text-transparent bg-clip-text'>
               Create an account  
             </h2>
             <Input {...register("name")} type='text' placeholder='Name' label='Name'
             Icon={IconUser} error={errors.name?.message} />   
             <Input {...register("email")} type='email' placeholder='example@email.com' label='Email'
             Icon={IconMail} error={errors.email?.message}
             />
             <Input {...register("password")} type='password' placeholder='*****' label="Password"
             Icon={IconLockPassword} error={errors.password?.message}
             />
             <Input {...register("confirmPassword")} type='password' placeholder='confirm password' label="Confirm password"
             Icon={IconLockPassword} error={errors.confirmPassword?.message}
             />
             <Button type='submit' text='Register' className='w-full'
             isSubmitting={isSubmitting}
             />
             {errors.root && (<div className='self-start text-sm text-red-500'>
            {errors.root?.message}
             </div>)} 
           </form>
            <div className="flex items-center gap-2 w-full">
                 <div className="w-full border-t border-zinc-500" />
                 <span className="font-semibold text-sm text-zinc-500 mt-2">OR</span>
                 <div className="w-full border-t border-zinc-500" />
               </div>
               <p className="text-sm text-center text-zinc-400 font-semibold tracking-wide
                   ">Already have an account? {" "}
                     <Link
                       href={"/"}
                       className="
                         text-teal-600 hover:text-teal-500 transition-colors duration-500
                         cursor-pointer
                         hover:underline
                       "
                     >Login here</Link>
                 </p>
         </div>
    </Pagina>
    
  )
}

export default signUp
