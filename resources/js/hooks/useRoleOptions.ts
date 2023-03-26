import { useRoles } from '@/features/roles/api/getRoles';

export const useRoleOptions = () => {
    const { data } = useRoles();
    
    if(!data) return [];

    return data.map(item => ({
        value : item.id.toString(),
        label : item.name
    }));
};