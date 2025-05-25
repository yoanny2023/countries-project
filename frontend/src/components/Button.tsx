import React,{ButtonHTMLAttributes} from 'react'

interface ButtonProps{
  type?: "button" | "submit" | "reset"
  text:string
  onClick?: ()=> void
  className?:string
  isSubmitting?:boolean
  isLoading?:boolean
} 
function Button(props:ButtonProps) {
  return (
    <button 
      type={props.type}
      disabled={props.isSubmitting}
      onClick={props.onClick}
      className={`
       transition-all duration-500 text-white font-medium
       px-4 py-2 rounded-md mt-2
      ${props.className ?? ""}
      ${props.isSubmitting ? "cursor-not-allowed":""}
      `}>
       {props.isSubmitting ? "Loading..." : props.text } 
    </button>
  )
}

export default Button
