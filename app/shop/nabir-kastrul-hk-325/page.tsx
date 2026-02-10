import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Набір каструль HK-325 Червоний Higher Kitchen з антипригарним покриттям";
  const ShortDescription = "Набір гранітного посуду Higher Kitchen — це практичний комплект із трьох каструль з антипригарним покриттям та індукційним дном TURBO INDUCTION, що забезпечує швидке й рівномірне нагрівання. Посуд підходить для всіх типів плит, дозволяє готувати з мінімальною кількістю олії, легко очищується та комплектується жаростійкими скляними кришками і силіконовими прихватками.";
  const ProductPrice = 2017;
  const ProductImage = 'https://smakota.club/shop/5084705179_nabor-kotlov-higher.jpg';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "KASTRULIHK325", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Higher Kitchen"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/nabir-kastrul-hk-325",
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
    <li>Міцне гранітне антипригарне покриття запобігає пригоранню та не впливає на смак їжі;</li>
    <li>Індукційне дно TURBO INDUCTION забезпечує швидке та рівномірне нагрівання;</li>
    <li>Економія до 35% енергії під час приготування страв;</li>
    <li>Підходить для всіх типів плит: газових, електричних, індукційних, галогенних та склокерамічних;</li>
    <li>Безпечні матеріали без шкідливих речовин дозволяють готувати з мінімальною кількістю олії;</li>
    <li>Можна мити в посудомийній машині та використовувати в духовці;</li>
    <li>У комплекті силіконові накладки для безпечного користування гарячим посудом.</li>
  </ul>

  <h2 className="text-2xl font-bold mb-6">Опис:</h2>
  <p>
    <strong>Набір гранітного посуду Higher Kitchen</strong> — це сучасний кухонний комплект,
    який поєднує стильний дизайн, високу міцність і максимальну зручність у щоденному
    використанні. Завдяки багатошаровому індукційному дну посуд швидко нагрівається та
    рівномірно розподіляє тепло, що забезпечує ідеальне приготування страв.
  </p>

  <p>
    Внутрішнє <strong>3-шарове антипригарне гранітне покриття</strong> дозволяє готувати
    з мінімальною кількістю олії, зберігаючи натуральний смак продуктів і спрощуючи
    очищення після використання. Кришки з жаростійкого скла дають змогу контролювати
    процес приготування без втрати тепла.
  </p>

  <p className="mb-6">
    Набір ідеально підходить для приготування дієтичних, домашніх та святкових страв,
    а стильний червоний колір гармонійно доповнить інтер&#39;єр сучасної кухні. Завдяки
    універсальності використання комплект стане чудовим вибором як для дому, так і
    для подарунка.
  </p>

  <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
  <ul className="list-disc pl-6 mb-6">
    <li>Тип: набір каструль;</li>
    <li>Кількість предметів: 8 шт;</li>
    <li>Матеріал каструль: алюміній;</li>
    <li>Покриття: гранітне антипригарне;</li>
    <li>Тип дна: багатошаровий індукційний;</li>
    <li>Кришки: жаростійке скло;</li>
    <li>Колір: червоний;</li>
    <li>Сумісність: всі види плит;</li>
    <li>Можна мити в посудомийній машині: так;</li>
    <li>Використання в духовці: так.</li>
  </ul>

  <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
  <ul className="list-disc pl-6 mb-6">
    <li>Каструля з кришкою 3 л (діаметр 20 см);</li>
    <li>Каструля з кришкою 5 л (діаметр 24 см);</li>
    <li>Каструля з кришкою 7 л (діаметр 28 см);</li>
    <li>Силіконові прихватки — 2 шт;</li>
    <li>Фірмова упаковка.</li>
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
