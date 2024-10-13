import styles from "./CardLikesBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faCircleXmark, faRotate } from "@fortawesome/free-solid-svg-icons";
import { CardLikesBoxProps } from "@/types/types";

const CardLikesBox: React.FC<CardLikesBoxProps> = ({
  likes,
  countryId,
  handleLikeClick,
  handleCardDelete,
  isDeleted,
}) => {
  const deleteRetriveToggleButtonIcon = !isDeleted ? (
    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "red" }} size="lg" />
  ) : (
    <FontAwesomeIcon icon={faRotate} size="lg" style={{ color: "green" }} />
  );
  return (
    <div className={styles.likes_container}>
      <span>
        <button
          onClick={(event) => {
            handleLikeClick(event, countryId);
          }}
        >
          <FontAwesomeIcon icon={faThumbsUp} size="lg" />
        </button>
        <span>
          Likes: <span className={styles.like_count}>{likes}</span>
        </span>
        <button
          onClick={(event) => {
            handleCardDelete(event, countryId);
          }}
        >
          {deleteRetriveToggleButtonIcon}
        </button>
      </span>
    </div>
  );
};

export default CardLikesBox;
