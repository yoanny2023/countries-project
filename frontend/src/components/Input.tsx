import React,{InputHTMLAttributes, forwardRef, useState }  from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  type:string
  label:string
  placeholder?:string
  className?:string   
  Icon?:any
  error?:string | undefined
}

const Input = forwardRef<HTMLInputElement, InputProps>((props,ref) => {
  const{type, label, placeholder, className, Icon,error, ...rest } = props;
  const[showPassword,setShowPassword] = useState(false)

  function handleShowPassword(){
    setShowPassword(!showPassword);
  }

  return (
    <div className='flex flex-col gap-1 w-full'>
      <div className="flex justify-between items-center">
        <label className='text-zinc-400 text-sm' htmlFor={label}>{label}</label>
          {error && (
            <div className='self-start text-sm text-red-500'>{error}</div>)
          }
      </div>
      
      <div className="flex gap-2 justify-center items-center
       bg-zinc-700 px-4 py-2 text-white rounded-md  
         focus-within:border focus-within:border-teal-600 focus-within:bg-zinc-800/90">
        <input
         type={showPassword ? "text" :type} 
         id={label} 
         placeholder={placeholder} 
         ref={ref}
         {...rest}
         className={`flex-1 focus:outline-none bg-transparent
         ${className ?? ""}`}
      />
      {Icon && (
        <Icon className="text-teal-500" size={18} stroke={1}
        onClick={handleShowPassword}          
      />)}
      </div>
     
    </div>
  )
});

Input.displayName = "Input";
export default Input
