'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { HeaderLoggedIn } from "@/components/header-logged-in";
import { Input } from "@/components/ui/input";
import { Check, CircleUser, Plus, RefreshCw } from "lucide-react";
import { Account } from "@/components/account";
import { Button } from "@/components/ui/button";


import { useState } from "react";

import { ApiSdk } from "@bandada/api-sdk";

export default function Community() {

    const apiSdk = new ApiSdk()
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_ADMIN_API_KEY!;

    let [emails, setEmails] = useState([""]);
    let invitationLinks = [];

    const [isForm, setIsForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    

    // https://github.com/bandada-infra/bandada/tree/main/libs/api-sdk
    // https://bandada.pse.dev/groups
    async function submitForm(event) {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);

        let title = formData.get("title");
        let description = formData.get("description");

        if (title === "" || description === "") {
            console.log("Please fill the form...");
            return;
        }

        // Create a group 
        const groupCreateDetails = {
            name: title,
            description: description,
            treeDepth: 16,
            fingerprintDuration: 3600
        }

        const group = await apiSdk.createGroup(groupCreateDetails, apiKey)
        let groupId = group["id"];

        // Create an invite for each email defined
        console.log("Create invitations...")
        for (var i = 0; i < emails.length; i++) {
            const invite = await apiSdk.createInvite(groupId, apiKey)
            invitationLinks.push(invite["code"]);
        }


        setIsLoading(false);
        setIsForm(false);
    }

    const addEmail = () => {
        setEmails([...emails, ""]);
    }


    return (
        (isForm ? (
            <>
                <form onSubmit={e => submitForm(e)}
                    className="bg-background relative min-h-screen isolate overflow-hidden">

                    <HeaderLoggedIn>
                        <span className="font-semibold">Create a commmunity</span>
                        <Button size="icon" className="absolute right-2">
                            <Check className="h-5 w-5" />
                            <span className="sr-only">Create a commmunity</span>
                        </Button>
                    </HeaderLoggedIn>

                    <div
                        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                        />
                    </div>
                    <div
                        className="mx-auto flex items-center justify-center max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                        <div
                            className="mx-auto flex flex-col gap-8 items-center text-center max-w-6xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">


                            <Input className="w-full" placeholder="Community name" name="title" />

                            <Input className="w-full" placeholder="Community description" name="description" />

                            <hr />


                            <Button type="button" onClick={addEmail}>
                                <Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                                Add your private contacts
                            </Button>

                            <div>
                                {emails.map((item, index) => (
                                    <div key={index}>
                                        <Input className="w-full" placeholder="Email" name="title" defaultValue={item} />
                                    </div>
                                ))}
                            </div>


                            <Button type="submit" disabled={isLoading}>
                                {isLoading && (
                                    <>Waiting…</>
                                )}
                                {!isLoading && (
                                    <>
                                        <Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                                        Create Group
                                    </>
                                )}
                            </Button>

                        </div>
                    </div>
                </form>

            </>
        ) : (
            <>
                <h2>Here your new group </h2>
                <span>des</span>
            </>
        ))
    )
}
