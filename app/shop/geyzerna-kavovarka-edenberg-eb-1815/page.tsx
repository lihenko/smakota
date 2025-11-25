import { metadata } from "./metadata";
import ProductSlider from "./ProductSlider";
import OrderForm from "@/app/components/OrderForm";

export { metadata };

export default function ShopPage() {
  const ProductName = "Гейзерна кавоварка Edenberg EB-1815";
  const ShortDescription = "Кавоварка з міцним металевим корпусом забезпечує рівномірний прогрів і насичений смак напою. Завдяки термостійкій ручці, надійному клапану для випуску пари та фіксованій кришці вона безпечна й зручна у використанні. Продумана форма запобігає бризкам, а універсальне дно підходить для всіх типів плит. Об’єм 150 мл робить її ідеальним варіантом для приготування до трьох чашок ароматної кави.";
  const ProductPrice = 429;
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
      "url": "https://www.smakota.club/shop/geyzerna-kavovarka-edenberg-eb-1815",
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
              <li>Міцний металевий корпус з елегантним матовим або глянсовим покриттям</li>
              <li>Рівномірний розподіл тепла для насиченого та стабільного смаку напою</li>
              <li>Ергономічна ручка з термостійкого матеріалу, що не нагрівається під час приготування</li>
              <li>Продумана форма без зайвих бризок та зручний наливний носик</li>
              <li>Надійний клапан для випуску пари та фіксована кришка, які підвищують безпеку</li>
              <li>Універсальна основа сумісна з різними типами плит та варильних поверхонь</li>
              <li>Легко очищається та служить довго завдяки посиленому дну</li>
            </ul>
            <h2 className="text-2xl font-bold mb-6">Опис:</h2>
            <p className="mb-3"> Ця кавоварка поєднує в собі стійкість конструкції та лаконічний дизайн. Корпус виготовлений з металу з якісним термостійким покриттям, що забезпечує тривалий строк експлуатації та приємний вигляд. Продумана геометрія приладу гарантує відсутність бризок при наливанні й стабільну роботу під час приготування. </p>
            <p className="mb-3"> Тепло розподіляється рівномірно по поверхні, завдяки чому кава або інший напій набуває насиченого аромату та смаку. Ручка з ергономічним профілем надійно лягає в руку і мінімізує ризик ковзання навіть за вологих долонь. Вбудований клапан регулює тиск усередині, а внутрішнє сито з оптимально підібраними отворами забезпечує рівномірний потік води через мелену каву. </p>
            <p className="mb-6"> Кришка оснащена надійним фіксатором, що запобігає мимовільному відкриттю під час роботи. Завдяки посиленому дну прилад стійкий до механічних впливів і пришвидшеного зносу. Модель підходить для щоденного використання в домашніх умовах і легко комбінується з інтерʼєром завдяки лаконічній зовнішності. </p> <h2 className="text-2xl font-bold mb-6">Технічні характеристики:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Сумісність із джерелами тепла: Підходить для всіх джерел тепла</li>
              <li>Матеріал корпусу: Алюміній з термостійким покриттям</li>
              <li>Матеріал ручки: Пластик (термостійкий)</li>
              <li>Об&#8217;єм: 150 мл</li>
              <li>Колір: чорний</li>
              <li>Особливості: на 3 чашки</li>
              <li>Фіксована кришка та клапан для випуску пари</li>
              <li>Посилене дно для підвищеної стійкості</li>
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
