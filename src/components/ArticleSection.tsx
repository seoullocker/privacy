import type { Article } from '../data/types'
import { BlockRenderer } from './BlockRenderer'
import { Link } from './Icons'

/** 조문 하나를 그린다. id 가 붙어 있어 목차와 주소창 앵커가 이곳을 가리킨다 */
export function ArticleSection({ article }: { article: Article }) {
  return (
    <section className="article" id={article.id} aria-labelledby={`${article.id}-title`}>
      <div className="article__head">
        <span className="article__label">{article.label}</span>
        <h2 className="article__title" id={`${article.id}-title`}>
          {article.title}
          <a
            className="article__anchor"
            href={`#${article.id}`}
            aria-label={`${article.label} ${article.title} 링크 복사`}
          >
            <Link />
          </a>
        </h2>
      </div>

      {article.blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </section>
  )
}
