import useSmoothScroll from '../hooks/useSmoothScroll'

export default function Intro() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section className="intro" id="intro">
      <header>
        <h1>Paradigm Shift</h1>
        <p>A free responsive site template designed by @ajlkn / HTML5 UP</p>
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
          <img src="/images/pic01.jpg" alt="Portada" />
        </span>
      </div>
    </section>
  )
}