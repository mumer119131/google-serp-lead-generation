"use client"
import React, {useState} from 'react'
import { Input } from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Text from '@/components/generic/Text'
import Link from 'next/link'
import { SignUpRequestInput, SignUpRequestSchema } from '../../libs/validations';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const RegisterForm = () => {
    const [formData, setFormData] = useState<SignUpRequestInput>({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key in keyof SignUpRequestInput]?: string }>({});
    const router = useRouter();
    const {login} = useAuth()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setErrors({});
        // Validate input using Zod
        const result = SignUpRequestSchema.safeParse(formData);
        if (!result.success) {
          const formattedErrors = result.error.format();
          setErrors({
            name: formattedErrors.name?._errors[0],
            email: formattedErrors.email?._errors[0],
            password: formattedErrors.password?._errors[0],
          });
          return;
        }
    
        // Submit data to API
        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            const data = await response.json();
            const message = data.message;
            throw new Error(message || "Signup failed");
          }
          
          login()
          router.push("/dashboard");
          console.log("User signed up successfully");
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
            console.error(error.message);
          }
          console.error(error);
        }
      };

    return (
    <form onSubmit={handleSubmit} className='max-w-[20rem] flex flex-col gap-2'>
            <h1 className='font-bold text-2xl text-center uppercase'>Register</h1>
            <Text >Create your new account.</Text>
            {error && <Text className='!text-red-700'>{error}</Text>}
            <Input placeholder='Name' className='max-w-[20rem]' name='name' onChange={handleChange} errors={errors.name}/>
            <Input placeholder='Email' className='max-w-[20rem]' name='email' onChange={handleChange} errors={errors.email}/>
            <Input placeholder='Password' type='password' className='max-w-[20rem]' name='password' onChange={handleChange} errors={errors.password}/>
            <Button className='max-w-[20rem] min-w-[20rem]' variant='secondary'>Register</Button>
            <Text className='text-center'>Already have an account? <Link href="/login"><b>Login</b></Link></Text>
    </form>
  )
}

export default RegisterForm