import { useTags } from '@/features/tags/api/getTags';

export const useTagOptions = () => {
    const { data } = useTags();
    
    if(!data) return [];

    return data.map(item => ({
        value : item.id.toString(),
        label : item.name
    }));
};