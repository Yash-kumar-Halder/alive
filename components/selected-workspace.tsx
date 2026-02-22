'use client';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const SelectedWorkspace = () => {
    const workspaceName = useSelector((state: RootState) => state.workspace.name);
    return <div>{workspaceName ? workspaceName : <span>Loading...</span>}</div>;
};

export default SelectedWorkspace;
