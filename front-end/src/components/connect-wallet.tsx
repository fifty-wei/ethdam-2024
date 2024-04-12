'use client';

import {useAccount} from "wagmi";
import {WalletOptions} from "@/components/wallet-options";
import {Account} from "@/components/account";

export function ConnectWallet() {
    const { isConnected, disconnect } = useAccount()
    if (isConnected) return <Account />
    return (
        <>
            <WalletOptions />
            <button onClick={() => disconnect()}>Disconnect</button>
        </>
    )
}
