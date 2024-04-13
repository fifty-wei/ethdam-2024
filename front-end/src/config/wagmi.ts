import { http, createConfig } from "wagmi";
import {Chain, mainnet, sapphireTestnet, sepolia} from "wagmi/chains";
// import { publicProvider } from 'wagmi/providers/public';
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { configureChains } from '@wagmi/core'


import chapterContract from "@/abi/Chapter.json";
import bookContract from "@/abi/Book.json";
import feedbackContract from "@/abi/Feedback.json";

// import { CoolWalletOptions, CoolWalletProvider } from 'cool-wallet-sdk'
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import {createConnector} from "@wagmi/core";
import {metaMask, walletConnect} from "@wagmi/connectors";


export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, sapphireTestnet],
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [sapphireTestnet.id]: http(),
  },
});

// const sapphireProvider = sapphire.wrap(publicProvider());
// }

// const connector = walletConnect({
//     chains: [mainnet, sapphireTestnet],
// });
//
// const sapphireConnector = createConnector((config) => ({
//     ...connector,
//     id: 'sapphireSDK',
//     name: 'Sapphire',
//     type: metaMask.type,
//     async getProvider(chain: Chain) {
//         console.log('chain', chain);
//         // const chainId = connector.getChain()
//         if (chain.id === sapphireTestnet.id) {
//             const provider = await connector.getProvider(chain);
//             return sapphire.wrap(provider);
//         }
//         // throw new Error(`Unsupported chain ${chain.id}`);
//     },
// }));
//
// const { chains, publicClient } = configureChains(
//     chains: [mainnet, sapphireTestnet],
//     [sapphire.wrap(publicProvider())],
// )
//
// export const wagmiConfig = createConfig({
//     connectors: [new InjectedConnector({ chains })],
//     transports: {
//         [mainnet.id]: http(),
//         [sapphireTestnet.id]: http(),
//     },
//     publicClient,
// });

export const wagmiChapterContract = {
  // Sepolia
  // address: "0x588F665A74d5B9A42ca952726a58812B22063D04",
  // Sapphire
  address: "0x7F67316a754f3953617FEA14227ccC4E018f4E7b",
  abi: chapterContract.abi,
};

export const wagmiBookContract = {
  // Sepolia
  // address: "0xfd2D32AD31038423015B9d830Ad735c43AdBe4Dc",
  // Sapphire
  address: "0xefe86329296Bf2f2fB3C4fF5545Dca8736fB2e71",
  abi: bookContract.abi,
};

export const wagmiFeedbackContract = {
  // Sepolia
  // address: "0xC8B7A0B74a0AC5D733e450943E903fc62bbde59B",
  // Sapphire
  address: "0x32Cf4dCFfdc6Ed1a045f212Eacc7ed8a1E94f530",
  abi: feedbackContract.abi,
};
