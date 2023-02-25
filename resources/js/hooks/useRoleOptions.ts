import * as React from 'react';
import { useRoles } from '@/features/roles/api/getRoles';

export const useRoleOptions = () => {
    const { data } = useRoles();
    
    if(!data) return [];

    return data.map(item => ({
        value : item.id,
        label : item.name
    }));
};