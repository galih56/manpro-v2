import { useProjects } from '@/features/projects/api/getProjects';

export const useProjectOptions = () => {
    const { data } = useProjects();
    
    if(!data) return [];

    return data.map(item => ({
        value : item.id.toString(),
        label : item.title
    }));
};