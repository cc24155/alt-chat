interface NavigationProps {
  text: string;
  onClick?: () => void;
}

export default function Navigation({ text, onClick }: NavigationProps) {
  return (
    <button
      onClick={onClick}
      className=""
    >
      {text}
    </button>
  );
}