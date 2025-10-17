import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Тостер Crownberg CB 1106";
  const ShortDescription = "Компактний тостер на 2 скибки з потужністю 750 Вт. Має 7 рівнів підсмажування, кнопку «СТОП», знімний піддон для крихт, автовимкнення та захист від перегрівання. Ідеальний для швидкого сніданку з ароматними хрусткими тостами.";
  const ProductPrice = 540;
  const ProductImage = 'https://www.smakota.club/shop/Copilot_20251017_085058.png';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "CROWNBERG-CB-1106", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "CROWNBERG"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/toster-crownberg-1106",
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
              <li>7 рівнів підсмажування дозволяють обрати ідеальний ступінь обсмаження для кожного смаку;</li>
              <li>Компактний дизайн займає мінімум місця на кухні;</li>
              <li>Знімний піддон для крихт забезпечує легке очищення;</li>
              <li>Автоматичне вимкнення після завершення приготування для безпечного використання;</li>
              <li>Кнопка «СТОП» дозволяє перервати обсмажування у будь-який момент;</li>
              <li>Захист від перегрівання гарантує довговічність і безпечну роботу приладу.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p>
              <strong>Тостер на 2 скибки</strong> — це надійний помічник для швидкого приготування ароматних і хрустких тостів. 
              Завдяки потужності <strong>750 Вт</strong> прилад швидко нагрівається та рівномірно підсмажує хліб з обох боків. 
              Просто вставте скибки хліба, оберіть бажаний рівень підсмажування (від 1 до 7) та опустіть важіль — все інше тостер зробить самостійно.
            </p>

            <p>
              Прилад обладнаний <strong>знімним піддоном для крихт</strong>, що спрощує догляд і підтримує чистоту. 
              Функція <strong>автовимкнення</strong> запобігає пригоранню хліба, а кнопка <strong>«СТОП»</strong> дозволяє припинити процес у будь-який момент. 
              Тостер виготовлений із міцних матеріалів і має систему <strong>захисту від перегрівання</strong>, що робить його безпечним у використанні.
            </p>

            <p className="mb-6">
              Ідеальний вибір для щоденного сніданку — насолоджуйтесь теплими, хрусткими тостами за лічені хвилини!
            </p>

            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Кількість скибок: 2;</li>
              <li>Кількість режимів підсмажування: 7;</li>
              <li>Потужність: 750 Вт;</li>
              <li>Особливості: знімний піддон для крихт, автовимкнення, кнопка «СТОП», захист від перегрівання;</li>
              <li>Максимальна товщина хліба: до 18 мм;</li>
              <li>Країна-виробник: Китай;</li>
              <li>Гарантія: 14 днів.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тостер;</li>
              <li>Піддон для крихт (знімний);</li>
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
