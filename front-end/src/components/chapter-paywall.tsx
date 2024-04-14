import { ApplyToGiveFeedback } from "@/components/apply-to-give-feedback";
import { MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/chapter";
import { Book } from "@/types/book";
import { useAccount, useContractRead } from "wagmi";
import ChapterWaitingList from "@/components/chapter-waiting-list";
import { wagmiFeedbackContract } from "@/config/wagmi";
import FormGiveFeedback from "@/components/form-give-feedback";
import { WhitelistStatus } from "@/types/feedback";
import { useCallback, useMemo } from "react";

interface Props {
  chapter: Chapter;
}

export function ChapterPaywall({ chapter, whitelist }: Props) {
  const { address } = useAccount();
  // const hasApplied = whitelist.some((item: any) => item.address !== address);
  const hasApplied = useMemo(() => {
    console.log({ whitelist });

    if (!whitelist) {
      return false;
    }
    return whitelist.some(item => item.owner == address);
  }, [whitelist]);

  console.log({ hasApplied });

  return (
    <div className="mx-auto w-1/2 max-w-2xl flex-shrink-0 flex flex-col gap-4 justify-center items-center lg:max-w-xl">
      <div className="flex justify-center items-center gap-4 w-full">
        {!hasApplied && (
          <>
            <ApplyToGiveFeedback
              chapter={chapter}
              className="w-1/2 border-2 rounded-none"
            >
              <MessageCircleMore className="w-5 h-5 flex-none" />
              Apply to Give Feedback
            </ApplyToGiveFeedback>
            <span className="text-xs font-mono text-primary/50 uppercase">
              or
            </span>
          </>
        )}

        <Button variant="outline" className="w-1/2 border-2 rounded-none">
          Pay 1 ROSE
        </Button>
      </div>
      <span className="text-xs mx-auto font-mono text-primary/50 uppercase">
        to read the chapter
      </span>
    </div>
  );
}
