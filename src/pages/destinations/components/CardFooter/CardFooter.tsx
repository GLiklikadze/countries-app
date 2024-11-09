import { CardFooterProps } from "@/types/types";
import { useParams } from "react-router-dom";

const CardFooter: React.FC<CardFooterProps> = ({
  // topAttractions,
  currency,
}) => {
  const { lang } = useParams();
  const currencyLabel = lang === "en" ? "Currency" : "ვალუტა";
  return (
    <div>
      <p>
        {currencyLabel}: {currency}
      </p>
    </div>
  );
};

export default CardFooter;
