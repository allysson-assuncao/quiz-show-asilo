import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {AddQuizForm} from "@/components/form/add/AddQuizForm";
import {Button} from "@/components/ui/button";

interface AddQuizDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddQuizDialog({open, onOpenChange}: AddQuizDialogProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <AddQuizForm/>
                <div className="flex justify-center mt-8">
                    <Button className="w-1/3 h-12 text-lg" onClick={() => onOpenChange(false)}>
                        Registrar quiz
                    </Button>
                </div>
                <div className="flex justify-center mt-8"/>
            </DrawerContent>
        </Drawer>
    );
}
