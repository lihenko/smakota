import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Електрична м’ясорубка Domotec MS-2024";
  const ShortDescription = "Domotec MS-2024 — універсальна електрична м’ясорубка з функцією подрібнення, шаткування та соковижималки. Оснащена реверсом, міцним металевим шнеком і декількома насадками — ідеальна для домашнього використання.";
  const ProductPrice = 1950;
  const ProductImage = 'https://www.smakota.club/shop/23577062294892.webp';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "DOMOTECT-MS-2024", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "DOMOTECT"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/meat-grinder-domotec-ms-2024",
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
            "maxValue": 7,
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
              <li>Висока потужність (3000 Вт) — швидке приготування; </li>
              <li>Функція реверсу — запобігає затору продуктів і забезпечує рівномірне подрібнення; </li>
              <li>Міцний металевий шнек, 2 ножі з нержавіючої сталі та 3 диски (3 мм, 5 мм, 7 мм) — різноманіття функцій; </li>
              <li>Набір насадок: для томатів, терки/шаткування, ковбас і кеббе — універсальність на кухні; </li>
              <li>Гумові ніжки для стійкості, захист двигуна від перевантаження — безпечне і стабільне використання; </li>
              <li>Широкий лоток і низький рівень шуму — комфорт під час роботи. </li>
            </ul>


            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p><strong>Domotec MS-2024</strong> — це сучасна електрична м&#8217;ясорубка шнекового типу з потужністю 3000 Вт, створена для ефективної обробки м&#8217;яса, риби, грибів, овочів, фруктів. Пристрій має функцію реверсу, що дозволяє уникнути заторів і покращує якість подрібнення.</p>

            <p className="mb-6">У комплекті ви знайдете три типи дисків з різним діаметром отворів (3 мм, 5 мм, 7 мм), два ножі з нержавіючої сталі, насадку для томатів, насадку &#171;кеббе&#187; для виготовлення домашньої ковбаси, насадки для терки/шаткування. Корпус комбінований — пластик + метал, має гумові ніжки для додаткової стійкості під час роботи.</p>


            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тип: електрична м&#8217;ясорубка з функціями подрібнювача та соковижималки;</li>
              <li>Потужність: 3000 Вт;</li>
              <li>Функція реверсу (зворотний хід ножів);</li>
              <li>Диски: 3 мм, 5 мм, 7 мм;</li>
              <li>Ножі: 2 шт., нержавіюча сталь;</li>
              <li>Корпус: пластик/метал;</li>
              <li>Насадки: томати, кеббе, терка/шаткування;</li>
              <li>Сфера використання: побутове — для дому.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Електрична м&#8217;ясорубка Domotec MS-2024;</li>
              <li>3 диски (3 мм, 5 мм, 7 мм);</li>
              <li>2 ножі з нержавіючої сталі;</li>
              <li>Насадка для томатів;</li>
              <li>Насадка &#171;кеббе&#187; для домашньої ковбаси;</li>
              <li>2 насадки для терки/шаткування;</li>
              <li>Лоток для продуктів;</li>
              <li>Інструкція.</li>
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
