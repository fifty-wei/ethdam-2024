'use client';


import { useState } from "react";

import { ApiSdk } from "@bandada/api-sdk";
import { useParams } from "next/navigation";

export default function InviteCode() {

    const { inviteCode } = useParams<{ inviteCode: string }>();

    const apiSdk = new ApiSdk()
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_ADMIN_API_KEY!;

    return (
        <>
        <p>
            User should be accepted - nice
        </p>

        </>
    )
}
