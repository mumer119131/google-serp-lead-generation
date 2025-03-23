
"use client";
import React from 'react'
import { ThemeProvider } from '@/context/ThermeContext';
import { Header } from '@/components/header/header';
import { AuthProvider } from '@/context/AuthContext';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    
    return (
      <AuthProvider>
        <ThemeProvider>
          <Header />
          {children}  
        </ThemeProvider>
      </AuthProvider>
  )
}

export default Layout