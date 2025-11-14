'use client'

/**
 * Client component to render blog content
 * Handles markdown or HTML content rendering
 */
interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  // If content contains HTML, render it
  // Otherwise, treat as plain text with line breaks
  const renderContent = () => {
    // Check if content contains HTML tags
    const hasHTML = /<[a-z][\s\S]*>/i.test(content)
    
    if (hasHTML) {
      // Render HTML content (sanitized by Next.js)
      return (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    } else {
      // Render as plain text with line breaks
      return (
        <div className="prose prose-lg max-w-none">
          {content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') {
              return <br key={index} />
            }
            return (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div className="blog-content">
      {renderContent()}
    </div>
  )
}

