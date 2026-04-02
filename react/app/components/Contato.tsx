interface ContatoProps {
  text: string;
  onClick?: () => void;
}

export default function Contato({ text, onClick }: ContatoProps) {
  return (
    <button
      onClick={onClick}
      className=""
    >
      {text}
    </button>
  );
}