import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/ApparatsOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Самогонний апарат Бейбі Бум';
  const ProductPrice = [4993,5543,6069];
  const ProductVolume = [12,21,32];
  const ShortDescription = 'Самогонний апарат «Бебі Бум» із трьома сухопарниками — це компактне, зручне та ефективне обладнання для домашнього виготовлення чистих дистильованих напоїв. Завдяки послідовному очищенню парів у сухопарниках апарат забезпечує високу якість і прозорість самогону, а додавання ароматних добавок дозволяє створювати унікальні смаки джинів, бренді чи кальвадосу. Герметичний куб із нержавіючої сталі, універсальне феромагнітне дно та повна комплектація роблять «Бебі Бум» ідеальним вибором для домашнього винокуріння.';
  const Description = '<p>Самогонний апарат <strong>«Бебі Бум»</strong> із сухопарниками — це сучасне та компактне обладнання для домашнього виробництва високоякісних дистильованих напоїв. Завдяки продуманій конструкції з трьома сухопарниками апарат забезпечує ефективне очищення спиртових парів і дозволяє отримати чистий, прозорий та ароматний самогон без домішок.</p><h4>Особливості:</h4><ul><li><strong>Принцип роботи:</strong> спиртова пара з браги проходить через три послідовно з’єднані сухопарники, де очищається від сивушних масел і домішок, після чого конденсується у холодильнику, утворюючи кінцевий продукт — самогон високої якості.</li><li><strong>Матеріал:</strong> куб виготовлений з харчової нержавіючої сталі марки AISI 430, яка не окислюється, не впливає на смак напою та легко очищується після використання.</li><li><strong>Конструкція куба:</strong> закритий герметичний куб об’ємом 12, 21 або 32 літри з феромагнітним дном, що дозволяє використовувати апарат на будь-якому типі плити — газовій, електричній чи індукційній. Для зручності обслуговування у центрі кришки розташований отвір діаметром 160 мм.</li><li><strong>Колона з трьома сухопарниками:</strong> висота колони становить лише 54 см, тому апарат зручно розміщується навіть на маленькій кухні. Сухопарники ефективно очищують пари, а також можуть використовуватися як джин-кошики для ароматизації напою травами, спеціями чи сухофруктами.</li><li><strong>Комплектація:</strong> повний набір для роботи — від детальної інструкції до сантехнічного комплекту для підключення охолодження. Усе необхідне вже входить у комплект, тому можна відразу розпочати перегонку.</li><li><strong>Безпека та якість:</strong> конструкція відповідає стандартам безпеки та гарантує надійну герметизацію, стабільну роботу й тривалий термін служби.</li></ul><h4>Переваги:</h4><ul><li><strong>Якісне очищення:</strong> три послідовні сухопарники забезпечують глибоке очищення парів та покращену якість напою.</li><li><strong>Ароматизація:</strong> можливість створювати ароматні джини, кальвадоси та настоянки просто під час другої перегонки.</li><li><strong>Компактність:</strong> невелика висота колони дозволяє використовувати апарат у звичайних кухонних умовах без додаткових пристосувань.</li><li><strong>Простота експлуатації:</strong> легке збирання, розбирання та очищення усіх елементів конструкції.</li><li><strong>Доступна ціна:</strong> оптимальне співвідношення вартості, якості та функціональності робить «Бебі Бум» чудовим вибором для домашніх винокурів.</li></ul><p>Самогонний апарат <strong>«Бебі Бум»</strong> відкриває широкі можливості для експериментів і дозволяє створювати унікальні напої — від класичного самогону до ароматних настоянок за власними рецептами.</p>';
  const Gallery = ['02405-700x700.jpg','02404-700x700.jpg', '02407-700x700.jpg', 'baby-bum-700x700.jpg'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://www.smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "SMAKUY-BABY-BUM", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Smakuy"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/smakuy-baby-bum",
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
