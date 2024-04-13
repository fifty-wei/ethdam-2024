import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import chapterContract from "@/abi/Chapter.json";
import bookContract from "@/abi/Book.json";
import feedbackContract from "@/abi/Feedback.json";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const wagmiChapterContract = {
  address: "0x588F665A74d5B9A42ca952726a58812B22063D04",
  abi: chapterContract.abi,
};

export const wagmiBookContract = {
  address: "0xB3C3973Fc4ebB7765aaD4217129c86E7eD54a1ee",
  abi: bookContract.abi,
};

export const wagmiFeedbackContract = {
  address: "0xC8B7A0B74a0AC5D733e450943E903fc62bbde59B",
  abi: feedbackContract.abi,
};
