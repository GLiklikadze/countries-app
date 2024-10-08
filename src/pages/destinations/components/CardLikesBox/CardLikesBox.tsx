import { CountryInterface } from "@/types/types";
import likeSvg from "@/assets/thumbs-up-regular.svg";
import styles from "./CardLikesBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
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
  const handleLikeClick = (event) => {
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
    <div className={styles.likes_container}>
      <span>
        Likes: <span className={styles.like_count}>{likes}</span>
      </span>

      <span>
        <button onClick={handleLikeClick}>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      </span>
    </div>
  );
};

export default CardLikesBox;
