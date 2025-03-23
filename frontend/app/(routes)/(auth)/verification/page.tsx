"use client"
import CardWrapper from '@/components/generic/CardWrapper'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { MdMarkEmailRead } from "react-icons/md";
import axios from 'axios';

const Page = () => {

    const [timer, setTimer] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/auth/verification/resend', { withCredentials: true });
            setTimer(60);
            const countdown = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-[calc(100vh-60px)]">
            <CardWrapper className='max-w-[25rem]'>
                <div className="text-center flex flex-col items-center space-y-2">
                    <MdMarkEmailRead className='text-5xl'/>
                    <h1 className="text-2xl font-semibold">Account Verification</h1>
                    <p className="text-gray-500">Please check your email to verify your account.</p>
                    <p className="text-gray-500 text-sm">*If you do not see the verification email in your inbox, please check your spam or junk folder before requesting a new one.</p>
                    <form onSubmit={handleSubmit}>
                        <Button type='submit' className="text-blue-500" disabled={timer > 0}>
                            {timer > 0 ? `Resend in ${timer}s` : 'Resend Verification Email'}
                        </Button>
                    </form>
                </div>
            </CardWrapper>
        </div>
    )
}

export default Page