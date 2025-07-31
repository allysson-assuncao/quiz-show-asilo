import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {AddQuestionForm} from "@/components/form/add/AddQuestionForm";

interface AddQuestionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditQuestionDialog({open, onOpenChange}: AddQuestionDialogProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <AddQuestionForm/>
            </DrawerContent>
        </Drawer>
    );
}
