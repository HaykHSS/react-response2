import { useState } from "react";
import { ICard } from "../types";

interface ISearchbar {
  setCards: (cards: ICard[]) => void;
  cards: ICard[];
}

const Searchbar: React.FC<ISearchbar> = ({ setCards, cards }) => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value.length > 0) {
      const filteredCards = cards.filter((card) => {
        const toInclude =
          card.title.toLowerCase().includes(value.toLowerCase()) ||
          card.text.toLowerCase().includes(value.toLowerCase());
        return toInclude;
      });
      setCards(filteredCards);
    } else {
      setCards(cards);
    }
  };

  const toggleShowSearchbar = () => {setShowSearchbar((prev) => !prev); setCards(cards)};
  return (
    <div className="absolute right-0 sm:right-4 md:right-6 xl:right-8">
      {showSearchbar && (
        <input
          className="w-full p-2 pr-10 rounded-lg bg-gray-200 outline-none"
          onChange={handleOnChange}
          type="text"
          placeholder="Search..."
        />
      )}
      <button type="button" onClick={toggleShowSearchbar}>
        {showSearchbar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-2 top-[50%] translate-y-[-50%] "
            fill="none"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="absolute right-2 top-[50%] translate-y-[-50%] "
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3841 13.7957L12.7584 13.4642C12.5855 13.269 12.2917 13.2395 12.0834 13.3963L12.3841 13.7957ZM13.7957 12.3841L13.3963 12.0834C13.2395 12.2917 13.269 12.5855 13.4642 12.7584L13.7957 12.3841ZM13.8404 12.4262L13.4869 12.7798L13.8404 12.4262ZM17.7071 16.2929L18.0607 15.9393V15.9393L17.7071 16.2929ZM17.7071 17.7071L18.0607 18.0607L18.0607 18.0607L17.7071 17.7071ZM16.2929 17.7071L15.9393 18.0607H15.9393L16.2929 17.7071ZM12.4262 13.8404L12.7798 13.4869L12.4262 13.8404ZM8.11111 13.7222C11.21 13.7222 13.7222 11.21 13.7222 8.11111H12.7222C12.7222 10.6578 10.6578 12.7222 8.11111 12.7222V13.7222ZM2.5 8.11111C2.5 11.21 5.01218 13.7222 8.11111 13.7222V12.7222C5.56447 12.7222 3.5 10.6578 3.5 8.11111H2.5ZM8.11111 2.5C5.01218 2.5 2.5 5.01218 2.5 8.11111H3.5C3.5 5.56447 5.56447 3.5 8.11111 3.5V2.5ZM13.7222 8.11111C13.7222 5.01218 11.21 2.5 8.11111 2.5V3.5C10.6578 3.5 12.7222 5.56447 12.7222 8.11111H13.7222ZM8.11111 15.7222C9.82702 15.7222 11.4116 15.1538 12.6849 14.1952L12.0834 13.3963C10.9775 14.2289 9.60264 14.7222 8.11111 14.7222V15.7222ZM0.5 8.11111C0.5 12.3146 3.90761 15.7222 8.11111 15.7222V14.7222C4.4599 14.7222 1.5 11.7623 1.5 8.11111H0.5ZM8.11111 0.5C3.90761 0.5 0.5 3.90761 0.5 8.11111H1.5C1.5 4.4599 4.4599 1.5 8.11111 1.5V0.5ZM15.7222 8.11111C15.7222 3.90761 12.3146 0.5 8.11111 0.5V1.5C11.7623 1.5 14.7222 4.4599 14.7222 8.11111H15.7222ZM14.1952 12.6849C15.1538 11.4116 15.7222 9.82702 15.7222 8.11111H14.7222C14.7222 9.60264 14.2289 10.9775 13.3963 12.0834L14.1952 12.6849ZM13.4642 12.7584C13.4719 12.7653 13.4795 12.7724 13.4869 12.7798L14.194 12.0727C14.1722 12.0509 14.15 12.03 14.1273 12.0099L13.4642 12.7584ZM13.4869 12.7798L17.3536 16.6464L18.0607 15.9393L14.194 12.0727L13.4869 12.7798ZM17.3536 16.6464C17.5488 16.8417 17.5488 17.1583 17.3536 17.3536L18.0607 18.0607C18.6464 17.4749 18.6464 16.5251 18.0607 15.9393L17.3536 16.6464ZM17.3536 17.3536C17.1583 17.5488 16.8417 17.5488 16.6464 17.3536L15.9393 18.0607C16.5251 18.6464 17.4749 18.6464 18.0607 18.0607L17.3536 17.3536ZM16.6464 17.3536L12.7798 13.4869L12.0727 14.194L15.9393 18.0607L16.6464 17.3536ZM12.7798 13.4869C12.7724 13.4795 12.7653 13.4719 12.7584 13.4642L12.0099 14.1273C12.03 14.15 12.0509 14.1722 12.0727 14.194L12.7798 13.4869Z"
              fill="black"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
export default Searchbar;
