'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const CreateWorkspace = () => {
    const handleSubmit = async () => {
        const response = await fetch('/api/workspaces', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'My New Workspace',
                description: 'Optional description',
            }),
        });
        console.log(response);
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button>Create new workspace</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create workspace</DialogTitle>
                        <form className="flex flex-col gap-4 p-4 [&_input]:border [&_input]:border-neutral-600 [&_input]:focus:outline-0 [&_input]:px-2 [&_input]:py-1 [&_input]:rounded-sm  ">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                />
                            </div>
                        </form>
                        <Button
                            onClick={() => handleSubmit()}
                            className="cursor-pointer active:scale-95"
                        >
                            Create workspace
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateWorkspace;
