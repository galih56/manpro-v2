import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, MultiSelectField } from '@/components/Form';
import { useAuth } from '@/lib/authentication';

import { UpdateProfileDTO, useUpdateProfile } from '../api/updateProfile';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  roles: z.nullable(
    z.array(
      z.object({ label : z.string(), value : z.number() })
    )
  )
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
          if(values.roles){
            values.roles = values.roles.map((role : any) => role.value);
          }
          console.log(values)
          // await updateProfileMutation.mutateAsync({ data: values });
        }}
        options={{
          defaultValues: {
            name: auth?.name,
            email: auth?.email,
            roles: []
          },
        }}
        schema={schema}
      >
        {({ register, formState, control }) =>{ 
          return (
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
            <MultiSelectField
              label='Roles'
              options={[
                { label : "Admin", value : 0 },
                { label : "User", value : 1 },
              ]}
              error={formState.errors['roles']}
              registration={register('roles')}
              control={control}
              multiple={true}
            />
            
          </>
        )}}
      </Form>
    </FormDrawer>
  );
};
