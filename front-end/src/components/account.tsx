'use client';

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && <span>{ensName ? `${ensName} (${address})` : address}</span>}
        </>
    )
}
