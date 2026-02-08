import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set";
  const ShortDescription = "Це універсальний комплект для щоденного приготування страв, який поєднує стильний дизайн, міцні матеріали та максимальну функціональність. Термостійкі силіконові насадки безпечні для антипригарного посуду, а ергономічні ручки забезпечують зручність у використанні. У комплекті є всі необхідні інструменти, ножі, підставка та розробна дошка, що дозволяє підтримувати порядок на кухні та готувати швидко й комфортно.";
  const ProductPrice = 815;
  const ProductImage = 'https://smakota.club/shop/7018286797_nabor-silikonovyh-kuhonnyh.jpg';
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": ProductImage,
    "description": ShortDescription,
    "sku": "KITCHENSET19", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Kitchen Set"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/kitchen-set-19-violete",
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
      <li>Повний кухонний набір із 19 предметів для щоденного приготування страв;</li>
      <li>Термостійкий силікон не дряпає посуд та підходить для антипригарних покриттів;</li>
      <li>Міцні дерев&#39;яні ручки забезпечують комфортний хват і довговічність;</li>
      <li>Стильна підставка допомагає підтримувати порядок на кухні;</li>
      <li>У комплекті є ножі, кухонні аксесуари та розробна дошка;</li>
      <li>Сучасний фіолетовий дизайн гармонійно доповнить будь-який інтер&#39;єр кухні.</li>
    </ul>

    <h2 className="text-2xl font-bold mb-6">Опис:</h2>
    <p>
      <strong>Набір силіконових кухонних приладь Kitchen Set (19 предметів, фіолетовий)</strong> —
      це універсальний комплект інструментів, який забезпечить комфорт та зручність під час
      приготування будь-яких страв. У наборі зібрані всі необхідні кухонні аксесуари — від ножів
      і кухонних лопаток до половника, віничка та щипців для м&#39;яса.
    </p>

    <p>
      Робочі частини виготовлені з <strong>термостійкого силікону</strong>, що не пошкоджує
      антипригарне покриття посуду та витримує високі температури. Ергономічні ручки з дерева
      забезпечують зручність у використанні та надають приладам елегантного вигляду.
    </p>

    <p className="mb-6">
      У комплекті також передбачено <strong>зручну підставку та розробну дошку</strong>, які
      допомагають організувати кухонний простір і зберігати всі інструменти в одному місці.
      Набір стане чудовим вибором як для домашньої кухні, так і для подарунка.
    </p>

    <h2 className="text-2xl font-bold mb-6">Характеристики:</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>Тип: кухонний набір приладь;</li>
      <li>Кількість предметів: 19;</li>
      <li>Матеріал: дерево, пластик, термостійкий силікон;</li>
      <li>Колір: фіолетовий;</li>
      <li>Розмір підставки: 23,5 × 21 см;</li>
      <li>Розмір розробної дошки: 33 × 20 см;</li>
      <li>Призначення: приготування, змішування, смаження, сервірування.</li>
    </ul>

    <h2 className="text-2xl font-bold mb-6">Комплектація:</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>Підставка для приладь;</li>
      <li>Розробна дошка;</li>
      <li>Кухарський ніж 32 см;</li>
      <li>Універсальний ніж 32 см;</li>
      <li>Ніж для хліба 32 см;</li>
      <li>Універсальний ніж 23 см;</li>
      <li>Ніж для фруктів 19 см;</li>
      <li>Ножиці кухонні;</li>
      <li>Половник;</li>
      <li>Скребкова ложка;</li>
      <li>Скребкова лопатка;</li>
      <li>Віничок;</li>
      <li>Силіконовий пензлик;</li>
      <li>Ложка для спагеті;</li>
      <li>Супова ложка;</li>
      <li>Шумівка;</li>
      <li>Лопатка для смаження;</li>
      <li>Лопатка для холодних страв;</li>
      <li>Щипці для м&#39;яса.</li>
    </ul>

    <h2 className="text-2xl font-bold mb-6">Догляд та використання:</h2>
    <p className="mb-6">
      Перед першим використанням промийте прилади теплою водою з м&#39;яким миючим засобом.
      Після використання очищайте вручну або в посудомийній машині (за необхідності),
      уникаючи тривалого контакту дерев&#39;яних ручок з водою.
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
