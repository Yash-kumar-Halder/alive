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
import { useDispatch, useSelector } from 'react-redux';
import { setWorkspace } from '@/store/workspaceSlice';
import { RootState } from '@/store/store';

interface Workspace {
    _id: string;
    name: string;
}

const SelectWorkspace = () => {
    const dispatch = useDispatch();

    // Redux (persisted workspace)
    const persistedWorkspaceId = useSelector(
        (state: RootState) => state.workspace.currentWorkspaceId
    );

    const [workspaces, setWorkspaces] = React.useState<Workspace[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // Local UI state (for instant select rendering)
    const [selectedWorkspace, setSelectedWorkspace] = React.useState<string>('');

    // Fetch workspaces
    React.useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                setLoading(true);

                const response = await fetch('/api/workspaces');
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result?.message || 'Failed to fetch workspaces');
                }

                const data: Workspace[] = result.data;
                setWorkspaces(data);

                if (data.length === 0) return;

                /**
                 * 🔥 INDUSTRY LOGIC
                 * 1. If Redux already has workspace (persisted) → use it
                 * 2. Otherwise → auto-select first workspace
                 */
                const initialWorkspace =
                    data.find((w) => w._id === persistedWorkspaceId) || data[0];

                setSelectedWorkspace(initialWorkspace._id);

                dispatch(
                    setWorkspace({
                        id: initialWorkspace._id,
                        name: initialWorkspace.name,
                    })
                );
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
    }, [dispatch]);

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
            onValueChange={(value) => {
                setSelectedWorkspace(value);

                const selected = workspaces.find((workspace) => workspace._id === value);

                if (selected) {
                    dispatch(
                        setWorkspace({
                            id: selected._id,
                            name: selected.name,
                        })
                    );
                }
            }}
        >
            <SelectTrigger className="select-none outline-0 border-0 w-full">
                <SelectValue
                    placeholder="Select workspace"
                    className="select-none"
                />
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
