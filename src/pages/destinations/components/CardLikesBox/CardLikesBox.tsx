import styles from "./CardLikesBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface CardLikesBoxProps {
  likes: number;
  countryId: number;
  handleLikeClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;

  handleCardDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
}

const CardLikesBox: React.FC<CardLikesBoxProps> = ({
  likes,
  countryId,
  handleLikeClick,
  handleCardDelete,
}) => {
  return (
    <div className={styles.likes_container}>
      <span>
        <button
          onClick={(event) => {
            handleLikeClick(event, countryId);
          }}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <span>
          Likes: <span className={styles.like_count}>{likes}</span>
        </span>
        <button
          onClick={(event) => {
            handleCardDelete(event, countryId);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "red" }} />
        </button>
      </span>
    </div>
  );
};

export default CardLikesBox;

// const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//   event.preventDefault();
//   event.stopPropagation();
//   setCountryData((prevCountryData: CountryInterface[]) =>
//     prevCountryData.map((item: CountryInterface) => {
//       if (item.id === countryId) {
//         return { ...item, likes: item.likes + 1 };
//       }
//       return item;
//     })
//   );
// };
