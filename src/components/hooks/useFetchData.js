import { useState, useEffect } from 'react';
import dataProducts from '../../data/Data';



const useFetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Simulate a data fetch with a timeout
        const fetchData = async () => {
            try {
                setLoading(true);
                // Simulating a delay (e.g., API call)
                const response = await new Promise((resolve) => {
                    setTimeout(() => resolve(dataProducts), 1000);
                });
                setData(response);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetchData;