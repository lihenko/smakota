import AdminMenu from './AdminMenu';
import Stat from './Stat';

export default async function Page() {


  return (
    <>
      <div className="text-center pt-16">
        <h1>Панель адміністратора</h1>
      </div>
      <AdminMenu />
      <Stat />
    </>
  );
}