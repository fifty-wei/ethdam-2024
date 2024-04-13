'use client';

import {Button, ButtonProps} from "@/components/ui/button"
import {Plus, RefreshCw, StarIcon} from "lucide-react";
import {wagmiFeedbackContract} from "@/config/wagmi";
import {useContractRead, useContractWrite, useReadContract, useWaitForTransactionReceipt} from "wagmi";
import {useToast} from "@/components/ui/use-toast";
import {WhitelistStatus} from "@/types/feedback";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {useState} from "react";

interface Props extends ButtonProps {
    className?: string;
}

export function StarRating({ className = "", defaultValue = "0", maximumValue=5} : Props) {
    const [selected, setSelected] = useState(defaultValue);

    const classes = cn('flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400', className);
    return(
        <RadioGroup name="rating" className={classes} defaultValue={defaultValue}>
        {Array.from({ length: maximumValue }, (_, i) => {

            console.log({selected})
            const value = i + 1;
            const classes = cn("group-checked:stroke-yellow-900 group-hover:stroke-yellow-600 w-5 h-5 stroke-muted-foreground",{ 'fill-yellow-400 stroke-yellow-500': selected >= value, 'stroke-muted-foreground': !selected });
            return (
                <div className="group flex items-center">
                    <RadioGroupItem className="sr-only" value={value.toString()} id={`r${value}`} />
                    <Label onClick={() => { setSelected(value)}} htmlFor={`r${value}`} className="cursor-pointer group-hover:bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center">
                        <StarIcon className={classes} />
                    </Label>
                </div>
            )
        })}
        </RadioGroup>
    )
}
