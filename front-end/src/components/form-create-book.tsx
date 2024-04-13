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
    status: z.enum([BookStatus.Draft, BookStatus.InProgress, BookStatus.Published]),
})

interface Props {
    className?: string;
}

export function FormCreateBook({className = ""} : Props) {
    // const [loading, setLoading] = useState(false);
    // const walletClient = useWalletClient();
    //
    // const walletClient = createWalletClient({
    //     chain: mainnet,
    //     transport: custom(window.ethereum)
    // })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            status: BookStatus.InProgress,
            description: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log('Form Submitted', values);
        console.log(values)
        return;
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
    }

    // const onSubmit = data => console.log(data);


    const classes = cn(className || "", "space-y-8")

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={classes}
            >
                <FormField
                    control={form.control}
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

                {/*<div className="flex gap-2 items-center">*/}
                {/*    <CircleUser className="h-5 w-5"/>*/}
                {/*    <Account/>*/}
                {/*</div>*/}

                <FormField
                    control={form.control}
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

                <Button type="submit" className="gap-2">
                    <Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                    Create book
                </Button>
            </form>
        </Form>
    )
}
