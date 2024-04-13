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
import {useContractWrite, useWaitForTransactionReceipt, useWalletClient} from "wagmi";
import {Textarea} from "@/components/ui/textarea";
import {wagmiBookContract, wagmiFeedbackContract} from "@/config/wagmi";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast";
import {redirect} from "next/navigation";

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

    const { toast } = useToast();

    const { data: hash, isPending, writeContract } = useContractWrite();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            status: BookStatus.InProgress,
            description: "",
        },
    })

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        console.log({wagmiBookContract});

        writeContract({
            ...wagmiBookContract,
            functionName: 'createBook',
            args: [
                formData.get('title'),
                formData.get('description'),
                formData.get('status')
            ],
        })
    }

    // const onSubmit = data => console.log(data);

    console.log({isPending});
    console.log({isConfirming});
    console.log({isConfirmed});
    console.log({hash});

    const classes = cn(className || "", "space-y-8");

    if( isConfirmed ){
        redirect('/book/1')
        return null;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
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
                    name="status"
                    render={({ field }) => (
                        <div className="w-full">
                            <FormLabel>Status</FormLabel>
                            <FormControl>

                                <RadioGroup name="status" className="flex gap-4" onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormItem className="inline-flex items-center space-x-2">
                                        <RadioGroupItem value={BookStatus.Draft.toString()} id="draft"/>
                                        <Label htmlFor="draft">Draft</Label>
                                    </FormItem>
                                    <FormItem className="inline-flex items-center space-x-2">
                                        <RadioGroupItem value={BookStatus.InProgress.toString()} id="in_progress"/>
                                        <Label htmlFor="in_progress">In Progress</Label>
                                    </FormItem>
                                    <FormItem className="inline-flex items-center space-x-2">
                                        <RadioGroupItem value={BookStatus.Published.toString()} id="published"/>
                                        <Label htmlFor="published">Published</Label>
                                    </FormItem>
                                </RadioGroup>

                            </FormControl>
                            <FormMessage />
                        </div>
                    )}
                />

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

                <Button
                    disabled={isPending || isConfirming || isConfirmed}
                    className="flex-shrink-0 gap-2"
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
                            {'Create book'}
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}
