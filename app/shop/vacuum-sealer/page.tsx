import {metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export type { metadata };

export default function ShopPage() {
  const ProductName = "Вакуумний пакувальник для кухні";
  const ProductPrice = 250;
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
              Вакуумний пакувальник — це незамінний помічник на вашій кухні, який допоможе зберегти свіжість продуктів, продовжити термін їх зберігання та зменшити витрати.
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
              <li>Можливість заморожувати продукти надовго без втрати їхньої якості;</li>
              <li>Збереження вітамінів та корисних властивостей;</li>
              <li>Надійний захист від сторонніх запахів;</li>
              <li>Економне використання простору на кухні та в морозильнику;</li>
              <li>Допомагає довше зберігати свіжість продуктів;</li>
              <li>Скорочує час приготування страв.</li>
            </ul>
            <img src="/shop/5659401417_w640_h640_vakuumnyj-upakovschik-dlya.webp" alt="Вакуумний пакувальник" className="rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-6">Опис:</h2>

            <p><strong>Вакууматор Vacuum Sealer</strong> — ідеальний помічник для тих, хто дбає про своє здоров’я та якість харчування. З цим пристроєм ви зможете швидко запакувати продукти у вакуумні пакети, зберігаючи їх свіжими значно довше. Підходить для фруктів, овочів, м’яса, птиці, риби, круп та інших продуктів. Після вакуумування та зберігання в холодильнику термін придатності збільшується у кілька разів.</p>

            <p>Вакуумний пакувальник Vacuum Sealer можна використовувати не лише для продуктів, а й для захисту особистих речей — паспорта, документів, засобів гігієни. Вакуумна упаковка збереже їх у безпеці навіть за несприятливих погодних умов під час подорожей чи перельотів.</p>

            <img src="/shop/5659403103_w640_h640_vakuumnyj-upakovschik-dlya.webp" alt="Вакуумний пакувальник" className="rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тип: вакууматор для продуктів</li>

              <li>Матеріал: пластик</li>

              <li>Рівень вакууму: -60 кПа</li>

              <li>Потужність: 90 Вт</li>

              <li>Живлення: 220 В</li>

              <li>LED-індикатор роботи: є</li>

              <li>Максимальна ширина пакета: 29 см</li>

              <li>Розміри: 37 × 7 × 5,2 см</li>

              <li>Вага: 600 г</li>

              <li>Колір: чорний</li>
            </ul>
            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Вакуумний пакувальник Vacuum Sealer</li>  
              <li>Пакети для вакуумування</li>
              <li>Упаковка</li>
            </ul>
            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p>Щоб замовити вакуумний пакувальник, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
