import  { metadata } from "./metadata";
import ProductOptions from "@/app/components/ApparatsOptions";
import { use } from "react";

export { metadata };



export default function ShopPage() {
  const ProductName = 'Самогонний апарат "Профі" на відкритому кубі';
  const ProductPrice = [10496,10935,11457,14756,16300];
  const ProductVolume = [15,23,37,60,100];
  const ShortDescription = 'Самогонний апарат «Профі» — надійне обладнання для домашнього виробництва якісного алкоголю. Завдяки розбірній колоні на фланцевому з’єднанні, силіконовим ущільнювачам та універсальній конструкції, апарат працює в різних режимах: від класичної дистиляції до отримання ароматних дистилятів із джин-кошиком. Відкрита конструкція куба з фальшдном дозволяє переганяти густі фруктові або зернові браги. Доступний у варіантах 15 л, 23 л, 37 л, 60 л та 100 л — для будь-яких обсягів виробництва.Профі — це стабільна якість, проста експлуатація та перевірена надійність від українського виробника «Смакуй».';
  const Description = '<p>Самогонний апарат «Профі» від ТМ «Смакуй» — універсальне рішення для тих, хто прагне отримувати якісний алкоголь у домашніх умовах. Завдяки продуманій конструкції, апарат поєднує можливості класичної дистиляції та роботи з ректифікаційною колоною, забезпечуючи чистий і міцний дистилят без зайвих домішок.</p><h4>Особливості:</h4><ul><li><strong>Конструкція колони:</strong> розбірна колона на фланцевому з’єднанні забезпечує зручний догляд і можливість роботи в різних режимах дистиляції.</li><li><strong>Герметичність:</strong> силіконові ущільнювачі запобігають витоку пари та запахів, гарантуючи стабільну роботу апарата.</li><li><strong>Матеріал виготовлення:</strong> харчова нержавіюча сталь, що не взаємодіє з продуктом і зберігає його смакові властивості.</li><li><strong>Режими роботи:</strong> класична кубова дистиляція, дистиляція зі зміцненням, а також отримання ароматизованих дистилятів із можливістю підключення джин-кошика.</li><li><strong>Зручність експлуатації:</strong> відкрита конструкція куба з фальшдном дозволяє переганяти густі фруктові та зернові браги, а кришка з виходом під термометр дає змогу точно контролювати процес перегонки.</li><li><strong>Сумісність:</strong> апарат можна використовувати на газових, електричних та індукційних плитах.</li></ul><p>Самогонний апарат «Профі» представлений у варіантах 15, 23, 37, 60 та 100 літрів — ви можете обрати оптимальний обсяг під свої потреби. Це перевірене часом обладнання, яке поєднує простоту використання, ефективність і надійність. Ідеальний вибір як для початківців, так і для досвідчених винокурів.</p>';
  const Gallery = ['profi15l2-700x700.jpg','10a-700x700.jpg', 'profi-po-paru-700x700.jpg', 'obves-otbor-po-paru-web-700x700.jpg', '5a-700x700.jpg','3a-700x700.jpg', 'emkost-15-700x700 (1).jpg','novoe-falsh-dno-700x700.png'];
  const InStock = true;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ProductName,
    "image": Gallery.map(img => `https://smakota.club/shop/${img}`),
    "description": ShortDescription,
    "sku": "SMAKUY-PROFI-OPEN", // унікальний артикул, придумай свій
    "brand": {
      "@type": "Brand",
      "name": "Smakuy"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smakota.club/shop/smakuy-profi-open",
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
