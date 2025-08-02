import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {EditQuestionForm} from "@/components/form/edit/EditQuestionForm";

interface EditQuestionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    questionId: string | undefined;
}

export function EditQuestionDialog({open, onOpenChange, questionId}: EditQuestionDialogProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                {questionId && <EditQuestionForm questionId={questionId} />}
            </DrawerContent>
        </Drawer>
    );
}
