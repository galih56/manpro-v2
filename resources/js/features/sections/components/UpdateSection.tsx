import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, Option, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useSection } from '../api/getSection';
import { UpdateSectionDTO, useUpdateSection } from '../api/updateSection';
import { useTagOptions } from '@/hooks/useTagOptions';
import { useCallback, useEffect, useState } from 'react';
import { Tag } from '@/features/tags';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';
import { DatePicker } from '@/components/Elements/DatePicker';

type UpdateSectionProps = {
  sectionId: string;
};

const schema = z.object({
  projectId: z.string(),
  title: z.string().min(1,'Required'),
  description: z.nullable(z.string()),
});

export const UpdateSection = ({ sectionId }: UpdateSectionProps) => {
  const sectionQuery = useSection({ sectionId });
  const projectOptions = useProjectOptions();
  const updateSectionMutation = useUpdateSection();


  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateSectionMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm" />
        }
        title="Update Section"
        submitButton={
          <Button
            form="update-section"
            type="submit"
            size="sm"
            isLoading={updateSectionMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateSectionDTO['data'], typeof schema>
          id="update-section"
          onSubmit={async (values) => {
            await updateSectionMutation.mutateAsync({ data: values, sectionId });
          }}
          options={{
            defaultValues: {
              title: sectionQuery.data?.title,
              description: sectionQuery.data?.description,
              projectId: sectionQuery.data?.project?.id 
            },
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
              <SelectField
                label='Project'
                options={projectOptions}
                defaultValue={sectionQuery.data?.project?.id}
                error={formState.errors['projectId']}
                registration={register('projectId')}
                control={control}
              />
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />
              <TextAreaField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
              />
             
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
