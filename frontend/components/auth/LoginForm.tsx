"use client"
import React, {useState} from 'react'
import { Input } from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Text from '@/components/generic/Text'
import Link from 'next/link'
import { LoginRequestSchema, LoginRequestInput } from '../../libs/validations';
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginRequestInput>({
        email: '',
        password: ''
    })
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [errors, setErrors] = useState<{ [key in keyof LoginRequestInput]?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate input using Zod
        const result = LoginRequestSchema.safeParse(formData);
        if (!result.success) {
          const formattedErrors = result.error.format();
          setErrors({
            email: formattedErrors.email?._errors[0],
            password: formattedErrors.password?._errors[0],
          });
          console.log('Error:', formattedErrors);
          console.log(formData);
          return;
        }
    
        // Submit data to API
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Signup failed");
          }
          

          console.log("User signed up successfully");
          router.push('/dashboard')
        } catch (error) {
          console.error(error);
        }
      };

    return (
    <form onSubmit={handleSubmit} className='max-w-[20rem] flex flex-col gap-2'>
            <h1 className='font-bold text-2xl text-center uppercase'>Login</h1>
            <Text >Login into your account.</Text>
            <Input placeholder='Email' className='max-w-[20rem]' name='email' onChange={handleChange} errors={errors.email}/>
            <Input placeholder='Password' className='max-w-[20rem]' name='password' onChange={handleChange} errors={errors.password}/>
            <Button className='max-w-[20rem] min-w-[20rem]' variant='secondary'>Login</Button>
            <Text className='text-center'>Do not have an account? <Link href="/register"><b>Register</b></Link></Text>
    </form>
  )
}

export default LoginForm