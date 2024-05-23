import { useEffect, useState } from "react";
import { ICard } from "../types";
import CardPopup from "./CardPopup";

interface ICardProps {
  card: ICard;
  click?: (e: React.MouseEvent) => void;
  customStyle?: string;
  isMenuOpen?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
}

const Card: React.FC<ICardProps> = ({
  card,
  click,
  customStyle,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isMenuOpen && setIsMenuOpen && setIsMenuOpen(false);
    !isMenuOpen && setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClose = (e: KeyboardEvent | MouseEvent) => {
      if (e.type === "keydown" && (e as KeyboardEvent).key === "Escape") {
        setIsOpen(false);
      } else if (e.type === "click") {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClose);
    window.addEventListener("keydown", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("keydown", handleClose);
    };
  }, []);

  return (
    <div
      className={`flex flex-col sm:basis-[500px] md:basis-[calc(50%-12px)] xl:basis-[calc(33.333333%-26.7px)] gap-4 ${customStyle}`}
      onClick={click ? click : handleClick}
    >
      <img
        className="object-cover w-full"
        srcSet={`${card.img} 1x, ${card.img_2x} 2x`}
        src={card.img}
        alt="card"
      />
      <span className="text-[#EB0028] roboto-bold text-[0.8125rem] leading-none">
        {card.tags}
      </span>
      <h2 className="text-2xl leading-[125%] roboto-bold">{card.title}</h2>
      <div className="flex text-xs leading-none gap-[0.625rem]">
        <span className="roboto-medium">{card.autor}</span>
        <span className="text-[#9B9B9B] circle-before relative">
          {card.date}
        </span>
        <span className="text-[#9B9B9B] circle-before relative">
          {card.views}
        </span>
      </div>
      <p className="text-[#929292] text-[0.875rem] leading-[143%]">
        {card.text}
      </p>
      {isOpen && <CardPopup card={card} />}
    </div>
  );
};
export default Card;
