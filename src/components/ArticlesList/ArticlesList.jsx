import Article from '../Article/Article'

function ArticlesList({ articles }) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </div>
  )
}

export default ArticlesList
