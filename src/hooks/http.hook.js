import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url) => {
        setLoading(true);
        console.log('request');
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Server response: ${response.statusText}`);
            }

            const data = response.json();
            setLoading(false);

            return data;

        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

export default useHttp;
