'use client';

import { Connector, useConnect } from 'wagmi'
import {useEffect, useState} from "react";

export function WalletOptions() {
    const { connectors, connect } = useConnect()

    return connectors.map((connector) => (
        <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
        />
    ))
}

function WalletOption({
                          connector,
                          onClick,
                      }: {
    connector: Connector
    onClick: () => void
}) {
    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400" disabled={!ready} onClick={onClick}>
            Connect with {connector.name}
        </button>
    )
}
