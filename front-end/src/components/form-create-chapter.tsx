// 'use client';

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
import {Input} from "@/components/ui/input";
import {Plus, RefreshCw} from "lucide-react";
import {cn} from "@/lib/utils";
import {useWaitForTransactionReceipt, useWalletClient} from "wagmi";
import {Textarea} from "@/components/ui/textarea";
import {wagmiBookContract, wagmiChapterContract} from "@/config/wagmi";
import {writeContract} from "@wagmi/core";
import {useSapphire} from "@/hooks/useSapphireContractWrite";
import {useCallback, useEffect, useState} from "react";

enum BookStatus {
    Draft,
    InProgress,
    Published,
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    publicContent: z.string(),
    privateContent: z.string(),
})

interface Props {
    bookId: number;
    className?: string;
    onComplete?: () => void;
}

export function FormCreateChapter({bookId, onComplete, className=""} : Props) {
    const [tx, setTx] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { writeContract } = useSapphire();
    const{ isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: tx,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            publicContent: "",
            privateContent: "",
        },
    });

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        setIsPending(true);

        const txHash = await writeContract({
            ...wagmiChapterContract,
            functionName: 'createChapter',
            args: [
                BigInt(bookId),
                form.getValues('name'),
                form.getValues('publicContent'),
                form.getValues('privateContent')
            ],
        })

        setTx(txHash);
        setIsPending(false);
    }

    const classes = cn(className || "", "space-y-8 w-full flex flex-col items-end");

    console.log({isConfirmed});
    console.log({isConfirming});
    console.log({isPending});
    console.log({tx});

    useEffect(() => {
        if(!isConfirmed){
            return;
        }

        console.log('confirmed');

        if(!!onComplete){
            onComplete({
                name: form.getValues('name'),
                publicContent: form.getValues('publicContent'),
                privateContent: form.getValues('privateContent'),
            });
        }

        setTx(null);
    }, [isConfirmed]);

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
                className={classes}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Chapter Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="publicContent"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Public Content</FormLabel>
                            <FormControl>
                                <Textarea rows={4} className="min-h-[250px]" {...field} />
                            </FormControl>
                            <FormDescription>
                                This content is public and will be shown on the single book page.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="privateContent"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Private Content</FormLabel>
                            <FormControl>
                                <Textarea rows={10} className="min-h-[250px]" {...field} />
                            </FormControl>
                            <FormDescription>
                                This content will be reveal after reader pay for or reviewer give you feedbacks.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    disabled={isPending || isConfirming || isConfirmed}
                    className="flex-shrink-0 gap-2 ml-auto inline-flex"
                    type="submit"
                >
                    {isConfirming || isPending ? (
                        <>
                            <RefreshCw className="w-5 h-5 flex-none animate-spin" />
                            { isPending && (<span>Waiting…</span>)}
                            { isConfirming && (<span>Sending…</span>)}
                        </>
                    ) : (
                        <>
                            <Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                            {'Create chapter'}
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}
