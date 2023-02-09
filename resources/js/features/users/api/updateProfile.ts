import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/lib/authentication';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

export type UpdateProfileDTO = {
  data: {
    email: string;
    name: string;
  };
};

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/users/profile`, data);
};

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { add } = useNotifications();
  const { refetch : refetchUser } = useAuth();
  return useMutation({
    onSuccess: () => {
      add({
        type : 'success',
        title : 'message'
      })
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
