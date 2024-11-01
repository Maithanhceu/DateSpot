import { render, screen, fireEvent} from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import { UserIdContext } from '../UserEvents/UserIdContext';
import { AltTextContext } from '../EventCreation/AltTextContext';
import EventForm from '../EventCreation/EventForm';

const mockUserId = '12345'; 
const mockEventAltText = 'This is a test alt text'; 

describe('EventForm Component', () => {
    it('renders the form correctly', () => {
        // Render the EventForm within the necessary context
        render(
            <UserIdContext.Provider value={{ userId: mockUserId }}>
                <AltTextContext.Provider value={{ eventAltText: mockEventAltText }}>
                    <EventForm />
                </AltTextContext.Provider>
            </UserIdContext.Provider>
        );

        // Check if the form elements are in the document
        expect(screen.getByLabelText(/event title/i)).toBeTruthy();
        expect(screen.getByLabelText(/upload photo/i)).toBeTruthy();
        expect(screen.getByLabelText(/event description/i)).toBeTruthy();
        expect(screen.getByLabelText(/event date/i)).toBeTruthy();
        expect(screen.getByLabelText(/location/i)).toBeTruthy();
        expect(screen.getByLabelText(/event type/i)).toBeTruthy();
        expect(screen.getByLabelText(/event group/i)).toBeTruthy();
    });

    it('allows user to fill in the form', () => {
        // Render the EventForm within the necessary context
        render(
            <UserIdContext.Provider value={{ userId: mockUserId }}>
                <AltTextContext.Provider value={{ eventAltText: mockEventAltText }}>
                    <EventForm />
                </AltTextContext.Provider>
            </UserIdContext.Provider>
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'My Event Title' } });
        fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'Description of my event' } });
        fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-11-01' } });
        fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'New Orleans' } });
        fireEvent.change(screen.getByLabelText(/event type/i), { target: { value: 'Bar Night' } });
        fireEvent.change(screen.getByLabelText(/event group/i), { target: { value: 'Singles in their 20s' } });

        // Check if the values are set correctly
        expect(screen.getByLabelText(/event title/i).value).toBe('My Event Title');
        expect(screen.getByLabelText(/event description/i).value).toBe('Description of my event');
        expect(screen.getByLabelText(/event date/i).value).toBe('2024-11-01');
        expect(screen.getByLabelText(/location/i).value).toBe('New Orleans');
        expect(screen.getByLabelText(/event type/i).value).toBe('Bar Night');
        expect(screen.getByLabelText(/event group/i).value).toBe('Singles in their 20s');
    });
});



