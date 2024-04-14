'use client';

import {ButtonProps} from "@/components/ui/button"
import {RefreshCw} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Book} from "@/types/book";

interface Props extends ButtonProps {
    className?: string;
    maximum: number;
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: any;
}

const IMAGE_LIST = {
    0: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=4212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    1: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=4212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    2: "https://images.unsplash.com/photo-1641154748135-8032a61a3f80?q=80&w=4160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    3: "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80&w=3641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    4: "https://images.unsplash.com/photo-1621827979802-6d778e161b28?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    5: "https://images.unsplash.com/photo-1538035323718-63409b754ce7?q=80&w=3440&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    6: "https://images.unsplash.com/photo-1554602530-f415ffd0294a?q=80&w=4026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    22: "https://m.media-amazon.com/images/I/71jDLpPMdFS._SL1500_.jpg",
    23: "https://m.media-amazon.com/images/I/81dYVnu-yJL._SL1500_.jpg",
    25: "https://m.media-amazon.com/images/I/811tZyLunxL._SL1500_.jpg",
    29: "https://m.media-amazon.com/images/I/91YnhK+f0CL._SL1500_.jpg",
    30: "https://m.media-amazon.com/images/I/81eMMaFMgOL._SL1500_.jpg",
    99: "https://images.unsplash.com/photo-1621827979802-6d778e161b28?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

export function BookCover({book} : Props) {

    const image = IMAGE_LIST[book.id] || IMAGE_LIST[0];

    return (
        <figure className="relative aspect-[2/3]">
            <Image
                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                src={image}
                alt=""
                width={512}
                height={1024}
            />
        </figure>
    )
}
