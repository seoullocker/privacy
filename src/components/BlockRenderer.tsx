import type { Block } from '../data/types'
import { Alert, Info } from './Icons'

/**
 * 조문 안의 한 덩어리를 화면에 그린다.
 * 자료 구조([Block])에 무엇을 더하려면 여기에 분기를 하나 추가하면 된다.
 */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="block">{block.text}</p>

    case 'subheading':
      return <h3 className="block">{block.text}</h3>

    case 'list':
      return block.ordered ? (
        <ol className="block">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="block">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )

    case 'table':
      return (
        // 표는 좁은 화면에서 가로로만 스크롤되게 감싼다. 페이지 전체가 밀리면 안 된다
        <div className="tableWrap block">
          <table className="block">
            {block.caption && <caption className="sr-only">{block.caption}</caption>}
            <thead>
              <tr>
                {block.head.map((cell, index) => (
                  <th key={index} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout':
      return (
        <div className={`callout block${block.tone === 'warn' ? ' callout--warn' : ''}`}>
          <span className="callout__icon">{block.tone === 'warn' ? <Alert /> : <Info />}</span>
          <span>{block.text}</span>
        </div>
      )

    case 'definition':
      return (
        <dl className="block">
          {block.items.map((item, index) => (
            <div key={index} style={{ display: 'contents' }}>
              <dt>{item.term}</dt>
              <dd>{item.desc}</dd>
            </div>
          ))}
        </dl>
      )
  }
}
