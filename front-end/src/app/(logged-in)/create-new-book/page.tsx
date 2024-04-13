'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {HeaderLoggedIn} from "@/components/header-logged-in";
import {Input} from "@/components/ui/input";
import {Check, CircleUser, Plus, RefreshCw} from "lucide-react";
import {Account} from "@/components/account";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {http, useContractWrite, usePrepareTransactionRequest, useWaitForTransactionReceipt} from 'wagmi';
import {wagmiConfig} from "@/config/wagmi";

import ModalCreatedBook from "@/components/modal-created-book";
import { useState} from "react";
import {custom, createPublicClient, createWalletClient} from "viem";
import {mainnet, sepolia} from "wagmi/chains";


export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
})

export


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Book Title must be at least 2 characters.",
    }),
    status: z.enum([BookStatus.Draft, BookStatus.InProgress, BookStatus.Published]),
    description: z.string(),
})

enum BookStatus {
    Draft,
    InProgress,
    Published,
}

export default function CreateNewBookPage() {
    const [isOpen, setOpen] = useState(false)

// JSON-RPC Account
//     const [account] = await walletClient.getAddresses();

    // const { data: hash, isLoading, writeAsync } = useContractWrite({
    //     ...wagmiConfig,
    //     functionName: 'createBook',
    // });
    //
    // const { config, error } = usePrepareTransactionRequest({
    //     ...wagmiConfig,
    //     functionName: 'createBook',
    // })
    // const { data, writeContract } = useContractWrite(config)

    // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    //     hash: hash,
    // })

    // console.log({isConfirming})
    // console.log({isConfirmed})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: BookStatus.Draft,
            description: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('toto');
        console.log({values})

        // const { request } = await publicClient.simulateContract({
        //     address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
        //     abi: wagmiAbi,
        //     functionName: 'mint',
        //     args: [69420],
        //     account
        // })
        // await walletClient.writeContract(request)

        // const res = await writeAsync({
        //     args: [
        //         values.name,
        //         values.description,
        //         values.status,
        //     ],
        // })
        // console.log({res})
        // if (!!res?.hash) {
        //     setOpen(true);
        // }
    }

    const isConfirming = false;
    const isConfirmed = false;

    return (
        <>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col bg-background relative min-h-screen isolate overflow-hidden"
            >
                <HeaderLoggedIn>
                    <span className="font-semibold">New book</span>
                    <div size="icon" className="absolute right-4">
                        <Account />
                    </div>
                    {/*<Button size="icon" className="absolute right-2">*/}
                    {/*    <Check className="h-5 w-5"/>*/}
                    {/*    <span className="sr-only">Create book</span>*/}
                    {/*</Button>*/}
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
                    className="">
                    <div
                        className="mx-auto flex flex-col gap-8 items-center text-center max-w-6xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="sr-only">Description</FormLabel>
                                    <FormControl>
                                        <Input className="w-full" placeholder="Book title" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2 items-center">
                            <CircleUser className="h-5 w-5"/>
                            <Account/>
                        </div>


                        <RadioGroup className="flex gap-4" defaultValue="draft">
                            <div className="inline-flex items-center space-x-2">
                                <RadioGroupItem value="draft" id="draft"/>
                                <Label htmlFor="draft">Draft</Label>
                            </div>
                            <div className="inline-flex items-center space-x-2">
                                <RadioGroupItem value="in_progress" id="in_progress"/>
                                <Label htmlFor="in_progress">In Progress</Label>
                            </div>
                            <div className="inline-flex items-center space-x-2">
                                <RadioGroupItem value="published" id="published"/>
                                <Label htmlFor="published">Published</Label>
                            </div>
                        </RadioGroup>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="sr-only">Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="w-full min-h-[200px]" placeholder="Summary of the book" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button disabled={false} className="gap-2" type="submit">
                            {isConfirming ? (
                                <>
                                    <RefreshCw className="h-5 w-5 flex-none animate-spin" aria-hidden="true" />
                                    Confirming
                                </>) : (
                                <>
                                    <Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                                    Create book
                                </>
                            )}
                        </Button>

                    </div>
                </div>
            </form>
        </Form>
        <ModalCreatedBook isSuccess={isConfirmed} isOpen={isOpen} setOpen={setOpen} />
        </>
    )
}
