import { copyright } from '../data/content'

export default function Copyright() {
  const year = new Date().getFullYear()
  return <div className="copyright">© {year} {copyright}</div>
}