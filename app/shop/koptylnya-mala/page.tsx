import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Коптильня Мала з нержавіючої сталі";
  const ShortDescription = "Коптильня Мала з нержавіючої сталі з гідрозатвором та кришкою-будиночком — компактна та зручна для домашнього використання. Завдяки товстій сталі забезпечує рівномірне нагрівання, гідрозатвор усуває дим у приміщенні, а форма кришки дозволяє конденсату не потрапляти на продукти. Ідеальний вибір для приготування смачних копченостей вдома чи на природі.";
  const ProductPrice = 3049;
  const ProductImage = 'https://smakota.club/shop/dscn1814-700x700.jpg';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "KOPTYLNIA-MALA", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Smakuy"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/koptylnya-mala",
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
              <li>Виготовлена з якісної нержавіючої сталі</li>
              <li>Компактний розмір, зручний для дому та відпочинку на природі</li>
              <li>Гідрозатвор усуває запах диму в приміщенні</li>
              <li>Кришка-будиночок запобігає потраплянню конденсату на продукти</li>
              <li>Легко миється та довго служить</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>

            <p className="mb-3">Коптильня Мала з нержавіючої сталі — це надійний та зручний пристрій для приготування ароматних копченостей у домашніх умовах чи на природі. Вона дозволяє швидко та якісно закоптити м’ясо, рибу або овочі, зберігаючи їхній натуральний смак і користь.</p>

            <p className="mb-3">Модель оснащена гідрозатвором, який запобігає виходу диму назовні, завдяки чому коптильню можна використовувати навіть у приміщенні без неприємного запаху. Кришка-будиночок завтовшки 1,5 мм має спеціальну форму, що не допускає потрапляння конденсату на продукти, зберігаючи їх апетитний вигляд та соковитість.</p>

            <p className="mb-3">Корпус виготовлений з якісної нержавіючої сталі, що гарантує довговічність, рівномірне прогрівання та простоту у догляді. Всі елементи легко миються, а сама коптильня не піддається корозії та служить довгі роки.</p>

            <p className="mb-6">Компактний розмір робить коптильню зручною для зберігання та транспортування. Це чудовий вибір для тих, хто цінує натуральні домашні продукти, приготовані власноруч.</p>

            <h2 className="text-2xl font-bold mb-6">Технічні характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Міскість 4кг</li>
              <li>Габаритні розміри 450х250х300мм</li>
              <li>Товщина металу 1,5мм</li>
              <li>Вага 7,5кг</li>
              <li>Марка сталі AISI</li>
            </ul>

            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p className="mb-3">Щоб замовити Коптильню, заповніть форму нижче:</p>
            <OrderForm productName={ProductName} productPrice={ProductPrice} />
          </div>
        </div>
      </div>
    </main>
  );
}
