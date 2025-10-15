import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Мангал Стандарт";
  const ShortDescription = "Мангал Стандарт — міцний та надійний мангал для дому та виїздів на природу. Компактний та зручний у транспортуванні, він дозволяє рівномірно готувати м’ясо, рибу та овочі.";
  const ProductPrice = 2699;
  const ProductImage = 'https://www.smakota.club/shop/MangalStandart-700x700-social.png';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "MANGAL-STANDART", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "MZAVOD"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/mangal-standart",
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
          "value": "200.00",
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
              <li>Виготовлений з міцного металу товщиною 3 мм</li>
              <li>Стійкий та надійний корпус вагою 19 кг</li>
              <li>Компактний розмір дозволяє легко транспортувати та встановлювати</li>
              <li>Знімні ніжки для зручного зберігання та перевезення</li>
              <li>Дві решітки гриль із сталі забезпечують рівномірне приготування продуктів</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>

            <p className="mb-3">Мангал Стандарт — надійний та зручний пристрій для приготування м’яса, риби та овочів на відкритому вогні. Його продумана конструкція дозволяє швидко розпалити вугілля та рівномірно прогрівати продукти.</p>

            <p className="mb-3">Модель оснащена однією топкою та двома сталевими решітками гриль, що робить процес приготування максимально комфортним та ефективним. Знімні ніжки полегшують транспортування та зберігання, а стійка конструкція гарантує безпеку під час використання.</p>

            <p className="mb-3">Корпус виготовлений із товстого металу 3 мм, що забезпечує довговічність та стабільну температуру під час готування. Мангал простий у догляді і не потребує спеціального обслуговування, що робить його чудовим вибором для дому та виїздів на природу.</p>

            <p className="mb-6">Його компактні габарити дозволяють легко розташувати мангал на будь-якій площадці або терасі, зберігаючи при цьому зручність і комфорт при приготуванні страв.</p>

            <h2 className="text-2xl font-bold mb-6">Технічні характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Товщина металу: 3 мм</li>
              <li>Вага: 19 кг</li>
              <li>Довжина: 600 мм</li>
              <li>Ширина: 310 мм</li>
              <li>Висота: 750 мм</li>
              <li>Топка: 1 шт.</li>
              <li>Знімні ніжки: 4 шт.</li>
              <li>Решітки гриль (сталь): 2 шт.</li>
            </ul>


            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p className="mb-3">Щоб замовити { ProductName }, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
