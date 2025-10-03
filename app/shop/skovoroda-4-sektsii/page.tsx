import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Сковорода з антипригарним гранітним покриттям";
  const ProductPrice = 245;
  return (
    <main className="py-16">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full lg:w-1/2 px-3">
            <div className="flex justify-center mb-6">
              <ProductSlider />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-3 xl:pl-10">
            <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">{ ProductName }</h1>
            <div className="text-lg mb-4">
              Порційна сковорідка з 4 відсіками – зручний аксесуар для швидкого приготування сніданку. Антипригарне покриття, стильна ручка з бакеліту та можливість готувати одразу 4 страви роблять її незамінною на кухні. Ідеальна для млинців, омлетів, панкейків та яєчні.
            </div>
            <div className="text-lg mb-4">
              Ціна: <span className="font-bold">{ ProductPrice } грн</span>
            </div>
            <div className="text-lg mb-4">
              <a className="btn btn-primary" href="#order">Замовити</a>
            </div>
          </div>
        </div>
        <div className="flex -mx-3 mb-6">
          <div className="w-full px-3">
            <h2 className="text-2xl font-bold mb-6">Переваги:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Можливість приготувати 4 страви одночасно;</li>
              <li>Ідеально кругла форма панкейків, омлетів чи яєчні;</li>
              <li>Антипригарне покриття для легкого приготування без зайвого масла;</li>
              <li>Зручна бакелітова ручка, яка не нагрівається та не ковзає;</li>
              <li>Стильний дизайн із текстурою під дерево;</li>
              <li>Підходить для щоденного використання та легкого догляду.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p><strong>Порційна сковорідка з 4 відсіками</strong> — ідеальне рішення для сніданків та швидких перекусів. 
            Завдяки чотирьом роздільним секціям ви можете одночасно приготувати панкейки, омлети, млинці чи яєчню. 
            Сковорідка має антипригарне покриття, яке дозволяє готувати з мінімальною кількістю масла, зберігаючи користь та смак страв.</p>

            <p>Ручка виготовлена з <strong>якісного бакеліту</strong>, який не нагрівається під час приготування, не ковзає в руці та вирізняється довговічністю. 
            Завдяки стильному дизайну з текстурою під дерево сковорідка не лише зручна, а й приваблива зовні. Вона стане справжньою окрасою вашої кухні.</p>

            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тип: сковорідка для 4 страв;</li>
              <li>Матеріал: алюмінієвий сплав з антипригарним покриттям;</li>
              <li>Ручка: бакеліт з текстурою під дерево;</li>
              <li>Кількість відсіків: 4;</li>
              <li>Форма відсіків: кругла;</li>
              <li>Призначення: панкейки, млинці, омлети, яєчня;</li>
              <li>Сумісність: газові та електричні плити;</li>
              <li>Колір: чорний;</li>
              <li>Діаметр: 24 см;</li>
              <li>Вага: близько 900 г.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Порційна сковорідка з 4 відсіками</li>
              <li>Подарункова упаковка</li>
            </ul>

            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p>Щоб замовити {ProductName}, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
