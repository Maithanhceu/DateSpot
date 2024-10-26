import CreateEvent from "../Components/CreateEvent";
import { AltTextProvider } from '../Components/AltTextContext';


export default function Home() {
    return (
        <>
            <p> Home Page </p>
            <AltTextProvider>
                <CreateEvent />
            </AltTextProvider>

        </>
    );
}