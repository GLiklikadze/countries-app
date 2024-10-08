import { CountryInterface } from "@/types/types";

interface CardLikesBoxProps {
  likes: number;
  setCountryData: (
    updateFunction: (prevData: CountryInterface[]) => CountryInterface[]
  ) => void;
  countryId: number;
}

const CardLikesBox: React.FC<CardLikesBoxProps> = ({
  likes,
  setCountryData,
  countryId,
}) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCountryData((prevCountryData: CountryInterface[]) =>
      prevCountryData.map((item: CountryInterface) => {
        if (item.id === countryId) {
          return { ...item, likes: item.likes + 1 };
        }
        return item;
      })
    );
  };
  return (
    <div>
      <span>Likes: {likes}</span>

      <span>
        <button onClick={(event) => handleClick(event)}>Like</button>
      </span>
    </div>
  );
};

export default CardLikesBox;
