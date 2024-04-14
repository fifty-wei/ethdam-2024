"use client";

import Image from "next/image";
import { useAccount, useContractReads } from "wagmi";
import { useParams } from "next/navigation";
import { wagmiBookContract, wagmiChapterContract } from "@/config/wagmi";
import { RefreshCw } from "lucide-react";
import ModalAddChapter from "@/components/modal-add-chapter";
import { ChapterItem } from "@/components/chapter-item";
import { useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Header} from "@/components/header";

export default function Home() {
  const { bookId } = useParams<{ bookId: string }>();
  const [newChapters, setNewChapters] = useState([]);
  const { address } = useAccount();

  const { data, error, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...wagmiChapterContract,
        functionName: "getChapters",
        args: [BigInt(bookId)],
      },
      {
        ...wagmiBookContract,
        functionName: "getBookById",
        args: [BigInt(bookId)],
      },
    ],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
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
      <div className="min-h-screen min-w-screen">Error: {error.message}</div>
    );
  }

  const [chaptersData, bookData] = data || [];

  const book = bookData.result;
  const chapters = chaptersData.result;

  if (bookData.status !== "success") {
    console.log(bookData.error);
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center max-w-2xl mx-auto">
        {bookData.error.toString()}
      </div>
    );
  }

  function handleNewChapter(chapter){
    // const newChapter = {
    //   ...chapter,
    //   id: newChapters.length > 0 ? newChapters[newChapters.length - 1].id + BigInt(1) : chapters[chapters.length - 1].id + BigInt(1),
    //   bookId: bookId
    // }
    // setNewChapters([...chapters, newChapter])
  }

  return (
    !!book && (
        <>
          <Header />
          <main>

            <div className="absolute top-0 inset-0 w-full isolate overflow-hidden pointer-events-none z-[-1]">
              {/* Hero section */}
              <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true"><defs><pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><svg x="50%" y="-1" class="overflow-visible fill-gray-800/20"><path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0"></path></svg><rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"></rect></svg>

              <div
                  className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                  aria-hidden="true"
              >
                <div
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                      clipPath:
                          "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                    }}
                />
              </div>
            </div>


            <h1 className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-24 text-4xl font-bold tracking-tight sm:text-6xl lg:px-8 lg:pt-40">
              {book.name}
            </h1>

            <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-40 lg:flex lg:px-8 lg:gap-10 xl:gap-32">
              <div className="mx-auto w-1/2 gap-8 grid items-start grid-cols-1 mt-16 flex max-w-2xl sm:mt-24  lg:ml-0 lg:mt-0 lg:max-w-none lg:flex-none">
                <figure className="relative aspect-[2/3]">
                  <Image
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                    src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=4212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    width={512}
                    height={1024}
                  />
                </figure>
              </div>

              <div className="mx-auto w-1/2 max-w-2xl flex-shrink-0 flex flex-col gap-8 items-start lg:mx-0 lg:max-w-xl lg:pt-8">
                <p className="mt-6 text-lg leading-8 text-primary/50">
                  {book.description}
                </p>

                {book.owner === address && <ModalAddChapter bookId={bookId} onAddChapter={ handleNewChapter } />}

                <ul className="flex flex-col gap-2">
                  {chapters.map((chapter, index) => {
                    return (
                      <li key={chapter.id}>
                        <Button asChild variant="link">
                          <Link href={`#${chapter.id}-${chapter.name.toLowerCase().replace(' ', '-').replace('#', '')}`}>
                            {index + 1}. {chapter.name}
                          </Link>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {[...chapters, ...newChapters].map((chapter, index) => {
              return (
                <ChapterItem
                  key={chapter.id}
                  book={book}
                  index={index + 1}
                  chapter={chapter}
                />
              );
            })}
          </main>
        </>
    )
  );
}
