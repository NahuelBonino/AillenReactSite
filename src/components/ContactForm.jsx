export default function ContactForm() {
  return (
    <form>
      <div className="fields">
        <div className="field half">
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div className="field half">
          <input type="email" name="email" placeholder="Email" />
        </div>
        <div className="field">
          <textarea name="message" rows="7" placeholder="Message"></textarea>
        </div>
      </div>
      <ul className="actions">
        <li>
          <input type="submit" value="Send Message" className="button primary" />
        </li>
      </ul>
    </form>
  )
}