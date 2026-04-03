"use client";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3 rounded-full
        bg-background
        text-preto font-medium

        shadow-[4px_4px_10px_rgba(0,0,0,0.15),-4px_-4px_10px_rgba(255,255,255,0.7)]
        transition-all duration-300

        hover:bg-neutral
        hover:text-white
        hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.25),inset_-4px_-4px_rgba(255,255,255,0.2)]
      "
    >
      {text}
    </button>
  );
}