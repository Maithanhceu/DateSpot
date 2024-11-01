import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AllEvents from '../UserEvents/AllEvents'; 
import { UserIdContext } from '../UserEvents/UserIdContext'; 

describe('AllEvents', () => {
    it('renders events for the user', async () => {
        // Mock the userId for context
        const userId = 1;

        // Mock fetch within the test scope
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    {
                        id: 1,
                        eventtitle: "Sample Event",
                        eventgroup: "Sample Group",
                        eventdescription: "This is a sample event",
                        eventphoto: "sample.jpg",
                        alttext: "Sample Alt Text",
                        date: "2023-11-01T00:00:00Z",
                        location: "Sample Location"
                    }
                ]),
            })
        );
        
        vi.stubGlobal('fetch', mockFetch);

        // Render the component with UserIdContext provider
        render(
            <UserIdContext.Provider value={{ userId }}>
                <AllEvents />
            </UserIdContext.Provider>
        );

        // Assert that the event title appears in the document
        expect(await screen.findByText("Sample Event")).not.toBeNull();

        // Cleanup fetch mock after test
        vi.unstubAllGlobals();
    });
});
