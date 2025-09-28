import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Ручна овочерізка VEGGIE SLICER";
  const ProductPrice = 360;
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
              Овочерізка зі знімним контейнером допоможе швидко та рівно нарізати продукти кільцями, соломкою чи кубиками. Гумові ніжки фіксують її на поверхні, а насадки легко мити під водою чи в посудомийці.
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
              <li>Нарізка трьома способами: кільця, соломка, кубики.</li>
              <li>Швидка та зручна робота без зайвих зусиль.</li>
              <li>Гумові ніжки для стійкості на будь-якій поверхні.</li>
              <li>Знімний контейнер для акуратності на кухні.</li>
              <li>Легке миття під проточною водою або в посудомийці.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>

            <p className="mb-3">Овочерізка зі знімним контейнером — це зручний кухонний інструмент, який значно спрощує та прискорює процес приготування страв. Вона дозволяє нарізати продукти трьома способами: тонкими кільцями, соломкою та акуратними кубиками. Такий функціонал стане у пригоді під час приготування салатів, гарнірів, супів чи овочевих заготовок.</p>

            <p className="mb-3">Корпус овочерізки оснащений гумовими ніжками, які надійно фіксують її на робочій поверхні та запобігають ковзанню під час роботи. Завдяки знімному контейнеру нарізані інгредієнти акуратно збираються в одному місці, не розсипаючись по кухонному столу.</p>

            <p className="mb-3">Догляд за овочерізкою максимально простий: насадки з гострими лезами легко відокремлюються від контейнера, їх можна швидко промити під проточною водою або помістити в посудомийну машину. Така конструкція не лише економить час, але й забезпечує гігієнічність під час приготування їжі.</p>

            <p className="mb-6">Овочерізка компактна, займає мінімум місця на кухні та стане незамінним помічником для тих, хто цінує швидкість, акуратність і комфорт під час готування.</p>

            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Матеріал: харчовий пластик, нержавіюча сталь.</li>

              <li>Розмір: 32 х 11 см.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Корпус із вбудованим слайсером та захисною кришкою</li>  
              <li>Тримач для продуктів</li>
              <li>7 змінних насадок</li>
              <li>Насадка для відділення жовтків не входить в комплект</li>
              <li>Щітка для чищення насадок.</li>
            </ul>
            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p className="mb-3">Щоб замовити вакуумний пакувальник, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
