import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Електрогриль Zepline ZP-820";
  const ShortDescription = "Потужний електрогриль Zepline ZP-820 (3500 Вт) із знімними антипригарними пластинами забезпечує швидке й рівномірне обсмаження страв. Легко миється, стійкий до подряпин і має стильний металевий дизайн.";
  const ProductPrice = 1200;
  const ProductImage = 'https://smakota.club/shop/6848136432_elektrogril-zepline-zp-820.jpg';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "ZEPLINE-ZP-820", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "ZEPLINE"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/electrogril-zepline-zp-820",
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
          "value": "150.00",
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
              <li>Висока потужність 3500 Вт забезпечує швидкий нагрів і рівномірне обсмаження;</li>
              <li>Знімні антипригарні пластини — легке очищення вручну або в посудомийці;</li>
              <li>Підходить для приготування стейків, овочів, риби, сендвічів і багатьох інших страв;</li>
              <li>Висока теплопровідність гарантує стабільний результат приготування;</li>
              <li>Міцне покриття, стійке до подряпин, забезпечує довговічність використання;</li>
              <li>Сучасний дизайн у поєднанні металу та чорного пластику гармонійно впишеться в будь-яку кухню.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p>
              <strong>Електрогриль Zepline ZP-820</strong> — універсальний прилад для приготування смачних і корисних страв у домашніх умовах. 
              Завдяки потужності <strong>3500 Вт</strong> гриль миттєво нагрівається та забезпечує рівномірне обсмаження продуктів з обох боків. 
              Ідеально підходить для приготування м’яса, овочів, риби, бутербродів чи паніні.
            </p>

            <p>
              Основною перевагою моделі є <strong>знімні антипригарні пластини</strong>, які легко мити як під водою, так і в посудомийній машині. 
              Надійне антипригарне покриття не дозволяє продуктам прилипати, а отже — готування стає швидким і приємним. 
              Корпус із комбінації металу та пластику стійкий до перегріву й механічних пошкоджень, а стильний дизайн додає приладу естетичності.
            </p>

            <p className="mb-6">
              Електрогриль Zepline стане чудовим вибором для щоденного використання, адже дозволяє готувати швидко, смачно й без зайвого жиру. 
              Завдяки компактним розмірам він легко розміститься навіть на невеликій кухні.
            </p>

            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тип: контактний (прес-гриль);</li>
              <li>Потужність: 3500 Вт;</li>
              <li>Покриття пластин: антипригарне;</li>
              <li>Особливості: знімні пластини, висока теплопровідність;</li>
              <li>Матеріал корпусу: метал, пластик;</li>
              <li>Колір: металік / чорний;</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Електрогриль Zepline ZP-820;</li>
              <li>Змінні антипригарні пластини;</li>
              <li>Лопатка для очищення;</li>
              <li>Інструкція з експлуатації.</li>
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
