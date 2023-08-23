import { useState } from 'react';

const useArticle = (onArticleFetched) => {
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticle = async (submittedUrl) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://url-summary-backend.jackdewinter.repl.co/fetch-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: submittedUrl }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setArticle(responseData.article);
        onArticleFetched();
        console.log('Server responded with article');
      } else {
        console.error('POST request for article failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request for article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { article, isLoading, fetchArticle };
};

export default useArticle;
