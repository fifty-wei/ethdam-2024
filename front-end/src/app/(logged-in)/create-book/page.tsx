'use client';

import {FormCreateBook} from "@/components/form-create-book";
import {HeaderLoggedIn} from "@/components/header-logged-in";
import {Account} from "@/components/account";
export default function CreateBookPage() {

    return (
        <>
            <HeaderLoggedIn>
                <span className="font-semibold">New book</span>
                <div size="icon" className="absolute right-4">
                    <Account />
                </div>
                {/*<Button size="icon" className="absolute right-2">*/}
                {/*    <Check className="h-5 w-5"/>*/}
                {/*    <span className="sr-only">Create book</span>*/}
                {/*</Button>*/}
            </HeaderLoggedIn>

            <div
                className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                />
            </div>
            <FormCreateBook className="mx-auto w-full flex flex-col items-center justify-center max-w-2xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40" />
        </>
    )
}
