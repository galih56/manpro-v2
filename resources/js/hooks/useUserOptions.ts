import { useUsers } from '@/features/users/api/getUsers';

export const useUserOptions = () => {
    const { data } = useUsers();
    
    if(!data) return [];

    return data.map(item => ({
        value : item.id,
        label : item.name
    }));
};