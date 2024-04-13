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
import {useWalletClient} from "wagmi";
import {Textarea} from "@/components/ui/textarea";

enum BookStatus {
    Draft,
    InProgress,
    Published,
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
})

interface Props {
    bookId: number;
    className?: string;
    afterSubmit: () => void;
}

export function FormCreateChapter({bookId, afterSubmit, className=""} : Props) {

    // 2. Define a submit handler.
    function onSubmit(e) {
        e.preventDefault();
        const formData = formData.get('title')
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log('Form Submitted');
        // console.log(values)
        // return;
        // setLoading(true);

        try {
            // const [account] = await walletClient.getAddresses();

            // if (!account) {
            //     return;
            // }

            // await walletClient.writeContract({
            //     ...wagmiBookContract,
            //     functionName: 'createBook',
            //     args: [
            //         values.title,
            //         values.description,
            //         values.status,
            //     ],
            //     account,
            // })
        } catch (error) {
            console.error(error);
        }

        if( !!afterSubmit ){
            afterSubmit()
        }
    }

    // const onSubmit = data => console.log(data);


    const classes = cn(className || "", "space-y-8")

    return (
        <form
            onSubmit={onSubmit}
            className={classes}
        >
            <FormField
                // control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Book Title" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                // control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                            <Textarea className="min-h-[250px]" placeholder="Summary of the book" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit">
                <Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                Create book
            </Button>
        </form>
    )
}
