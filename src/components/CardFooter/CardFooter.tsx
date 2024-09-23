import { CardFooterProps } from "../../types/types";

const CardFooter: React.FC<CardFooterProps> = ({
  topAttractions,
  currency,
}) => {
  return (
    <>
      <p>
        Top Attractions:&nbsp;
        {topAttractions.map((item, id) => (
          <span key={id}>{`${item},`}</span>
        ))}
      </p>
      <p>Currency: {currency}</p>
    </>
  );
};

export default CardFooter;
