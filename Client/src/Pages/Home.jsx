import NewsAPI from "../Components/NewsAPI";
import NavBar from "../Components/NavBar";

export default function Home() {
    return (
        <>
        <NavBar/>
        <p> Home Page </p>
        <NewsAPI />
        </>
    );
}