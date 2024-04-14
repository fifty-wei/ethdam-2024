'use client';

import {FormCreateBook} from "@/components/form-create-book";
import {HeaderLoggedIn} from "@/components/header-logged-in";
import {Account} from "@/components/account";
import {ContentWithBackground} from "@/components/content-with-background";
export default function CreateBookPage() {

    return (
        <>
            <HeaderLoggedIn>
                <span className="font-semibold">New book</span>
            </HeaderLoggedIn>

            <ContentWithBackground>
                <FormCreateBook className="mx-auto w-full flex flex-col items-center justify-center max-w-2xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40" />
            </ContentWithBackground>
        </>
    )
}
