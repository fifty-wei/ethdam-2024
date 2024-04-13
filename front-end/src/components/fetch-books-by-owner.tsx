import {ReactNode} from "react";
import {Address} from "@/types/address";
import {useContractRead} from "wagmi";
import {BaseError} from "viem";
import {wagmiConfig} from "@/config/wagmi";

interface PropsChildren {
    address: Address;
    books: Array<{
        id: string;
        name: string;
        description: string;
    }>;
}

interface Props {
    children: (props: PropsChildren) => ReactNode;
    address: Address;
}

export default function FetchBooksByOwner({address, children}: Props) {

    const {data, error, isLoading} = useContractRead({
        ...wagmiConfig,
        functionName: 'getBooksByOwner',
        args: [address],
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                Error: {(error as BaseError).shortMessage || error.message}
            </div>
        );
    }

    return (
        <>
            {
                children({
                    address: address,
                    books: data.result.map((book: { id: string, name: string; description: string; }) => {
                        id: book.id,
                        name: book.name,
                        description: book.description,
                    }),
                })
            }
        </>
    );
}
