import { useState } from "react";
import { Signup, SignupValidator } from "../types/types";


export const useSignup = () => {
const [signUp, setSignUp] = useState<Signup>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    date:'',
  });
return { signUp, setSignUp}

}

export const useSignupError = () => {
  const [errors, setErrors] = useState<SignupValidator>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
 return { errors, setErrors}
}