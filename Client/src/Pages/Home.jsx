import { AltTextProvider} from '../Components/EventCreation/AltTextContext';
import NewsAPI from '../Components/NewsAPI';
import EventForm from '../Components/EventCreation/EventForm';
import './CSS/Home.css'



export default function Home() {
    return (
        <>
            <AltTextProvider>
                <div className='row-container'>
                <NewsAPI/>
                <EventForm/>
                </div>
            </AltTextProvider>

        </>
    );
}