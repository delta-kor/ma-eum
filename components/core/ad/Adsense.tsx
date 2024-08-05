export default function Adsense() {
  return (
    <ins
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-format="auto"
      data-ad-slot="8382146491"
      data-full-width-responsive="true"
      style={{ display: 'block', overflow: 'hidden' }}
      className="adsbygoogle"
    />
  );
}
