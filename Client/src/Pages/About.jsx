
import Mai_headshot from '../Photo/Mai_headshot.jpeg';
import './CSS/About.css';

export default function About() {
    return (
        <>
            <h1>Meet Mai the Engineer and Creator</h1>
            <div className='about-info'>
                <div className='about-bio'>
                    <p>
                        <br />
                        <strong>Date Spot is a dating platform/application inspired by conversations between Mia and Mai</strong>,
                        two single friends navigating the challenges of finding emotionally available partners in
                        the fast-paced environment of Brooklyn. After experiencing emotional burnout from the typical
                        online dating experience, they came up with the idea for date spot. Their goal is to create a
                        solution that addresses the prevalent issues in modern dating culture, including overwhelming
                        choices, catfishing, ghosting, and more. <br /> <br />
                    </p>
                    <br />
                    <p>
                        We offer a platform that allows users to curate and create their own dating events.
                        <strong> Think of it as an Eventbrite for dating, centered on facilitating in-person meetings </strong> and cultivating authentic relationships.
                        By enabling users to organize and participate in events, we empower them to take control of their romantic destinies, moving
                        away from algorithm-driven matchmaking and towards genuine connections.

                    </p>
                </div>
                <div className="image-wrapper">
                    <img
                        src={Mai_headshot}
                        alt='A headshot of Mai, the engineer and creator'
                        className="headshot "
                    />
                    <p className='alt-text'>
                        A <strong>femme presenting gender-fluid person with pink hair</strong> smiling brightly behind the background of a forest.
                    </p>
                </div>
            </div>
        </>

    );
}