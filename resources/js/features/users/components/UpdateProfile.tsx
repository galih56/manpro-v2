import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, MultiSelectField } from '@/components/Form';
import { useAuth } from '@/lib/authentication';

import { UpdateProfileDTO, useUpdateProfile } from '../api/updateProfile';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
});

export const UpdateProfile = () => {
  const { auth } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateProfileDTO['data'], typeof schema>
        id="update-profile"
        onSubmit={async (values) => {
          await updateProfileMutation.mutateAsync({ data: values });
        }}
        options={{
          defaultValues: {
            name: auth?.name,
            email: auth?.email,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="Name"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <InputField
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <SelectField
              label="Roles"
              options={[
                { label : "Admin", value : 0 },
                { label : "User", value : 0 },
              ]}
              error={formState.errors['roles']}
              registration={register('roles')}
              placeholder='Roles'
              multiple={true}
            />
            <MultiSelectField 
              label="Roles"
              options={[
                { label : "Admin", value : 0 },
                { label : "User", value : 0 },
              ]}
              error={formState.errors['roles']}
              registration={register('roles')}
              placeholder='Roles'
              multiple={true}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
