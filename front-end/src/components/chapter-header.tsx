import {ApplyToGiveFeedback} from "@/components/apply-to-give-feedback";
import {MessageCircleMore} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Chapter} from "@/types/chapter";
import {Book} from "@/types/book";
import {useAccount, useContractRead} from "wagmi";
import ChapterWaitingList from "@/components/chapter-waiting-list";
import {wagmiFeedbackContract} from "@/config/wagmi";
import FormGiveFeedback from "@/components/form-give-feedback";
import {WhitelistStatus} from "@/types/feedback";

interface Props {
    chapter: Chapter;
}

export function ChapterHeader({chapter, book, index}: Props){

    return (
        <header className="sticky left-0 top-0 w-full z-50">
            <div
                className="hidden sm:flex sm:h-32 sm:justify-center sm:bg-background/95 sm:[@supports(backdrop-filter:blur(0))]:bg-background/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur">
                <div className="flex w-full flex-col items-center justify-center border-b-2 border-t-2 border-muted">
                    <span className="text-sm font-mono mb-2 text-primary/50">{ book.name }</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">{index < 10 ? `0${index}`: index}</span>
                        <span className="hidden lg:inline">{chapter.name}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
