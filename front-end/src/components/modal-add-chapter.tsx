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
import {useState} from "react";

export default function ModalAddChapter() {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="w-5 h-5 flex-none" />
                    Add a chapter
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add new chapter</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <FormCreateChapter afterSubmit={closeModal} />
                {/*<div className="flex items-center space-x-2">*/}
                {/*    <div className="grid flex-1 gap-2">*/}
                {/*        <Label htmlFor="link" className="sr-only">*/}
                {/*            Link*/}
                {/*        </Label>*/}
                {/*        <Input*/}
                {/*            id="link"*/}
                {/*            defaultValue="https://ui.shadcn.com/docs/installation"*/}
                {/*            readOnly*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    /!*<Button type="submit" size="sm" className="px-3">*!/*/}
                {/*    /!*    <span className="sr-only">Copy</span>*!/*/}
                {/*    /!*    <Copy className="h-4 w-4" />*!/*/}
                {/*    /!*</Button>*!/*/}
                {/*</div>*/}
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
