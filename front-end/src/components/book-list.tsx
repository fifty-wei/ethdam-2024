'use client';

import {ButtonProps} from "@/components/ui/button"
import {RefreshCw} from "lucide-react";
import Link from "next/link";
import {Book} from "@/types/book";
import {BookCover} from "@/components/book-cover";

interface Props extends ButtonProps {
    className?: string;
    maximum: number;
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: any;
}

export function BookList({maximum, isLoading, isError, error, data} : Props) {

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <figure className="mx-auto flex h-12 w-12 items-center justify-center rounded-full ">
                    <RefreshCw
                        className="h-6 w-6 text-mute animate-spin -scale-1"
                        aria-hidden="true"
                    />
                </figure>
                Loading
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen min-w-screen flex justify-center items-center max-w-2xl mx-auto">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl pb-24 sm:pb-24 lg:px-8 flex flex-col gap-1 gap-8 grid items-start grid-cols-5 max-w-2xl lg:flex-none">
            {
                Array.from(data).reverse().slice(0, maximum).map((book: Book) => (
                    <Link href={`/book/${book.id}`} key={book.id} className="group flex flex-col gap-4">
                        <BookCover book={book} />
                        <h2 class="mx-4 text-lg leading-8 text-foreground font-mono">{ book.name }</h2>
                    </Link>
                ))
            }
        </div>
    )
}
