import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateUserDTO, useCreateUser } from '../api/createUser';
import { useRoleOptions } from '@/hooks/useRoleOptions';

const schema = z.object({
  email: z.string().email("This is not a valid email").min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required'),
  passwordConfirmation: z.string().min(1, 'Password confirmation is required'),
  roles: z.array(z.object({ label : z.string(), value : z.number() })).nullish()
}).superRefine(({ password, passwordConfirmation } , ctx)=>{
  if(password != passwordConfirmation){
    ctx.addIssue({
      code : z.ZodIssueCode.custom,
      path : ['passwordConfirmation'],
      message : 'Password confirmation did not match'
    })
  }
});

export const CreateUser = () => {
  const roleOptions = useRoleOptions();
  const createUserMutation = useCreateUser();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createUserMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create User
          </Button>
        }
        title="Create User"
        submitButton={
          <Button
            form="create-user"
            type="submit"
            size="sm"
            isLoading={createUserMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateUserDTO['data'], typeof schema>
          id="create-user"
          onSubmit={async (values) => {
            if(values.roles){
              values.roles = values.roles.map((role : any) => role.value);
            }
            await createUserMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
              <InputField
                type="text"
                label="Name"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <InputField
                type="email"
                label="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
              />
              <InputField
                type="password"
                label="Password"
                error={formState.errors['password']}
                registration={register('password')}
              />
              <InputField
                type="password"
                label="Password Confirmation"
                error={formState.errors['passwordConfirmation']}
                registration={register('passwordConfirmation')}
              />
              <SelectField
                label='Roles'
                options={roleOptions}
                error={formState.errors['roles']}
                registration={register('roles')}
                control={control}
                multiple={true}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
