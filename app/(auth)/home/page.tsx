'use client';

import { Button } from '@/components/ui/button';

const page = () => {
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
            <Button
                onClick={() => handleSubmit()}
                className="cursor-pointer active:scale-95"
            >
                Create workspace
            </Button>
        </div>
    );
};

export default page;
