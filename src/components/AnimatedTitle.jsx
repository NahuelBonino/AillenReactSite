import { useRef } from 'react'
import useTitleMorph from '../hooks/useTitleMorph'
import { LETTERS, TITLE_TEXT, VIEW_BOX } from '../data/titleMorph'

const RATIO = VIEW_BOX.w / VIEW_BOX.h

export default function AnimatedTitle({ text = TITLE_TEXT, ready = true }) {
  const svgRef = useRef(null)

  useTitleMorph(svgRef, { ready })

  return (
    <div className="title-morph" style={{ '--title-ratio': RATIO }}>
      <h1 className="sr-only">{text}</h1>
      <svg
        ref={svgRef}
        className="title-morph__svg"
        viewBox={`${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.w} ${VIEW_BOX.h}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className="title-morph__letters">
          {LETTERS.map((letter, index) => (
            <path key={`${letter.char}-${index}`} data-letter={index} d={letter.d} />
          ))}
        </g>
      </svg>
    </div>
  )
}
