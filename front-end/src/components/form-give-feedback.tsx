import {Fragment, useEffect, useState} from 'react'
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Account} from "@/components/account";
import {CircleUser, RefreshCw, UserCircle} from "lucide-react";
import {StarRating} from "@/components/star-rating";
import {useContractRead, useContractWrite, useWaitForTransactionReceipt} from "wagmi";
import {wagmiFeedbackContract} from "@/config/wagmi";
import {useToast} from "@/components/ui/use-toast";

const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

interface Props {
    chapter: Chapter;
}

export default function FormGiveFeedback({chapter}: Props) {
    const { toast } = useToast();

    const { data: hash, isPending, writeContract } = useContractWrite();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    useEffect(() => {
        if (isConfirmed) {
            toast({
                title: "Success",
                description: `Thank you for your feedback! Stay tuned for more updates.`,
                status: "success",
            });
        }
    }, [isConfirmed])

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const res = writeContract({
            ...wagmiFeedbackContract,
            functionName: 'createFeedback',
            args: [
                BigInt(chapter.id),
                formData.get('comment'),
                formData.get('rating')
            ],
        })

        console.log({res});

    }

    if( isConfirmed ){
        return null;
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 items-center">
                <CircleUser className="h-5 w-5 flex-none"/>
                <Account/>
                <StarRating className="ml-auto" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="relative w-full">
                    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                        <Label htmlFor="comment" className="sr-only">
                            Give your feedback
                        </Label>
                        <Textarea
                            rows={4}
                            name="comment"
                            id="comment"
                            className="block w-full resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none ring-0 sm:text-sm font-mono sm:leading-6"
                            placeholder="Add your comment..."
                            defaultValue={''}
                        />

                        {/* Spacer element to match the height of the toolbar */}
                        <div className="py-2" aria-hidden="true">
                            {/* Matches height of button in toolbar (1px border + 36px content height) */}
                            <div className="py-px">
                                <div className="h-9" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                        <Button
                            className="flex-shrink-0 min-w-[100px]"
                            type="submit"
                        >
                            {isConfirming || isPending ? (
                            <>
                                <RefreshCw className="w-5 h-5 flex-none animate-spin" />
                                { isPending && (<span>Waiting…</span>)}
                                { isConfirming && (<span>Sending…</span>)}
                            </>
                            ) : (
                                'Post'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
