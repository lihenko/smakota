import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/AutoclavOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Автоклав "ЧЕ" - Electro';
  const ProductPrice = [4700,5000,5300,5600,5900];
  const ProductVolume = [8,16,24,32,40];
  const ShortDescription = '<p><strong>Автоклав &#39;ЧЕ&#39; електричний</strong> &mdash; зручний і безпечний пристрій для домашньої консервації без потреби у відкритому полум&#39;ї. Оснащений нагрівальними елементами, що забезпечують рівномірне прогрівання та автоматичне підтримання температури. Дозволяє стерилізувати м&#39;ясні, рибні, овочеві та фруктові заготовки у скляних банках. Міцний сталевий корпус, герметична кришка з фіксатором і манометром гарантують надійну роботу. Доступні моделі на <strong>8, 16, 24, 32 та 40 банок</strong>.</p>';
  const Description = '<p class="mb-6">Автоклав &#39;ЧЕ&#39; електричний &mdash; сучасний пристрій для домашньої консервації, який поєднує простоту використання, безпеку та ефективність. Завдяки вбудованим нагрівальним елементам, автоклав не потребує відкритого полум&#39;я, забезпечуючи рівномірне прогрівання та точний контроль температури під час стерилізації м&#39;ясних, рибних, овочевих і фруктових заготовок. Міцний сталевий корпус і продумана система фіксації гарантують довговічність і надійну роботу.</p><ul class="mb-6"><li class="mb-3"><strong>Моделі різної місткості:</strong> на 8, 16, 24, 32 та 40 банок &mdash; виберіть оптимальний варіант під свої потреби.</li><li class="mb-3"><strong>Електричний нагрів:</strong> не потребує газу, забезпечує автоматичне підтримання температури та економне споживання енергії.</li><li class="mb-3"><strong>Точний контроль параметрів:</strong> манометр і термометр дозволяють відстежувати процес стерилізації в режимі реального часу.</li><li><strong>Надійна конструкція:</strong> сталевий корпус із порошковим покриттям захищений від корозії та механічних пошкоджень.</li><li class="mb-3"><strong>Зручність у використанні:</strong> автоклав легко очищається, не потребує складного обслуговування та підходить для регулярного застосування.</li><li class="mb-3"><strong>Безпечна експлуатація:</strong> кришка з герметичним ущільненням, запобіжним клапаном і фіксатором унеможливлює випадкове відкриття під тиском.</li></ul><p>Автоклав &#39;ЧЕ&#39; електричний &mdash; це надійний помічник для тих, хто цінує домашні заготовки. Готуйте з комфортом і впевненістю, зберігаючи природний смак і користь ваших продуктів.</p>';
  const Gallery = ['che8el(ikonka)-1400x1400.webp','sab04471-min-1400x1400.webp','che1-1400x1400.webp','sab04442-min-1400x1400.webp', 'sab04462-min-1400x1400.webp', 'sab04436-min-1400x1400.webp', 'sab04430-min-1400x1400.webp','sab04437-min-1400x1400.webp', 'sab05009-min-1400x1400.webp','che8elektro-3-min-1400x1400.webp'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://www.smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "AUTOCLAV-CHE-ELECTRO", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "UTEHO"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/autoclav-che-electro",
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
