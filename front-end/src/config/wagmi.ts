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
  address: "0x777068Ed13a718D1E7E6D6a9E0481b0651c3F78f",
  abi: chapterContract.abi,
};

export const wagmiBookContract = {
  address: "0xfd2D32AD31038423015B9d830Ad735c43AdBe4Dc",
  abi: bookContract.abi,
};

export const wagmiFeedbackContract = {
  address: "0x2964fa34cA3434180655c2C1d83a3bb07caf5f25",
  abi: feedbackContract.abi,
};
