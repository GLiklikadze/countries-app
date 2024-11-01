import styles from "./CardLikesBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faCircleXmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import { CardLikesBoxProps } from "@/types/types";
import { useParams } from "react-router-dom";

const CardLikesBox: React.FC<CardLikesBoxProps> = ({
  likes,
  countryId,
  handleLikeClick,
  handleCardDelete,
  isDeleted,
  handleCardEdit,
}) => {
  const { lang } = useParams();
  const deleteRetriveToggleButtonIcon = (
    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "red" }} size="lg" />
  );
  const editButton = (
    <FontAwesomeIcon icon={faEdit} style={{ color: "green" }} size="lg" />
  );

  const likesLabel = lang === "en" ? "Likes" : "მოწონება";
  return (
    <div className={styles.likes_container}>
      <span>
        <span>
          {likesLabel}: <span className={styles.like_count}>{likes}</span>
        </span>
        <button
          onClick={(event) => {
            handleLikeClick(event, countryId);
          }}
          title="Like"
        >
          <FontAwesomeIcon icon={faThumbsUp} size="lg" />
        </button>
        <button
          onClick={(event) => {
            handleCardEdit(event, countryId);
          }}
          title="edit"
        >
          {editButton}
        </button>
        <button
          onClick={(event) => {
            handleCardDelete(event, countryId);
          }}
          title={!isDeleted ? "Delete Card" : "Retrive Card"}
        >
          {deleteRetriveToggleButtonIcon}
        </button>
      </span>
    </div>
  );
};

export default CardLikesBox;
