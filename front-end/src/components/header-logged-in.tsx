'use client';

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {CircleUser, Menu, Package2} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Account} from "@/components/account";

export function HeaderLoggedIn({children}) {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <header className="sticky min-w-screen w-full top-0 flex items-center justify-center h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            {children}

            {/*<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">*/}
            {/*    <DropdownMenu>*/}
            {/*        <DropdownMenuTrigger asChild>*/}
            {/*            <Button variant="secondary" size="icon" className="rounded-full">*/}

            {/*                <Account />*/}
            {/*                <span className="sr-only">Toggle user menu</span>*/}
            {/*            </Button>*/}
            {/*        </DropdownMenuTrigger>*/}
            {/*    </DropdownMenu>*/}
            {/*</div>*/}
        </header>
    )
}