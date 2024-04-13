'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { wagmiConfig } from '../config/wagmi'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactNode, useEffect, useState} from "react";
import {ClientOnly} from "@/components/client-only";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {


    return (
        <html lang="en">
        <body className={inter.className}>
        <ClientOnly>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                        {children}
                </QueryClientProvider>
            </WagmiProvider>
        </ClientOnly>
        </body>
        </html>
  );
}
