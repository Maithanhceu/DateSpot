<<<<<<< HEAD
import { render, screen, fireEvent} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach} from 'vitest';
=======
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
>>>>>>> 2905f34 (feat(tests): Add JSDOM tests for rendering events and user registrations)
import AllEvents from '../UserEvents/AllEvents'; 
import { UserIdContext } from '../UserEvents/UserIdContext'; 

describe('AllEvents', () => {
    it('renders events for the user', async () => {
        // Mock the userId for context
        const userId = 1;

<<<<<<< HEAD
        beforeEach(() => {
            // Reset fetch mocks before each test
            vi.clearAllMocks();
        });

=======
>>>>>>> 2905f34 (feat(tests): Add JSDOM tests for rendering events and user registrations)
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
<<<<<<< HEAD
                        date: "2025-11-01",
=======
                        date: "2023-11-01T00:00:00Z",
>>>>>>> 2905f34 (feat(tests): Add JSDOM tests for rendering events and user registrations)
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
<<<<<<< HEAD


    it('checks that the delete button is rendered', async () => {
        const userId = 2; // Change userId for this test

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
                        date: "2025-11-01",
                        location: "Sample Location"
                    }
                ]),
            })
        );

        vi.stubGlobal('fetch', mockFetch);
        
        render(
            <UserIdContext.Provider value={{ userId }}>
                <AllEvents />
            </UserIdContext.Provider>
        );

        // Check that the event is rendered
        expect(await screen.findByText("Sample Event")).toBeTruthy();
        
        const deleteButton = screen.getByText(/delete/i);
        expect(deleteButton).toBeTruthy(); 
    });
=======
>>>>>>> 2905f34 (feat(tests): Add JSDOM tests for rendering events and user registrations)
});
