import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface workspaceState {
    currentWorkspaceId: string | null;
    name: string | null;
}

const initialState: workspaceState = {
    currentWorkspaceId: null,
    name: null,
};

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setWorkspace: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.currentWorkspaceId = action.payload.id;
            state.name = action.payload.name;
        },
        clearWorkspace: (state) => {
            state.currentWorkspaceId = null;
        },
    },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
