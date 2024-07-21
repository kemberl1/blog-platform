import test from '../test'
import Article from '../Article/Article'

function ArticlesList() {
  const data = test
  return (
    <div className="articles-list">
      {data.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </div>
  )
}

export default ArticlesList
