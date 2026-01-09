import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/AutoclavOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Автоклав "ЧЕ" - Газовий';
  const ProductPrice = [3000,3300,3600,3900,4200];
  const ProductVolume = [8,16,24,32,40];
  const ShortDescription = '<strong>Автоклав &#39;ЧЕ&#39; газовий</strong> &mdash; надійний апарат для домашньої консервації. Працює від відкритого полум&#39;я, дозволяє стерилізувати м&#39;ясні, рибні, овочеві та фруктові заготовки у скляних банках. Корпус із міцної сталі, зручна кришка з фіксатором та манометром гарантують безпечне використання. Доступні моделі на <strong>8, 16, 24, 32 та 40 банок</strong>.';
  const Description = '<p>Автоклав &#39;ЧЕ&#39; газовий — ідеальне рішення для домашньої консервації, яке забезпечує швидку та безпечну стерилізацію м&#39;ясних, рибних, овочевих та фруктових заготовок. Надійний сталевий корпус, зручна кришка з фіксатором і манометром гарантують контроль процесу та безпеку, а ваші продукти зберігають свій смак і корисні властивості.</p><h4>Переваги:</h4><ul><li><strong>Різні варіанти завантаження:</strong> 8, 16, 24, 32 та 40 банок — оберіть оптимальний обсяг для своєї сім&#39;ї.</li><li><strong>Газове нагрівання:</strong> швидке та рівномірне прогрівання без складної електроніки.</li><li><strong>Міцний корпус:</strong> сталь із порошковим фарбуванням забезпечує довговічність та стійкість до корозії.</li><li><strong>Контроль тиску та температури:</strong> робочий тиск ~3,5 атм (макс. 6 атм) та температура 110-120&deg;C (макс. 125&deg;C) для надійної стерилізації.</li><li><strong>Проста експлуатація:</strong> легко очищається, зручний для регулярного використання.</li><li><strong>Безпека:</strong> кришка з манометром та надійним фіксатором запобігає випадковому відкриттю.</li></ul><p>Автоклав &#39;ЧЕ&#39; газовий — ваш помічник у домашній кухні: швидко, безпечно і надійно зберігає смачні та корисні продукти. Ідеально підходить для сімейних господарств і любителів домашніх заготовок.</p>';
  const Gallery = ['che8gazikonka-1400x1400.webp','sab04442-min-1400x1400.webp', 'sab04462-min-1400x1400.webp', 'sab04436-min-1400x1400.webp', 'sab04430-min-1400x1400.webp','sab04437-min-1400x1400.webp', 'sab05012-min-1400x1400.webp','che8-3-min-1400x1400.webp'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "AUTOCLAV-CHE-GAS", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "UTEHO"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/autoclav-che-gas",
      "priceCurrency": "UAH",
      "price": ProductPrice[0], // можна брати мінімальну або середню ціну
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
    <>
      <ProductOptions
        product_name={ProductName}
        volumes={ProductVolume}
        prices={ProductPrice}
        short_description={ShortDescription}
        descriptions={Description}
        gallery={Gallery}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
