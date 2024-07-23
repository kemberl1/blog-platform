import Markdown from 'markdown-to-jsx'

function StyledImage({ alt = '', src }) {
  return <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
}

function MarkdownRenderer({ markdownContent }) {
  return (
    <div className="markdown-container">
      <Markdown
        options={{
          overrides: {
            img: {
              component: StyledImage,
            },
          },
        }}
      >
        {markdownContent}
      </Markdown>
    </div>
  )
}

export default MarkdownRenderer
