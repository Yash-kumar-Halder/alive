import CreateWorkspace from '@/components/create-workspace';
import SelectedWorkspace from '@/components/selected-workspace';

const page = () => {
    return (
        <div>
            <SelectedWorkspace />
            <CreateWorkspace />
        </div>
    );
};

export default page;
