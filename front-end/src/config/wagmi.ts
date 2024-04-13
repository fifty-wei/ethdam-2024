import { http, createConfig } from "wagmi";
import {mainnet, sapphireTestnet, sepolia} from "wagmi/chains";
import chapterContract from "@/abi/Chapter.json";
import bookContract from "@/abi/Book.json";
import feedbackContract from "@/abi/Feedback.json";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, sapphireTestnet],
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    // [sepolia.id]: http(),
    [sapphireTestnet.id]: http(),
  },
});

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
