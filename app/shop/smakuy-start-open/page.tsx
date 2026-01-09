import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/ApparatsOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Самогонний апарат "Старт" на відкритому кубі';
  const ProductPrice = [7615,8054,8576,11875];
  const ProductVolume = [15,23,37,60];
  const ShortDescription = 'Самогонний апарат «Старт» з відкритим кубом — ідеальний вибір для тих, хто цінує простоту та зручність у процесі перегонки. Завдяки відкритій конструкції куба ви зможете легко контролювати процес, швидко заливати брагу та очищати ємність після використання. Апарат виготовлений із високоякісної харчової нержавіючої сталі, що гарантує довговічність та безпечність у приготуванні напоїв. «Старт» підходить для всіх типів плит — газових, електричних та індукційних, роблячи процес винокуріння доступним і комфортним у будь-яких умовах.';
  const Description = '<p>Самогонний апарат «Старт» з відкритим кубом — чудове рішення для тих, хто цінує зручність і простоту у процесі домашнього самогоноваріння. Завдяки відкритій конструкції куба апарат легко наповнювати та очищати, що робить його особливо практичним у використанні. Виготовлений із харчової нержавіючої сталі, він забезпечує надійність та довговічність.</p><h4>Особливості:</h4><ul><li><strong>Матеріал:</strong> харчова нержавіюча сталь, стійка до корозії, зберігає смак та якість напою.</li><li><strong>Підключення:</strong> сумісний з газовими, електричними та індукційними плитами.</li><li><strong>Комплектація:</strong> повний сантехнічний набір з силіконовими прокладками, ущільнювачами, баранчиками для фіксації елементів, насадками Панченкова для додаткового очищення парів, шлангами та краном для зливу.</li> <li><strong>Зручність:</strong> відкритий куб спрощує заливання браги та миття після перегонки.</li></ul><p>Апарат дозволяє отримати якісний та чистий дистилят, зберігаючи ароматичні властивості сировини. Компактний розмір робить його ідеальним для використання в умовах домашньої кухні.</p>';
  const Gallery = ['start-15-l-700x700.jpg','12a-700x700.jpg', '3a-700x700.jpg', 'emkost-15-700x700 (1).jpg', '6a-700x700 (1).jpg','start-700x700.png', '12a-700x700.jpg'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "SMAKUY-START-OPEN", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Smakuy"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/smakuy-start-open",
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
