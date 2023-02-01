import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

export type UpdateProfileDTO = {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
  };
};

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/users/profile`, data);
};

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { dispatch } = useNotifications();
  const { refetch : refetchUser } = useAuth();
  return useMutation({
    onSuccess: () => {
      dispatch({
        type : 'success',
        title : 'message'
      })
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
