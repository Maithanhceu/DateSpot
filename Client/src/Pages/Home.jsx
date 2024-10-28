import { AltTextProvider} from '../Components/EventCreation/AltTextContext';
import NewsAPI from '../Components/NewsAPI';
import EventForm from '../Components/EventCreation/EventForm';


export default function Home() {
    return (
        <>
            <AltTextProvider>
                <div className='row-container'>
                <EventForm/>
                <NewsAPI/>
                </div>
            </AltTextProvider>

        </>
    );
}