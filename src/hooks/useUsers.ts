import { useState } from "react";
import { Login, Signup, SignupValidator } from "../types/types";


export const useSignup = () => {
const [signUp, setSignUp] = useState<Signup>({
    username:'',
    email: '',
    password: '',
    confirmPassword: ''
    
  });
return { signUp, setSignUp}

}

export const useSignupError = () => {
  const [errors, setErrors] = useState<SignupValidator>({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
  });
 return { errors, setErrors}
}

export const useLogin = () => {
  const [login, setLogin] = useState<Login>({
    email:'',
    password:''
  });

  return {login, setLogin}
}
export const useLoginError = () => {
  const [errors, setErrors] = useState<Login>({
    email:'',
    password:''
  });

  return {errors, setErrors}
}