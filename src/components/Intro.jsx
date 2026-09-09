import useSmoothScroll from '../hooks/useSmoothScroll'
import { intro } from '../data/content'

export default function Intro() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section className="intro" id="intro">
      <header>
        <h1>{intro.title}</h1>
        <p>{intro.subtitle}</p>
        <ul className="actions">
          <li>
            <a
              href="#first"
              className="arrow scrolly"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#first')
              }}
            >
              <span className="label">Next</span>
            </a>
          </li>
        </ul>
      </header>
      <div className="content">
        <span className="image fill" data-position="center">
          <img src={intro.image} alt="Aillu Garcia" />
        </span>
      </div>
    </section>
  )
}