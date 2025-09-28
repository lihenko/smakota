interface HtmlContentProps {
  html: string;
}

export default function HtmlContent({ html }: HtmlContentProps) {
  return (
    <div
      className="text-lg mb-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}