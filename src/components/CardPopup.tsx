import { ICard } from "../types";
import Card from "./Card";

interface ICardPopup {
  card: ICard;
}

const CardPopup: React.FC<ICardPopup> = ({ card }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-lvh bg-[rgba(0,0,0,0.5)] flex items-center justify-center ">
      <Card
        click={handleClick}
        card={card}
        customStyle="bg-white mx-2 p-2 md:p-4 xl:p-6 rounded-lg xl:basis-2/5"
      />
    </div>
  );
};
export default CardPopup;
