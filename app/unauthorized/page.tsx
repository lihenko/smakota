export default async function Page() {


    return (
      <>
        <div className="text-center py-16">
          <h1>У вас недостатньо прав для доступа до цієї сторінки</h1>
          <ul className="list-disc">
            <li>Ви не авторизовані</li>
            <li>У вас немає необхідних прав доступу</li>
          </ul>
        </div>
      </>
    );
  }