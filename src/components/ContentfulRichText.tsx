import React, { memo } from 'react'

interface ContentfulRichTextProps {
  content: ContentfulRichTextContent
  className?: string
  paragraphStyle?: React.CSSProperties
  convertLineBreaksToSpaces?: boolean
}

interface ContentfulRichTextContent {
  content?: ContentfulRichTextNode[]
}

interface ContentfulRichTextNode {
  nodeType: string
  content?: ContentfulRichTextNode[]
  value?: string
  marks?: ContentfulRichTextMark[]
}

interface ContentfulRichTextMark {
  type: string
}

// Función para renderizar contenido rico de Contentful
function renderRichText(content: ContentfulRichTextContent, paragraphStyle?: React.CSSProperties, convertLineBreaksToSpaces?: boolean): React.ReactNode {
  if (!content || !content.content) return null

  return content.content.map((node: ContentfulRichTextNode, index: number) => {
    switch (node.nodeType) {
      case 'paragraph':
        return (
          <p key={index} className="mb-1" style={{...paragraphStyle, lineHeight: '130%'}}>
            {node.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
              if (textNode.nodeType === 'text') {
                // Reemplazar saltos de línea con espacios solo si se especifica
                const textValue = convertLineBreaksToSpaces 
                  ? (textNode.value || '').replace(/\n/g, ' ')
                  : (textNode.value || '')
                
                let text: React.ReactNode = textValue
                
                // Aplicar marcas de formato
                if (textNode.marks) {
                  textNode.marks.forEach((mark: ContentfulRichTextMark) => {
                    switch (mark.type) {
                      case 'bold':
                        text = <strong>{text}</strong>
                        break
                      case 'italic':
                        text = <em>{text}</em>
                        break
                      case 'underline':
                        text = <u>{text}</u>
                        break
                    }
                  })
                }
                
                return <span key={textIndex}>{text}</span>
              }
              return null
            })}
          </p>
        )
      
      case 'heading-1':
        return (
          <h1 key={index} className="text-4xl font-bold mb-6">
            {node.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
              if (textNode.nodeType === 'text') {
                return <span key={textIndex}>{textNode.value}</span>
              }
              return null
            })}
          </h1>
        )
      
      case 'heading-2':
        return (
          <h2 key={index} className="text-3xl font-bold mb-4">
            {node.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
              if (textNode.nodeType === 'text') {
                return <span key={textIndex}>{textNode.value}</span>
              }
              return null
            })}
          </h2>
        )
      
      case 'heading-3':
        return (
          <h3 key={index} className="text-2xl font-bold mb-3">
            {node.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
              if (textNode.nodeType === 'text') {
                return <span key={textIndex}>{textNode.value}</span>
              }
              return null
            })}
          </h3>
        )
      
      case 'unordered-list':
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {node.content?.map((listItem: ContentfulRichTextNode, itemIndex: number) => {
              if (listItem.nodeType === 'list-item') {
                return (
                  <li key={itemIndex} className="mb-2">
                    {listItem.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
                      if (textNode.nodeType === 'text') {
                        return <span key={textIndex}>{textNode.value}</span>
                      }
                      return null
                    })}
                  </li>
                )
              }
              return null
            })}
          </ul>
        )
      
      case 'ordered-list':
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {node.content?.map((listItem: ContentfulRichTextNode, itemIndex: number) => {
              if (listItem.nodeType === 'list-item') {
                return (
                  <li key={itemIndex} className="mb-2">
                    {listItem.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
                      if (textNode.nodeType === 'text') {
                        return <span key={textIndex}>{textNode.value}</span>
                      }
                      return null
                    })}
                  </li>
                )
              }
              return null
            })}
          </ol>
        )
      
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {node.content?.map((textNode: ContentfulRichTextNode, textIndex: number) => {
              if (textNode.nodeType === 'text') {
                return <span key={textIndex}>{textNode.value}</span>
              }
              return null
            })}
          </blockquote>
        )
      
      case 'hr':
        return <hr key={index} className="my-6 border-gray-300" />
      
      default:
        return null
    }
  })
}

const ContentfulRichText = memo(function ContentfulRichText({ content, className = '', paragraphStyle, convertLineBreaksToSpaces = false }: ContentfulRichTextProps) {
  if (!content) return null

  return (
    <div className={className}>
      {renderRichText(content, paragraphStyle, convertLineBreaksToSpaces)}
    </div>
  )
})

export default ContentfulRichText

