import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Мультипекар 5в1, 600Вт, Sokany SK-08105";
  const ShortDescription = "Мультипекар Sokany SK-08105 — це практичний кухонний помічник 5в1, який дозволяє легко готувати вафлі, пончики, горішки, коржі та печиво. Потужність 600 Вт забезпечує швидкий нагрів, а антипригарні панелі гарантують просте очищення після кожного використання.";
  const ProductPrice = 1400;
  const ProductImage = 'https://www.smakota.club/shop/6559397016_multipekar-5v1-600vt.jpg';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "SOKANY-SK-08105", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Sokany"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/multibaker-sokany-sk-08105",
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
              <li>П&apos;ять змінних панелей для приготування різноманітної випічки;</li>
              <li>Антипригарне покриття — легке очищення без зусиль;</li>
              <li>Компактний корпус зручний для зберігання навіть у невеликій кухні;</li>
              <li>Швидкий нагрів і рівномірне пропікання завдяки потужності 600 Вт;</li>
              <li>Автоматичне регулювання температури запобігає перегріву;</li>
              <li>Світлові індикатори спрощують контроль готовності;</li>
              <li>Міцний корпус із термостійкого пластику та металу — довговічність і безпека;</li>
              <li>Проста зміна панелей — готування стає приємним і зручним процесом.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p>
              <strong>Мультипекар Sokany SK-08105</strong> — універсальний пристрій 5в1, який замінює одразу кілька кухонних гаджетів. 
              Завдяки п&apos;яти змінним панелям він дозволяє готувати різноманітні десерти та закуски: 
              від бельгійських вафель до хрустких горішків і ароматних пончиків.
            </p>

            <p>
              Потужність <strong>600 Вт</strong> забезпечує швидкий нагрів і рівномірне пропікання тіста. 
              Вбудоване автоматичне регулювання температури запобігає підгорянню, 
              а антипригарне покриття гарантує легке очищення після використання.
            </p>

            <p className="mb-6">
              Завдяки компактним розмірам і продуманому дизайну <strong>Sokany SK-08105</strong> ідеально підходить для домашнього використання. 
              Світлові індикатори підкажуть, коли пристрій готовий до роботи, а міцний корпус із металу та термостійкого пластику забезпечує довговічність.
            </p>

            <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Тип: мультипекар / вафельниця;</li>
              <li>Живлення: від мережі 220 В;</li>
              <li>Потужність: 600 Вт;</li>
              <li>Кількість змінних панелей: 5;</li>
              <li>Типи панелей: для бельгійських вафель, вафельних коржів, пончиків, горішків, фігурного печива;</li>
              <li>Покриття панелей: антипригарне;</li>
              <li>Індикатори: живлення та готовності до роботи;</li>
              <li>Матеріал корпусу: термостійкий пластик і метал;</li>
              <li>Колір: чорний із металевими вставками;</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Мультипекар Sokany SK-08105;</li>
              <li>5 змінних панелей:</li>
              <ul className="list-disc pl-6">
                <li>Для бельгійських вафель;</li>
                <li>Для вафельних коржів;</li>
                <li>Для пончиків;</li>
                <li>Для горішків (тістечок);</li>
                <li>Для фігурного печива;</li>
              </ul>
              <li>Інструкція з експлуатації;</li>
              <li>Упаковка.</li>
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
