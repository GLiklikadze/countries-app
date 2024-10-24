import { CardFooterProps } from "@/types/types";
import { useParams } from "react-router-dom";

const CardFooter: React.FC<CardFooterProps> = ({
  // topAttractions,
  currency,
}) => {
  const { lang } = useParams();
  // const topAttractionsList = (
  //   <p>
  //     Top Attractions:&nbsp;
  //     {topAttractions.map((item, id) => (
  //       <span key={id}>{`${item},`}</span>
  //     ))}
  //   </p>
  // );
  const currencyLabel = lang === "en" ? "Currency" : "ვალუტა";
  return (
    <>
      {/* {topAttractionsList} */}
      <p>
        {currencyLabel}: {currency}
      </p>
    </>
  );
};

export default CardFooter;
