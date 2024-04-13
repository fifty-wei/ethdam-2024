import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import chapterContract from "@/abi/Chapter.json"
import bookContract from "@/abi/Book.json"

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia],
    connectors: [],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

export const wagmiChapterContract = {
    address: '0xC13c63da989deD6e71A10cc08833B9B80DE93BaD',
    abi: chapterContract.abi,
}

export const wagmiBookContract = {
    address: '0xA27d893Bc437158c22414395209cfb17710CA068',
    abi: bookContract.abi,
}
