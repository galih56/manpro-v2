import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { AxiosError } from 'axios';
import { camelizeKeys } from 'humps';
import { useRegister } from '@/lib/authentication';

const schema = z
  .object({
    email: z.string().email("This is not a valid email").min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(1, 'Password is required'),
    passwordConfirmation: z.string().min(1, 'Password confirmation is required'),
  }).superRefine(({ password, passwordConfirmation } , ctx)=>{
    if(password != passwordConfirmation){
      ctx.addIssue({
        code : z.ZodIssueCode.custom,
        path : ['passwordConfirmation'],
        message : 'Password confirmation did not match'
      })
    }
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

export const RegisterForm = ({ onSuccess , onError }: RegisterFormProps) => {
  const signUp = useRegister();
  
  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values, methods) => {
          signUp.mutate(values, {
            onSuccess : (data, variables, context) => {
              if(onSuccess !== undefined) onSuccess();
            },
            onError : (error , variables, context) => {
              const { response } = error as AxiosError;
              const { data } = response as any;

              if(data?.errors !== undefined){
                const errors = camelizeKeys(data?.errors);
                Object.keys(errors).forEach((key)=>{
                  const messages = errors[key];
                  if(messages.length){ 
                    methods.setError(key, {
                      type : 'custom',
                      message : messages[0]
                    });
                  }
                })
              }
              if(onError !== undefined) onError()
            }
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
