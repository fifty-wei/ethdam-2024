'use client';


import { useEffect, useState } from "react";

import { ApiSdk } from "@bandada/api-sdk";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { HeaderLoggedIn } from "@/components/header-logged-in";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function InviteCode() {

    // Get the user address
    const { address } = useAccount();

    const { inviteCode } = useParams<{ inviteCode: string }>();

    const apiSdk = new ApiSdk()
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_ADMIN_API_KEY!;

    const [alreadyRedeem, setAlreadyRedeem] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);


    useEffect(() => {
        if (!address) { return };
        if (!inviteCode) { return };
        if (alreadyRedeem) { return };
        useInvitationCode();
    }, [inviteCode]);

    const useInvitationCode = async () => {
        // Get the invite information
        const invite = await apiSdk.getInvite(inviteCode, apiKey)
        console.log(invite);

        // Check if the invite code has already been redeemed
        if (invite["isRedeemed"] === true) {
            setAlreadyRedeem(true);
            return;
        }

        // Use the invite code
        const invitedResp = await apiSdk.addMemberByInviteCode(
            invite["group"]["id"],
            address,
            inviteCode.toString()
        );

        console.log(invitedResp);

        setIsAccepted(true);
    }

    return (
        (isAccepted ? (
            <>

                <div className="bg-background relative min-h-screen isolate overflow-hidden">

                    <HeaderLoggedIn>
                        <span className="font-semibold">Join the community</span>
                        <Button size="icon" className="absolute right-2">
                            <Check className="h-5 w-5" />
                            <span className="sr-only">Join the community</span>
                        </Button>
                    </HeaderLoggedIn>

                    <div
                        className="mx-auto flex items-center justify-center max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                        <div
                            className="mx-auto flex flex-col gap-8 items-center text-center max-w-6xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                    Congratulations, join the next chapter
                                </h1>

                                {/* TODO :: Redirect to a chapter */}
                                <Button variant="outline">
                                    <Link href={`/`}>
                                        Next chapter
                                    </Link>
                                </Button>
                        </div>
                    </div>


                </div>

            </>
        ) : (
            <>
                <div className="bg-background relative min-h-screen isolate overflow-hidden">

                    <HeaderLoggedIn>
                        <span className="font-semibold">Join the community</span>
                        <Button size="icon" className="absolute right-2">
                            <Check className="h-5 w-5" />
                            <span className="sr-only">Join the community</span>
                        </Button>
                    </HeaderLoggedIn>

                    <div
                        className="mx-auto flex items-center justify-center max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                        <div
                            className="mx-auto flex flex-col gap-8 items-center text-center max-w-6xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                    The invite code is already used...
                                </h1>
                        </div>
                    </div>

                    

                </div>
            </>
        ))
    )
}
