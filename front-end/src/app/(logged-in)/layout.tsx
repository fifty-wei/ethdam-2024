'use client';

import {PropsWithChildren} from "react";
import {useAccount} from "wagmi";
import LoginPage from "@/components/login-page";

export default function LoggedInLayout({children}: PropsWithChildren) {
    const {isConnected} = useAccount();

    if( !isConnected ) {
        return <LoginPage />;
    }

    return isConnected && (
        <>
            {children}
        </>
    );
}
