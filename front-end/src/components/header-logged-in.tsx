"use client";

import {useAccount, useDisconnect, useEnsAvatar, useEnsName} from "wagmi";
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {CircleUser, Menu, Package2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Account} from "@/components/account";
import Logo from "./ui/Logo";
import {ConnectWallet} from "@/components/connect-wallet";

export function HeaderLoggedIn({children}) {
    const {address} = useAccount();
    const {data: ensName} = useEnsName({address});
    const {data: ensAvatar} = useEnsAvatar({name: ensName!});

    return (
        <header
            className="sticky min-w-screen w-full top-0 py-4 items-center gap-4 border-b border-muted bg-background px-4 md:px-6">
            <div className="container relative lg:px-10 flex items-center justify-between">
                <Link className="" href="/">
                    <Logo width={40} height={40}/>
                </Link>
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-4">
                    {children}
                </div>
                <div className="inline-flex items-center justify-end">
                    <ConnectWallet/>
                </div>
            </div>
        </header>
    );
}
