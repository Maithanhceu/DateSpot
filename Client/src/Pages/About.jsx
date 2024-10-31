import Mai_headshot from '../Photo/Mai_headshot.jpeg'

export default function About() {
    return (
        <>
            <h1>Meet Mai the Engineer and Creator</h1>
            <p>
                <br />
                Date Spot is a dating platform/application inspired by conversations between Mia and Mai,
                two single friends navigating the challenges of finding emotionally available partners in
                the fast-paced environment of Brooklyn. <br /> <br /> After experiencing emotional burnout from the typical
                online dating experience, they came up with the idea for date spot. <br /> <br />Their goal is to create a
                solution that addresses the prevalent issues in modern dating culture, including overwhelming
                choices, catfishing, ghosting, and more. <br /> <br />
            </p>
            <br />
            <p>
                We offer a platform that allows users to curate and create their own dating events.  <br /> <br />
                Think of it as an Eventbrite for dating, centered on facilitating in-person meetings and cultivating authentic relationships. <br /> <br />
                By enabling users to organize and participate in events, we empower them to take control of their romantic destinies, moving
                away from algorithm-driven matchmaking and towards genuine connections.

            </p>
            <img
                src={Mai_headshot}
                alt='A headshot of Mai, the engineer and creator'
                className='headshot' 
            />
        </>
    );
}