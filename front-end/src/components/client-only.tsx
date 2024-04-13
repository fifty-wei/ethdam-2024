'use client';

import {PropsWithChildren, useEffect, useState} from "react";

export function ClientOnly({children}: PropsWithChildren) {

    const [isClient, setClient] = useState(false);

    useEffect(() => {
        // Once the component mounts, we're definitely client-side
        setClient(true);
    }, []);

    return isClient ? children : null;

}
