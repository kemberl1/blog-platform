import Article from '../Article/Article'

function ArticlesList({ articles, handleLike, handleUnlike, handleDelete, handleEditClick }) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <Article
          key={article.slug}
          article={article}
          handleLike={() => handleLike(article.slug)}
          handleUnlike={() => handleUnlike(article.slug)}
          handleDelete={() => handleDelete(article.slug)}
          handleEditClick={() => handleEditClick(article.slug)}
        />
      ))}
    </div>
  )
}

export default ArticlesList
