import { Plus } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {FormCreateChapter} from "@/components/form-create-chapter";
import {useRef, useState} from "react";

interface Props {
    bookId: number;
    onAddChapter: (newChapter: {
        name: string;
        publicContent: string;
        privateContent: string;
    }) => void;
}

export default function ModalAddChapter({bookId, onAddChapter}: Props) {
    const ref = useRef(null);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="w-5 h-5 flex-none" />
                    Add a chapter
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add new chapter</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <FormCreateChapter onComplete={(newChapter) => {
                    onAddChapter(newChapter);
                    ref.current.click();
                }} bookId={bookId}/>
                <DialogFooter className="sm:justify-start absolute bottom-6 left-6">
                    <DialogClose asChild>
                        <Button ref={ref} type="button" variant="link">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
