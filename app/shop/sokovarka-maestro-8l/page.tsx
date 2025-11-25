import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Соковарка-пароварка MR-1030 Maestro Basic 8л";
  const ShortDescription = "Соковарка з нержавіючої сталі — це практичний помічник для приготування натуральних соків та консервування. Вона має три основні ємності: паровий кошик на 8 л, ємність для збору соку на 2,5 л та нижню каструлю на 4,5 л. Скляна кришка з отвором для пари забезпечує зручний контроль процесу, а силіконова трубка з металевим затискачем дозволяє легко та акуратно зливати готовий сік. Підходить для всіх типів плит, легко миється та виготовлена з довговічної нержавіючої сталі товщиною 0,6 мм. Ідеальна для домашнього використання та заготівель.";
  const ProductPrice = 1499;
  const ProductImage = 'https://www.smakota.club/shop/9c590de21909058d3bf170ad5ce86aa9.jpg';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "SKOVARKA-MAESTRO-8L", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Maestro"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/sokovarka-maestro-8l",
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
              <li>Виготовлена з високоякісної нержавіючої сталі товщиною 0,6 мм</li>
              <li>Складається з 5 елементів для універсального використання</li>
              <li>Підходить для всіх типів плит та варильних поверхонь</li>
              <li>Місткий паровий кошик і зручна каструля для збору соку</li>
              <li>Скляна кришка з отвором для випуску пари дозволяє контролювати процес</li>
              <li>Силіконова трубка з металевим затискачем забезпечує зручність та безпеку</li>
              <li>Легко миється та не піддається корозії</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>

            <p className="mb-3">
              Соковарка з нержавіючої сталі — це практичний та надійний кухонний помічник для приготування натуральних соків,
              консервації та обробки фруктів, ягід чи овочів. Міцна конструкція з нержавіючої сталі товщиною 0,6 мм гарантує
              довговічність та рівномірне прогрівання.
            </p>

            <p className="mb-3">
              Модель складається з трьох основних ємностей: нижньої каструлі на 4,5 л, ємності для збору соку на 2,5 л
              та великого парового кошика на 8 л. Така конфігурація дозволяє готувати значний обсяг продуктів одночасно.
              Скляна кришка з отвором для пари допомагає контролювати процес та запобігає надмірному тиску.
            </p>

            <p className="mb-3">
              Завдяки силіконовій трубці з металевим затискачем сік легко переливається у будь-яку ємність без проливання.
              Соковарка сумісна з усіма видами плит, включно з індукційними, що робить її універсальним рішенням для дому.
            </p>

            <p className="mb-6">
              Всі елементи легко миються, а нержавіюча сталь довго зберігає свій вигляд та стійкість до корозії.
              Це чудовий варіант для тих, хто цінує домашні натуральні напої та зручність у приготуванні.
            </p>

            <h2 className="text-2xl font-bold mb-6">Технічні характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Об&#8217;єм парового кошика: 8 л</li>
              <li>Об&#8217;єм ємності для збору соку: 2,5 л</li>
              <li>Об&#8217;єм нижньої каструлі: 4,5 л</li>
              <li>Діаметр: 26 см</li>
              <li>Висота ємностей: 16 см</li>
              <li>Матеріал: нержавіюча сталь (0,6 мм)</li>
              <li>Матеріал кришки: скло з отвором для випуску пари</li>
              <li>Силіконова трубка з металевим затискачем</li>
              <li>Підходить для всіх типів плит</li>
            </ul>


            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p className="mb-3">Щоб замовити {ProductName}, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
