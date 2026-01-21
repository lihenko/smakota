import Script from "next/script";

export default function AdsBlock() {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6450905320202041"
        data-ad-slot="9575674821"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <Script id="ads-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}
