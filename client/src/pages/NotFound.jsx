import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="container container-narrow text-center">
        <span className="eyebrow blue">404</span>
        <h1>We couldn't find that page.</h1>
        <p className="lede mt-16" style={{ margin: "0 auto" }}>The page may have moved. Try one of the links below.</p>
        <div className="hero-ctas mt-32" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary">Go to Homepage</Link>
          <Link to="/recorded-ielts-course" className="btn btn-secondary">Recorded Course</Link>
        </div>
      </div>
    </section>
  );
}
