import { CardFooterProps } from "../../types/types";

const CardFooter: React.FC<CardFooterProps> = ({
  topAttractions,
  currency,
}) => {
  const topAttractionsList = (
    <p>
      Top Attractions:&nbsp;
      {topAttractions.map((item, id) => (
        <span key={id}>{`${item},`}</span>
      ))}
    </p>
  );
  return (
    <>
      {topAttractionsList}
      <p>Currency: {currency}</p>
    </>
  );
};

export default CardFooter;
