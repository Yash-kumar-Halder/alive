'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface WorkspaceFormValues {
    name: string;
    description?: string;
}

const CreateWorkspace = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<WorkspaceFormValues>();

    const onSubmit = async (data: WorkspaceFormValues) => {
        try {
            setLoading(true);

            const response = await fetch('/api/workspaces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setError('root', {
                    type: 'server',
                    message: result?.message || 'Something went wrong',
                });
                throw new Error('Failed to create workspace');
            }

            reset(); // clear form
            toast.success(result.message);
            console.log(result);
            console.log('Workspace created');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new workspace</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create workspace</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 p-4 
          [&_input]:border 
          [&_input]:border-neutral-600 
          [&_input]:focus:outline-0 
          [&_input]:px-2 
          [&_input]:py-1 
          [&_input]:rounded-sm"
                >
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', {
                                required: 'Name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Minimum 2 characters',
                                },
                            })}
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            type="text"
                            {...register('description')}
                        />
                    </div>
                    {errors.root?.message && (
                        <p className="text-destructive">{errors.root?.message}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer active:scale-95"
                    >
                        {loading ? 'Creating...' : 'Create workspace'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkspace;
