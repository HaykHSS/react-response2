import { ICard } from "../types";
import Searchbar from "./Searchbar";

interface IHeader {
  setCards: (cards: ICard[]) => void;
  cards: ICard[];
  toggleMenu: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isDesktop: boolean;
}

const Header: React.FC<IHeader> = ({ setCards, cards, toggleMenu, isDesktop }) => {
  return (
    <header className="flex items-center justify-center p-4 relative">
      {!isDesktop && (
        <button
          className="absolute left-0 md:left-4 top-[50%] translate-y-[-50%]"
          onClick={(e) => toggleMenu(e)}
        >
          <svg
            width="27"
            height="19"
            viewBox="0 0 27 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 0C0.89543 0 0 0.895431 0 2H2V0ZM25 0H2V2H25V0ZM27 2C27 0.89543 26.1046 0 25 0V2H27ZM25 4C26.1046 4 27 3.10457 27 2H25V2V4ZM2 4H25V2H2V4ZM0 2C0 3.10457 0.895431 4 2 4V2V2H0ZM2 7.38462C0.89543 7.38462 0 8.28005 0 9.38461H2V7.38462ZM25 7.38462H2V9.38461H25V7.38462ZM27 9.38461C27 8.28005 26.1046 7.38462 25 7.38462V9.38461H27ZM25 11.3846C26.1046 11.3846 27 10.4892 27 9.38461H25V11.3846ZM2 11.3846H25V9.38461H2V11.3846ZM0 9.38461C0 10.4892 0.895431 11.3846 2 11.3846V9.38461H0ZM2 16.7692V14.7692C0.895431 14.7692 0 15.6647 0 16.7692H2ZM2 16.7692V16.7692H0C0 17.8738 0.895431 18.7692 2 18.7692V16.7692ZM25 16.7692H2V18.7692H25V16.7692ZM25 16.7692V16.7692V18.7692C26.1046 18.7692 27 17.8738 27 16.7692H25ZM25 16.7692H27C27 15.6647 26.1046 14.7692 25 14.7692V16.7692ZM2 16.7692H25V14.7692H2V16.7692Z"
              fill="black"
            />
          </svg>
        </button>
      )}
      <img src="/Logo.svg" alt="logo" />
      <Searchbar cards={cards} setCards={setCards} />
    </header>
  );
};
export default Header;
