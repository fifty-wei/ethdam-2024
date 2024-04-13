'use client';

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
};

export function Account() {
    const { address } = useAccount()
    // const { disconnect } = useDisconnect()
    // const { data: ensName } = useEnsName({ address })
    // const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    // return (
    //     <div>
    //         {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
    //         {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
    //     </div>
    // )

    return !! address && (
        <div>
            {formatAddress(address.toString())}
        </div>
    )
}
