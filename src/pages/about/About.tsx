import { useParams } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  const { lang } = useParams();
  const aboutPageHeading = lang === "en" ? "About Us" : "ჩვენს შესახებ ";
  const aboutPageText =
    lang === "en"
      ? `Welcome to Explore Europe, where your next unforgettable journey through
        the heart of Europe begins! Our travel guides focus on four of the
        continent's most fascinating destinations—Austria, Switzerland, Spain,
        and Hungary—offering you an unparalleled travel experience in these
        diverse and enchanting countries. At Explore Europe, we believe in the
        magic of travel, where each destination tells a story. From the
        snow-capped peaks of the Swiss Alps to the elegant palaces of Austria,
        the vibrant streets of Spain, and the historical grandeur of Hungary, we
        aim to bring you closer to Europe’s rich cultural heritage, breathtaking
        landscapes, and hidden gems. Our dedicated team of travel experts is
        here to help you craft the perfect itinerary, filled with unique
        experiences tailored to your interests. Whether you want to marvel at
        the architectural wonders of Vienna, bask in the sun on Spain’s
        Mediterranean coast, explore the charming villages of Switzerland, or
        immerse yourself in the rich history of Budapest, we’ve got you covered.
        With insider tips, curated itineraries, and local recommendations,
        Explore Europe is your trusted partner in discovering the beauty and
        diversity of Austria, Switzerland, Spain, and Hungary. Let us help you
        plan your next great European adventure—where will your journey take
        you?`
      : `კეთილი იყოს თქვენი მობრძანება გამოიკვლიეთ ევროპა, სადაც იწყება თქვენი
      შემდეგი დაუვიწყარი მოგზაურობა ევროპის გულში! ჩვენი ტურისტული გიდები 
      ფოკუსირებულია კონტინენტის ოთხ ყველაზე მომხიბვლელ მიმართულებაზე - ავსტრია,
      შვეიცარია, ესპანეთი და უნგრეთი - გთავაზობთ შეუდარებელ მოგზაურობის გამოცდილებას
      ამ მრავალფეროვან და მომხიბვლელ ქვეყნებში. Travel Europe-ში ჩვენ გვჯერა მოგზაურობის მაგიის,
      სადაც თითოეული დანიშნულება მოგვითხრობს ისტორიას. შვეიცარიის ალპების დათოვლილი
      მწვერვალებიდან დაწყებული ავსტრიის ელეგანტურ სასახლეებამდე, ესპანეთის ენერგიულ ქუჩებამდე
      და უნგრეთის ისტორიულ სიდიადემდე, ჩვენ მიზნად ვისახავთ დაგაახლოოთ ევროპის მდიდარ 
      კულტურულ მემკვიდრეობასთან, თვალწარმტაც პეიზაჟებთან და საგანძურთან. ჩვენი
      თავდადებული მოგზაურობის ექსპერტთა გუნდი აქ არის, რათა დაგეხმაროთ შეადგინოთ
      სრულყოფილი მარშრუტი, რომელიც სავსეა თქვენს ინტერესებზე მორგებული უნიკალური
      გამოცდილებით. გინდათ დატკბეთ ვენის არქიტექტურული საოცრებებით, ესპანეთის
      ხმელთაშუა ზღვის სანაპიროზე მზეზე ჩაძირვა, შვეიცარიის მომხიბვლელი სოფლების
      დათვალიერება ან ბუდაპეშტის მდიდარ ისტორიაში ჩაძირვა. ჩვენ დაგეხმარებით
      ინსაიდერული რჩევებით, კურირებული მარშრუტებითა და ადგილობრივი რეკომენდაციებით,
      Travel Europe არის თქვენი სანდო პარტნიორი ავსტრიის, შვეიცარიის, ესპანეთისა და 
      უნგრეთის სილამაზისა და მრავალფეროვნების აღმოჩენაში. მოდით დაგეხმაროთ დაგეგმოთ 
      თქვენი მომავალი დიდი ევროპული თავგადასავალი - სად მიგიყვანთ თქვენი მოგზაურობა? `;
  return (
    <div
      className={`${styles.about_page_container}  ${
        lang === "ka" ? styles.lang_ka : ""
      }`}
    >
      <h1>{aboutPageHeading}</h1>
      <p>{aboutPageText}</p>
    </div>
  );
};

export default About;
