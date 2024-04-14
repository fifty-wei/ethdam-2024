import {UseWriteContractReturnType} from "wagmi/src/hooks/useWriteContract";
import {Config, ResolvedRegister} from "@wagmi/core";
import {custom, useAccount, useClient, useWalletClient} from "wagmi";
import {type Config, getClient} from '@wagmi/core'
import {ethers, FallbackProvider, JsonRpcProvider} from 'ethers'
import type {Client, Chain, Transport, EIP1193Provider} from 'viem'
import {wrap, wrapEthersSigner} from "@oasisprotocol/sapphire-paratime";
import {wagmiBookContract} from "@/config/wagmi";
import {useMemo, useState} from "react";
import {sapphireTestnet} from "wagmi/chains";

export function clientToProvider(client: Client<Transport, Chain>) {
    const {chain, transport} = client
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback') {
        const providers = (transport.transports as ReturnType<Transport>[]).map(
            ({value}) => new JsonRpcProvider(value?.url, network),
        )
        if (providers.length === 1) return providers[0]
        return new FallbackProvider(providers)
    }
    return new JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function getEthersProvider(
    config: Config,
    {chainId}: { chainId?: number } = {},
) {
    const client = getClient(config, {chainId})
    return clientToProvider(client);
}

// function initializeSigner(eth: ReturnType<typeof useEthereumStore>) {
//   let signer = eth.unwrappedSigner;
//   if (!signer && eth.unwrappedProvider) {
//     signer = new VoidSigner(eth.address!, eth.unwrappedProvider);
//   }
//   return signer;
// }

export function oldUseSapphireContract<
    config extends Config = ResolvedRegister['config'],
    context = unknown,
>() {
    // const client = useClient();
    //
    if (!window.ethereum) {
        return;
    }

    // const provider = clientToProvider(client);
    // const { provider, signer } = useMemo(() => {
    //   const provider = getEthersProvider(config);
    //   const signer = wrap(provider.getSigner());
    //   return { provider, signer }
    // }, [client])

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = wrap(provider);
    console.log({provider});
    console.log({signer});


    // const signer = initializeSigner(eth);
    // if (!signer) {
    //   console.error('[useMessageBox] Signer not initialized');
    //   return null;
    // }


    // console.log({client})
    //
    // console.log({sapphireWrappedProvider})


    const bookRepository = new ethers.Contract(
        wagmiBookContract.address,
        wagmiBookContract.abi,
        signer,
    );

    // const bookContract = new ethers.Contract(
    //     wagmiBookContract.address,
    //     wagmiBookContract.abi,
    //     sapphireWrappedProvider,
    // );

    console.log({bookRepository});

    // function writeContract(args){
    //   sapphireWrappedProvider
    // }

    type Return = UseWriteContractReturnType<config, context>
    return {
        bookRepository: bookRepository as Return['contract'],
        // writeContract: writeContract as Return['writeContract'],
    }
}

export function useSapphire() {
    const [tx, setTx] = useState<string>('')
    const [isPending, setPending] = useState<boolean>(false)
    const walletClient = useWalletClient({
        chain: sapphireTestnet,
        transport: custom(wrap(window.ethereum! as EIP1193Provider)),
    })

    async function writeContract(args) {
        setPending(true)
        const tx = await walletClient.data.writeContract(args)
        setTx(tx)
        setPending(false)
    }

    // console.log(walletClient)
    // console.log(walletClient.data)

    return {
        writeContract: writeContract,
        data: tx,
        isPending: isPending,
    }
}
