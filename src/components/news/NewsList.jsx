import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard'; 

const NewsList = ({ maxArticles, className }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const queryParam = maxArticles ? `?take=${maxArticles}` : '';
        const response = await fetch(`https://win23-assignment.azurewebsites.net/api/articles${queryParam}`);
        const articlesData = await response.json();
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [maxArticles]);

  return (
    <div className='news-list'>
      {articles.map(article => (
        <NewsCard
          key={article.id}
          id={article.id}
          title={article.title}
          content={article.content}
          imageUrl={article.imageUrl}
          published={article.published}
          className={className}
          category={article.category}
        />
      ))}
    </div>
  );
};

export default NewsList;
