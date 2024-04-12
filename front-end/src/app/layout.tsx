'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '../config'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactNode} from "react";

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
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          {children}
          </QueryClientProvider>
      </WagmiProvider>
      </body>
    </html>
  );
}
