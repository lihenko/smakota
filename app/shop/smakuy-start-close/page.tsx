import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/ApparatsOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const InStock = true;
  const ProductName = 'Самогонний апарат "Старт" на закритому кубі';
  const ProductPrice = [5990,6490,7290,7900];
  const ProductVolume = [15,23,37,60];
  const ShortDescription = 'Самогонний апарат «Старт» на закритому кубі — це компактний та надійний дистилятор, ідеальний для домашнього використання. Виготовлений з харчової нержавіючої сталі, він забезпечує високу якість перегонки та простоту в експлуатації. Підходить для використання на газових, електричних та індукційних плитах.';
  const Description = '<p>Самогонний апарат «Старт» на закритому кубі — це ідеальний вибір для тих, хто хоче зайнятися самогоноварінням вдома. Виготовлений з харчової нержавіючої сталі, цей апарат забезпечує високу якість перегонки та довговічність.</p><h4>Особливості:<h4><ul><li><strong>Матеріал:</strong> харчова нержавіюча сталь, стійка до корозії та легко очищується.</li><li><strong>Підключення:</strong> підходить для використання на газових, електричних та індукційних плитах.</li><li><strong>Комплектація:</strong> повний сантехнічний комплект з силіконовими прокладками, ущільнювачами, баранчиками для фіксування складових пристрою, насадками Панченкова для очищення спиртових парів, шлангами та краном для зливу.</li><li><strong>Безпека:</strong> оснащений термометром для контролю температури та аварійним клапаном для запобігання перегріву.</li></ul><p>Цей апарат дозволяє отримати чистий та міцний самогон, зберігаючи всі корисні властивості сировини. Завдяки своїй компактності, він ідеально підходить для використання на домашній кухні.</p>';
  const Gallery = ['start-15-l-zakrytyj-kub-700x700.jpg','dsc_3193-web-700x700.jpg', 'emkost-15-700x700.jpg', 'start-700x700.jpg', '6a-700x700.jpg','dsc_3134-web-700x700.jpg']

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "START-CLOSED", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Smakuy"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/smakuy-start-close",
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
