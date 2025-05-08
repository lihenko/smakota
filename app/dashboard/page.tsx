import Dashboard from './Dashboard';
import UserMenu from './UserMenu';
import { getUser } from './pageSetting';

export default async function Page() {
  const currentUser = await getUser();

  return (
    <>
      <UserMenu currentUser={currentUser} />
      <Dashboard currentUser={currentUser} />
    </>
  );
}

