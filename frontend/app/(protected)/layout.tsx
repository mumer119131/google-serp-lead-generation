"use client"
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const router = useRouter();

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             // Replace this with your actual authentication check logic
    //             const response = await axios.get("/api/auth/authenticate", {withCredentials: true});
    //             if (response.status === 200) {
    //                 setIsAuthenticated(true);
    //             } else {
    //                 router.push("/login");
    //             }
    //         } catch {
    //             router.push("/login");
    //         }
    //     };

    //     checkAuth();
    // }, [router]);

    // if (!isAuthenticated) {
    //     return <div>Loading...</div>;
    // }

    return <>{children}</>;
}