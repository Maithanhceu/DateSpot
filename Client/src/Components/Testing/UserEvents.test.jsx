import { render, screen, fireEvent} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import UserEvents from '../UserEvents/UserEvents';
import { UserIdContext } from '../UserEvents/UserIdContext'; 

describe('UserEvents component', () => {
    const userId = 1;

    beforeEach(() => {
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
                    },
                    {
                        id: 2,
                        eventtitle: "Another Event",
                        eventgroup: "Another Group",
                        eventdescription: "Just another Event",
                        eventphoto: "sample2.jpg",
                        alttext: "Another Alt Text",
                        date: "2023-11-02T00:00:00Z",
                        location: "Mexico"
                    }
                ]),
            })
        );

        // Use vi.fn to mock the fetch implementation locally
        vi.stubGlobal('fetch', mockFetch);
    });

    afterEach(() => {
        vi.restoreAllMocks(); // Restore mocks after each test
    });

    it('renders all events', async () => {
        render(
            <UserIdContext.Provider value={{ userId }}>
                <UserEvents />
            </UserIdContext.Provider>
        );

        // Wait for the Sample Event to appear
        await screen.findByText("Sample Event"); 
        await screen.findByText("Another Event"); 

        // Verify both events are rendered
        expect(screen.getByText("Sample Event")).toBeTruthy();
        expect(screen.getByText("Another Event")).toBeTruthy();
    });

    it('updates the selected location when a location is chosen', async () => {
        render(
            <UserIdContext.Provider value={{ userId }}>
                <UserEvents />
            </UserIdContext.Provider>
        );

        await screen.findByText("Sample Event"); 

        // Select the location dropdown
        const locationSelect = screen.getByLabelText(/location/i);
        
        // Change the selection to "Another Location"
        fireEvent.change(locationSelect, { target: { value: 'Mexico' } });

        // Verify that the dropdown reflects the selection
        expect(locationSelect.value).toBe('Mexico');

        // Check that the displayed events are filtered accordingly
        await screen.findByText("Another Event"); 
        expect(screen.queryByText("Sample Event")).toBeNull(); 
    });
});