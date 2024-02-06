import { Link } from 'react-router-dom';
import * as z from 'zod';
import { Button } from "@tremor/react";
import { Form, InputField } from '@/components/Form';
import { useLogin } from '@/lib/authentication';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess? : () => void;
  onError? : () => void;
};

export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const login = useLogin();

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          login.mutate(values, { 
            onSuccess : onSuccess,
            onError :onError
          });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
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
            <Button loading={login.isLoading} type="submit" className="w-full">
              Sign in
            </Button>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to="../register" className="font-medium text-blue-600 hover:text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
