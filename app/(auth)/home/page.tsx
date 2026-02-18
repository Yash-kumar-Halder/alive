import CreateWorkspace from '@/components/create-workspace';
import SelectWorkspace from '@/components/select-workspace';

const page = () => {
    return (
        <div>
            <SelectWorkspace />
            <CreateWorkspace />
        </div>
    );
};

export default page;
