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

export function ChapterPublicContent({chapter}: Props){

    if( ! chapter?.publicContent ) {
        return null;
    }

    return (
        <div className="mx-auto w-1/2 pb-24 pt-10 sm:pb-24 lg:pt-40 max-w-2xl flex-shrink-0 flex flex-col gap-8 justify-center items-start lg:max-w-xl">
            <p className="text-xs font-mono text-primary/50 uppercase">Public</p>
            <p className="flex-shrink-0 flex flex-col gap-8 justify-center items-start">
                {chapter.publicContent}
            </p>
        </div>
    )
}
