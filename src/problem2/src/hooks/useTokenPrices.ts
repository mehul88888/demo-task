import { useState, useEffect } from 'react';

export interface TokenPrice {
  currency: string;
  price: number;
  date: string;
}

export function useTokenPrices() {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const data: TokenPrice[] = await response.json();
        // Filter out tokens without a valid price
        const validPrices = data.filter(token => token.price != null && token.price > 0);
        setPrices(validPrices);
      } catch (error) {
        console.error("Error fetching token prices",error)
        setError('Error fetching token prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { prices, loading, error };
}

