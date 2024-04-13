import {UseWriteContractReturnType} from "wagmi/src/hooks/useWriteContract";
import {Config, ResolvedRegister} from "@wagmi/core";
import {useAccount, useClient, useContractWrite, useWaitForTransactionReceipt} from "wagmi";
import { type Config, getClient } from '@wagmi/core'
import {ethers, FallbackProvider, JsonRpcProvider} from 'ethers'
import type { Client, Chain, Transport } from 'viem'
import {wrap} from "@oasisprotocol/sapphire-paratime";
import {wagmiBookContract} from "@/config/wagmi";

export function useSapphireContract<
    config extends Config = ResolvedRegister['config'],
    context = unknown,
>() {
    const { data: hash, isPending, writeContract } = useContractWrite();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
            hash,
        });

    const bookRepository = {
        createBook: (title: string, description: string, status: string) => {
            return writeContract({
                ...wagmiBookContract,
                functionName: 'createBook',
                args: [title, description, status],
            });
        }
    }

  return {
    bookRepository: bookRepository as Return['contract'],
    // writeContract: writeContract as Return['writeContract'],
  }
}
