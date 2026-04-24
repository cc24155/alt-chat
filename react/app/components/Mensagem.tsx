"use client";

import Button from "./Button";

interface MensagemProps {
  title: string;
  text: string;
  showInput?: boolean;
  inputType?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  textButton: string;
  onClick?: () => void;
  onClose: () => void;
}

export default function Mensagem({ title, text, showInput, inputType, inputPlaceholder, inputValue, onInputChange, textButton, onClick, onClose }: MensagemProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-background border border-foreground/20 p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6">
        <div className="text-center">
          <h2 className="font-title text-2xl text-foreground">{title}</h2>
          <p className="text-neutral font-body mt-2">{text}</p>
        </div>

        {showInput && (
          <input
            type={inputType}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none font-body text-foreground"
          />
        )}

        <div className="flex flex-col gap-3">
          <Button
            text={textButton}
            className="w-full py-4 !rounded-full font-bold bg-primary"
            onClick={onClick}
          />

          <Button
            text="CANCELAR"
            onClick={onClose}
            className="text-neutral hover:text-foreground cursor-pointer font-bold transition-all"
          >
          </Button>
        </div>
      </div>
    </div>
  );
}
