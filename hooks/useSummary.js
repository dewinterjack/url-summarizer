import { useState } from 'react';

const useSummary = (article, onFetchSummary) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryFetched, setIsSummaryFetched] = useState(false);

  const fetchSummary = async () => {
    onFetchSummary();
    if (!isSummaryFetched) {
      setIsLoading(true);
      try {
        const response = await fetch('https://url-summary-backend.jackdewinter.repl.co/generate-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ article: article }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setSummary(responseData.summary);
          setIsSummaryFetched(true);
          console.log('Server responded with summary');
        } else {
          console.error('POST request for summary failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending POST request for summary:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetSummary = () => {
    setSummary('');
    setIsSummaryFetched(false);
  };

  return { summary, isLoading, fetchSummary, resetSummary };
};

export default useSummary;
