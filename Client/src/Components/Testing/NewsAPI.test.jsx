import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewsAPI from '../NewsAPI';

describe('NewsAPI Component', () => {
    it('renders the NewsAPI', async () => {
        // Render the NewsAPI
        render(<NewsAPI />
        );
        await waitFor ( () => {
            expect(screen.findByText("Author:")).not.toBeNull();
        }) 
    });

    it('renders an error message when the fetch fails', async () => {
        // Render the NewsAPI
        render(<NewsAPI />);

        // Wait for the error message to appear
        const errorMessage = await waitFor(() => screen.findByText(/Error fetching news data/i));
        expect(errorMessage).toBeDefined(); 
    });
});
