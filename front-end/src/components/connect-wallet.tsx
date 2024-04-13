"use client";

import { useAccount, useDisconnect } from "wagmi";
import { WalletOptions } from "@/components/wallet-options";
import { Account } from "@/components/account";
import { Button } from "@/components/ui/button";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  if (isConnected) {
    return (
      <>
        <Account />
        <Button variant="outline" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </>
    );
  }

  return <WalletOptions />;
}
