'use client';

import {Button, ButtonProps} from "@/components/ui/button"
import {Plus, RefreshCw} from "lucide-react";
import {wagmiFeedbackContract} from "@/config/wagmi";
import {useContractRead, useContractWrite, useReadContract, useWaitForTransactionReceipt} from "wagmi";
import {useToast} from "@/components/ui/use-toast";
import {WhitelistStatus} from "@/types/feedback";
import {useState} from "react";
import {useSapphire} from "@/hooks/useSapphireContractWrite";

interface Props extends ButtonProps {
    className?: string;
    waitingList: {
        id: number;
        status: WhitelistStatus;
        owner: string;
        chapterId: string;
    }
}

export function AcceptOrRejectWhitelist({waitingList, className = "", size, variant} : Props) {
    const { toast } = useToast();
    const [tx, setTx] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { writeContract } = useSapphire();

    // const { data: hash, isPending, writeContract } = useContractWrite();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: tx,
        })
    async function changeStatus(status: WhitelistStatus) {
        setIsPending(true);

        const txHash = await writeContract({
            ...wagmiFeedbackContract,
            functionName: 'changeWhiteListStatus',
            args: [BigInt(waitingList.chapterId), status],
        })

        setTx(txHash);
        setIsPending(false);

        // toast({
        //     title: status.toString().toUpperCase(),
        //     description: `${status}`,
        //     status: "success",
        // });
    }

    async function acceptWaitingList(){
        await changeStatus(WhitelistStatus.Accepted);
    }

    async function rejectWaitingList(){
        await changeStatus(WhitelistStatus.Rejected);
    }

    if (waitingList.status !== WhitelistStatus.Pending || isConfirmed){
        return null
    }

    if( isConfirmed ){

    }

    return (
        <div className="flex gap-2">{
            <>
                {isConfirming || isPending ? (
                    <>
                        <RefreshCw className="w-5 h-5 flex-none animate-spin" />
                        { isPending && (<span>Waiting…</span>)}
                        { isConfirming && (<span>Sending…</span>)}
                    </>
                ) : (
                    <>
                        <Button size="sm" disabled={isPending || isConfirming || isConfirmed} onClick={acceptWaitingList} className={className}>
                            Accept
                        </Button>
                        <Button size="sm" variant="link" disabled={isPending || isConfirming || isConfirmed} onClick={rejectWaitingList} className={className}>
                        Reject
                        </Button>
                    </>
                )}
            </>
        }</div>
    )
}
