import {ApplyToGiveFeedback} from "@/components/apply-to-give-feedback";
import {MessageCircleMore} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Chapter} from "@/types/chapter";
import {Book} from "@/types/book";
import {useAccount, useContractRead} from "wagmi";
import ChapterWaitingList from "@/components/chapter-waiting-list";
import {wagmiFeedbackContract} from "@/config/wagmi";

interface Props {
    index: number;
    book: Book;
    chapter: Chapter;
}

export function ChapterItem({chapter, book, index}: Props){
    const {address} = useAccount();
    const { data, isError, isLoading } = useContractRead({
        ...wagmiFeedbackContract,
        functionName: 'getAllWaitingList',
        args: [BigInt(chapter.id)],
    });

    console.log({data, isError, isLoading});

    return (
        <article>
            <div className="sticky left-0 top-0 w-full z-50">
                {
                    ! data?.some((item: any) => item.address !== address) && (
                        <ApplyToGiveFeedback chapter={chapter} className="h-full border-2 rounded-none absolute left-0 z-50">
                            <MessageCircleMore className="w-5 h-5 flex-none" />
                            Apply to Give Feedback
                        </ApplyToGiveFeedback>
                    )
                }
                <div
                    className="hidden sm:flex sm:h-32 sm:justify-center sm:bg-background/95 sm:[@supports(backdrop-filter:blur(0))]:bg-background/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur">
                    <div className="flex w-full flex-col items-center justify-center border-b-2 border-t-2">
                        <span className="text-sm font-mono mb-2 text-primary/50">{ book.name }</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono">{index < 10 ? `0${index}`: index}</span>
                            <span className="hidden lg:inline">{chapter.name}</span>
                        </div>
                    </div>

                    <Button variant="outline" className="h-full border-2 rounded-none absolute right-0 z-50">
                        Pay 1 OASIS to read the chapter
                    </Button>
                </div>
            </div>
            <p className="mx-auto w-1/2 pb-24 pt-10 sm:pb-24 lg:pt-40 max-w-2xl flex-shrink-0 flex flex-col gap-8 justify-center items-start lg:max-w-xl">
                {chapter.publicContent}
            </p>

            {
                chapter.owner === address && (
                    <ChapterWaitingList data={data} chapter={chapter} />
                )
            }

        </article>
    )
}
