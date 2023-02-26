import { useLabels } from '@/features/labels/api/getLabels';

export const useLabelOptions = () => {
    const { data } = useLabels();
    
    if(!data) return [];

    return data.map(item => ({
        value : item.id,
        label : item.name
    }));
};