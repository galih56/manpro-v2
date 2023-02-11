import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/authentication';
import { ROLES } from '@/lib/authorization';

export const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl mt-2">
        Welcome <b>{`${auth?.name}`}</b>
      </h1>
      <p className="font-medium">In this application you can:</p>
      {auth?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
      {auth?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )}
    </ContentLayout>
  );
};
