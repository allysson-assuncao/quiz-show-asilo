import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AddQuizForm } from "@/components/form/add/AddQuizForm";

interface AddQuizDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddQuizDialog({ open, onOpenChange }: AddQuizDialogProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <AddQuizForm onSuccessAction={() => onOpenChange(false)} />
            </DrawerContent>
        </Drawer>
    );
}