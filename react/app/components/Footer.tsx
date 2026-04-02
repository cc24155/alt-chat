interface FooterProps {
  text: string;
  onClick?: () => void;
}

export default function Footer({ text, onClick }: FooterProps) {
  return (
    <button
      onClick={onClick}
      className=""
    >
      {text}
    </button>
  );
}