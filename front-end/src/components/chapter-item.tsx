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
import {ChapterPrivateContent} from "@/components/chapter-private-content";
import {ChapterPaywall} from "@/components/chapter-paywall";
import {ChapterPublicContent} from "@/components/chapter-public-content";
import {ChapterHeader} from "@/components/chapter-header";
import {useCallback, useMemo} from "react";

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

    const hasAccepted = useMemo(() => {
        if( ! data) {
            return false;
        }

        return data.some(item => item.owner == address && item.status === WhitelistStatus.Accepted);
    }, data);

    console.log({hasAccepted})


    // const hasAccepted = data?.some((item: any) => item.address !== address && item.status === WhitelistStatus.Accepted);
    // console.log({hasApplied, hasAccepted});

    return (
        <article id={`${chapter.id}-${chapter.name.toLowerCase().replace(' ', '-').replace('#', '')}`}>
            <ChapterHeader chapter={chapter} book={book} index={index} />
            <ChapterPublicContent chapter={chapter} />

            {
                ! hasAccepted ? (
                    <ChapterPaywall chapter={chapter} whitelist={data} />
                ) : (
                    <ChapterPrivateContent chapter={chapter} />
                )
            }

            <div className="mx-auto w-1/2 pb-24 pt-10 sm:pb-24 lg:pt-40 max-w-2xl flex-shrink-0 flex flex-col gap-8 justify-center items-start lg:max-w-xl">

                {
                    chapter.owner == address && (
                        <ChapterWaitingList data={data} chapter={chapter} />
                    )
                }

                {
                    hasAccepted && (
                        <FormGiveFeedback chapter={chapter} />
                    )
                }
            </div>

        </article>
    )
}
