import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import * as React from 'react';
import { useForm, UseFormReturn, UseFormProps, FormProvider } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues, Schema> = {
  className?: string;
  onSubmit: (values : any, methods? : UseFormReturn<TFormValues, any>) => void;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>({
  onSubmit, children, className, options, id, schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({ ...options, resolver: schema && zodResolver(schema) });
  
  React.useEffect(()=>{
    if(options) methods.reset(options.defaultValues);
  },[ options?.defaultValues])

  return (
    <FormProvider {...methods}>
      <form
        className={clsx('space-y-2', className)}
        onSubmit={methods.handleSubmit((values) => onSubmit( values, methods))}
        id={id}
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};
