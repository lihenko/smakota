import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/MangalOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Мангал Гектор на 9 шампурів';
  const ProductPrice = [1896,2349,2697];
  const ProductVolume = [2,3,4];
  const ShortDescription = 'Мангал зі знімними ніжками для 9 шампурів — це надійний та зручний вибір для приготування смачних страв на природі чи вдома. Виготовлений із сертифікованої сталі товщиною 2, 3 або 4 мм, він має жарівню, вкриту термостійкою емаллю, що витримує до 800°C. Зварні підсилення забезпечують міцність, а знімні ніжки з порошковим покриттям роблять мангал практичним у транспортуванні та зберіганні.';
  const Description = '<p>Мангал зі знімними ніжками для 9 шампурів — це практичне та надійне рішення для приготування шашлику та інших страв на відкритому вогні. Завдяки міцній сталі та продуманій конструкції він стане незамінним помічником під час відпочинку на природі, у дворі чи на терасі.</p><h4>Особливості:</h4><ul><li><strong>Матеріал:</strong> сертифікована сталь товщиною 2, 3 або 4 мм, що забезпечує довговічність та стійкість до деформацій.</li><li><strong>Жаростійкість:</strong> покриття термостійкою емаллю чорного кольору витримує температуру до 800°C.</li><li><strong>Міцність:</strong> зварні підсилення по периметру (труба 15х15 мм) підвищують жорсткість конструкції та стійкість до нагрівання.</li><li><strong>Зручність:</strong> знімні ніжки з порошковим покриттям легко монтуються та забезпечують компактність при зберіганні.</li><li><strong>Практичність:</strong> розрахований на 9 шампурів, що дозволяє одночасно готувати велику кількість порцій.</li></ul><p>Такий мангал поєднує надійність, мобільність і зручність у використанні, що робить його чудовим вибором як для пікніків на природі, так і для щоденного застосування вдома.</p>';
  const Gallery = ['mangal-gektor-9-1.webp','mangal-gektor-9-2.webp', 'mangal-gektor-9-3.webp', 'mangal-gektor-9-4.webp', 'mangal-gektor-9-5.webp','mangal-gektor-9-6.webp'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://www.smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "GEKTOR-9", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "BBQ Masters"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.smakota.club/shop/mangal-gektor-9",
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
