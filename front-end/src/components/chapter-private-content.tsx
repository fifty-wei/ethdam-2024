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

export function ChapterPrivateContent({chapter}: Props){

    console.log({chapter});

    if( ! chapter?.privateContent ) {
        return null;
    }

    return (
        <div className="mx-auto w-1/2 max-w-2xl flex-shrink-0 flex flex-col gap-4 lg:max-w-xl">
            <p className="text-xs font-mono text-primary/50 uppercase">Private</p>
            <p className="flex-shrink-0 flex flex-col gap-8 justify-center items-start">
                {chapter.privateContent}
            </p>
        </div>
    )
}
