"use client";

import Image from "next/image";
import {useAccount, useContractRead, useContractReads} from "wagmi";
import { useParams } from "next/navigation";
import { wagmiBookContract, wagmiChapterContract } from "@/config/wagmi";
import { RefreshCw } from "lucide-react";
import ModalAddChapter from "@/components/modal-add-chapter";
import { ChapterItem } from "@/components/chapter-item";
import { useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Header} from "@/components/header";
import {ContentWithBackground} from "@/components/content-with-background";
import {BookList} from "@/components/book-list";
import {BookStatus} from "@/types/book";

export default function Home() {
    const { data, error, isError, isLoading } = useContractRead({
        ...wagmiBookContract,
        functionName: "getAllBooks",
        args: [],
    });

    console.log({data});

const publishedOrPendingBooks = data?.filter((book: any) => book.status === BookStatus.Published || book.status === BookStatus.InProgress);

  return (
    <>
      <Header />
      <ContentWithBackground>

          <div className="container mx-auto max-w-7xl pb-24 pt-10 sm:pb-24 lg:px-8 lg:pt-32 flex flex-col gap-1">
            <h1 className=" text-4xl font-bold tracking-tight sm:text-6xl ">
              Library
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-300">{data?.length > 0 ? data.length : 1234} titles are waiting for you right now.</p>
          </div>

        <BookList isLoading={isLoading} isError={isError} data={publishedOrPendingBooks} error={error} maximum={5} />

        {/*<CategoryList />*/}

      </ContentWithBackground>

    </>
  );
}
