import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Машинка для приготування пасти та лапші";
  const ShortDescription = "Машина для приготування пасти та лапші Pasta Set QF-150 допоможе швидко розкатати тісто та нарізати локшину. Надійна, з нержавіючої сталі, з регулюванням товщини пласта. Ідеальний вибір для домашньої італійської кухні.";
  const ProductPrice = 1200;
  const ProductImage = 'https://www.smakota.club/shop/63878795499311.webp';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "LAPSHERIZKA", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Smakuy"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/lapsherizka",
      "priceCurrency": "UAH",
      "price": ProductPrice, // можна брати мінімальну або середню ціну
      "availability": InStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "100.00",
          "currency": "UAH"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "UA"
        },
        "shippingLabel": "Нова Пошта",
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "value": 2,
            "minValue": 0,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "value": 2,
            "minValue": 2,
            "maxValue": 3,
            "unitCode": "DAY"
          }
        }
      }
    }   
  };
  return (
    <main className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
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
              {ShortDescription}
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
              <li>Підходить для приготування пасти, локшини, лазаньї та равіолі;</li>
              <li>Регулювання товщини тіста від 0,5 до 2,5 мм для будь-яких рецептів;</li>
              <li>Міцна конструкція з нержавіючої сталі — довговічна та безпечна для продуктів;</li>
              <li>Просте кріплення до поверхні забезпечує стабільність під час роботи;</li>
              <li>Легке очищення після використання;</li>
              <li>Не потребує електрики — ідеальний варіант для домашньої кухні.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p>
              <strong>Лапшерізка та тестораскатка Pasta Set QF-150</strong> — це універсальний пристрій для
              приготування справжньої італійської пасти у домашніх умовах. З її допомогою ви легко
              розкатаєте тісто та наріжете локшину або листи для лазаньї з ідеальною товщиною.
            </p>

            <p>
              Пристрій має одну пару валів шириною <strong>140 мм</strong>, що дозволяє створювати
              рівномірні пласти тіста. Ви можете обрати товщину пласта від <strong>0,5 до 2,5 мм</strong> та
              ширину лапші від <strong>2 до 6 мм</strong>. Завдяки цьому готувати стає швидко, зручно та
              професійно, навіть без досвіду.
            </p>

            <p className="mb-6">
              Корпус виготовлено з <strong>нержавіючої сталі</strong>, тому машина стійка до корозії,
              безпечна для продуктів і має привабливий блискучий вигляд. Компактні розміри дозволяють
              зручно зберігати її навіть на невеликій кухні.
            </p>

            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тип: лапшерізка / тестораскатка;</li>
              <li>Модель: Pasta Set QF-150;</li>
              <li>Матеріал корпусу: нержавіюча сталь;</li>
              <li>Кількість валів: 1 пара;</li>
              <li>Ширина вала: 140 мм;</li>
              <li>Ширина пласта тіста: 140 мм;</li>
              <li>Товщина пласта: від 0,5 до 2,5 мм;</li>
              <li>Ширина лапші: від 2 до 6 мм;</li>
              <li>Призначення: паста, локшина, лазанья, равіолі;</li>
              <li>Тип приводу: механічний (ручний);</li>
              <li>Матеріал ножів: нержавіюча сталь.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Лапшерізка Pasta Set QF-150;</li>
              <li>Насадки для нарізання лапші різної ширини;</li>
              <li>Рукоятка для прокручування;</li>
              <li>Кріплення до столу;</li>
              <li>Інструкція користувача.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Догляд та використання:</h2>
            <p className="mb-6">
              Після кожного використання видаліть залишки тіста сухим пензликом або м’якою тканиною.
              Не мийте машину під водою — достатньо протерти вологою серветкою. Зберігайте у сухому
              місці, уникаючи потрапляння вологи.
            </p>


            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p>Щоб замовити {ProductName}, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
