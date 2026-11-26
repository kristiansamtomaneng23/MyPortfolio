import { useState, type FormEvent } from "react";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5059";

export function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setNote("");

    try {
      const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, message }),
      });

      if (!response.ok) {
        throw new Error(`Contact API returned ${response.status}`);
      }

      setNote(`Thanks ${fullName}! Your message has been sent.`);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send contact message", error);
      setNote("Sorry, we couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section py-5" id="contact">
      <div className="container" data-aos="zoom-out-up" data-aos-duration="2000">
        <h2 className="contact-title text-center mb-5">Let&apos;s talk</h2>

        <div className="row justify-content-center align-items-start g-5">
          <div className="col-md-5 col-lg-4 d-flex flex-column gap-4 pt-md-4">
            <a href="tel:+639162150763" className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
              <span>+639162150763</span>
            </a>

            <a href="https://github.com/kristiansamtomaneng23" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              My Github
            </a>

            <a href="https://www.facebook.com/kekeke23" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
              My Facebook
            </a>
          </div>

          <div className="col-md-7 col-lg-6">
            <p className="contact-intro mb-4">
              Whether you&apos;re looking for an entry-level Software Engineer to improve your existing platform, I&apos;m here to help.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label contact-label">Full Name</label>
                <input
                  type="text"
                  className="form-control contact-input"
                  id="name"
                  placeholder="Your Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label contact-label">Email Address</label>
                <input
                  type="email"
                  className="form-control contact-input"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label contact-label">Your Message</label>
                <textarea
                  className="form-control contact-input contact-textarea"
                  id="message"
                  rows={3}
                  placeholder="Share your thoughts..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary-custom px-4 py-2" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </button>

              {note && <p className="mt-3 small text-light">{note}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}