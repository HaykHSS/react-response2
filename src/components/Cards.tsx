import { ICard } from "../types";
import Card from "./Card";

interface ICards {
  cards: ICard[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void
}

const Cards: React.FC<ICards> = ({ cards, isMenuOpen,setIsMenuOpen }) => {
  if (!cards.length) {
    return <h2 className="text-center text-4xl roboto-bold text-[#929292]">No Items Found</h2>;
  }
  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-6 xl:gap-10">
      {cards.map((card) => (
        <Card setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} key={card.title} card={card} />
      ))}
    </div>
  );
};
export default Cards;
