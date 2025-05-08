import UserMenu from '../UserMenu';
import { getUser } from '../pageSetting';
import CreateRecipePage from './CreateRecipe';

export default async function Page() {
  const currentUser = await getUser();

  return (
    <>
      <UserMenu currentUser={currentUser} />
      <CreateRecipePage />
    </>
  );
}
