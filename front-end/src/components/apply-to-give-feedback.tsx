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
import {Input} from "@/components/ui/input";
import {Plus, RefreshCw} from "lucide-react";
import {cn} from "@/lib/utils";
import {wagmiFeedbackContract} from "@/config/wagmi";
import {useContractRead, useContractWrite, useReadContract, useWaitForTransactionReceipt} from "wagmi";
import {PropsWithChildren, useEffect} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Chapter} from "@/types/chapter";
import {useSapphire} from "@/hooks/useSapphireContractWrite";

interface Props extends PropsWithChildren {
    className?: string;
    chapter: Chapter;
}

export function ApplyToGiveFeedback({chapter, children, className = ""} : Props) {
    const { data, isError, isLoading } = useContractRead({
        ...wagmiFeedbackContract,
        functionName: 'isWhitelisted',
        args: [BigInt(chapter.id)],
    });

    console.log({data, isError, isLoading});

    // const { data: hash, isPending, writeContract } = useContractWrite();
    const { data: hash, isPending, writeContract } = useSapphire();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })
    const { toast } = useToast();

    useEffect(() => {
        if (isConfirmed) {
            toast({
                title: "Success",
                description: `Thank you for applying to give feedback to the chapter "${chapter.name}"`,
                status: "success",
            });
        }
    }, [isConfirmed])


    // const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    //     hash: data,
    // })
    async function handleClick() {
        console.log('Apply to Give Feedback clicked')

        const res = await writeContract({
            ...wagmiFeedbackContract,
            functionName: 'applyToWhitelist',
            args: [BigInt(chapter.id)],
        })
        // const res = await writeContract({
        //     args: [
        //         BigInt(chapterId),
        //     ],
        // });

        console.log({res});
    }

    const classes = cn(className || "", "border-2 rounded-none")

    if (isConfirmed){
        return null
    }

    return (
        <Button variant="outline" disabled={isPending || isConfirming || isConfirmed} onClick={handleClick} className={classes}>{
            <>
                {isLoading || isConfirming || isPending ? (
                    <>
                        <RefreshCw className="w-5 h-5 flex-none animate-spin" />
                        {
                            <>
                            {isPending && (
                                <>Waiting…</>
                            )}
                            {isConfirming && (
                                <>Confirming…</>
                            )}
                                {/*{isLoading && ()}*/}
                            </>
                        }

                    </>
                ) : (
                    children
                )}
            </>
        }</Button>
    )
}
