import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/SkovorodaOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Сковорода з диска борони';
  const ProductPrice = [1850,1950,2020];
  const ProductVolume = [40,50,55];
  const ShortDescription = 'Сковорода з диска борони — універсальний набір для приготування страв на відкритому вогні. У комплект входить кришка, підставка, розпал та збірні ніжки, що забезпечують зручність у використанні та мобільність. Ідеально підходить для пікніків, відпочинку на природі та приготування смачних страв для великої компанії.';
  const Description = '<p>Сковорода з диска борони — це надійний посуд для приготування страв на відкритому вогні. Завдяки міцній сталі та зручній конструкції вона ідеально підходить для пікніків, відпочинку на природі чи використання у дворі.</p><h4>Особливості:</h4><ul><li><strong>Матеріал:</strong> товстостінна сталь, що рівномірно прогрівається та зберігає тепло.</li><li><strong>Розміри:</strong> доступна у варіантах 40, 50 та 55 см, що дозволяє обрати оптимальний діаметр залежно від кількості страв і компанії.</li><li><strong>Комплектація:</strong> кришка, підставка під сковороду, розпал та збірні ніжки для зручного встановлення.</li><li><strong>Універсальність:</strong> підходить для смаження м’яса, овочів, риби, приготування плову чи юшки.</li><li><strong>Мобільність:</strong> завдяки збірним ніжкам та компактності набір зручно транспортувати.</li></ul><p>Ця сковорода з диска борони поєднує простоту, довговічність та функціональність, дозволяючи готувати різноманітні страви на відкритому вогні з максимальною зручністю.</p>';
  const Gallery = ['SkovorodazBorony-700x700.jpg','SkovorodazBorony1-700x700.jpg', 'SkovorodazBorony2-700x700.jpg', 'SkovorodazBorony3-700x700.jpg', 'SkovorodazBorony4-700x700.jpg','SkovorodazBorony5-700x700.jpg'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "SKOVORODA-Z-BORONY-BBQ", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "BBQ Masters"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/skovoroda-z-borony",
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
