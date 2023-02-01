import { Switch } from '@headlessui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, SelectField } from '@/components/Form';
import { useAuth, useRegister } from '@/lib/auth';

const schema = z
  .object({
    email: z.string().min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(1, 'Password is required'),
  });

type RegisterValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type RegisterFormProps = {
  onSuccess? : () => void;
  onError? : () => void;
};

export const RegisterForm = ({ onSuccess, onError }: RegisterFormProps) => {
  const signUp = useRegister();

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          signUp.mutate(values, {
            onSuccess : onSuccess,
            onError : onError
          })
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
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
            <div>
              <Button isLoading={signUp.isLoading} type="submit" className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to="../login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
