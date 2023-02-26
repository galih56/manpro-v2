import { useCallback, useEffect, useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, Option, SelectField } from '@/components/Form';
import { useAuth } from '@/lib/authentication';
import { useUser } from '../api/getUser';

import { UpdateUserDTO, useUpdateUser } from '../api/updateUser';
import { useRoleOptions } from '@/hooks/useRoleOptions';
import { Role } from '../types';

type UpdateUserProps = {
  userId: string;
};

const schema = z.object({
  email: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  roles: z.nullable(
    z.array(
      z.object({ label : z.string(), value : z.number() })
    )
  )
});

export const UpdateUser = ({ userId } : UpdateUserProps) => {
  const { data : user } = useUser({ userId })
  const roleOptions = useRoleOptions();
  const updateUserMutation = useUpdateUser();

  const [ defaultRoles, setDefaultRoles ] = useState<Array<Option>>();

  const getDefaultRoleOptions = useCallback(() : Array<Option> => {
    const roles =  user?.roles;
    return roles ? roles.map((role : Role)=> ({
      value : role.id,
      label : role.name
    })) : [];
  }, [userId, user?.roles])

  useEffect(()=>{
    setDefaultRoles(()=>getDefaultRoleOptions());
  },[ userId, user?.roles ]);


  return (
    <FormDrawer
      isDone={updateUserMutation.isSuccess}
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
          isLoading={updateUserMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateUserDTO['data'], typeof schema>
        id="update-profile"
        onSubmit={async (values) => {
          console.log(values)
          if(values.roles){
            values.roles = values.roles.map((role : any) => role.value);
          }
          await updateUserMutation.mutateAsync({ data: values, userId : userId });
        }}
        options={{
          defaultValues: {
            name: user?.name,
            email: user?.email,
            roles: defaultRoles
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
            <SelectField
              label='Roles'
              options={roleOptions}
              error={formState.errors['roles']}
              registration={register('roles')}
              defaultValue={defaultRoles}
              control={control}
              multiple={true}
            />
            
          </>
        )}}
      </Form>
    </FormDrawer>
  );
};
