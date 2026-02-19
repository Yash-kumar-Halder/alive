'use client';

import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Workspace {
    _id: string;
    name: string;
}

const SelectWorkspace = () => {
    const [workspaces, setWorkspaces] = React.useState<Workspace[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedWorkspace, setSelectedWorkspace] = React.useState<string>('');

    React.useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                setLoading(true);

                const response = await fetch('/api/workspaces');
                const result = await response.json();
                console.log(result);

                if (!response.ok) {
                    throw new Error(result?.message || 'Failed to fetch workspaces');
                }

                setWorkspaces(result.data);

                // auto select first workspace
                if (result.data.length > 0) {
                    setSelectedWorkspace(result.data[0]._id);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaces();
    }, []);

    if (loading) {
        return <p className="text-sm text-muted-foreground">Loading workspaces...</p>;
    }

    if (error) {
        return <p className="text-sm text-red-500">{error}</p>;
    }

    if (workspaces.length === 0) {
        return <p className="text-sm text-muted-foreground">No workspaces found</p>;
    }

    return (
        <Select
            value={selectedWorkspace}
            onValueChange={(value) => setSelectedWorkspace(value)}
        >
            <SelectTrigger className="outline-0">
                <SelectValue placeholder="Select workspace" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {workspaces.map((workspace) => (
                        <SelectItem
                            key={workspace._id}
                            value={workspace._id}
                        >
                            {workspace.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectWorkspace;
