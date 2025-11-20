import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 margin-nav-height h-full-minus-nav">
      <img
        src="/page_broken.webp"
        alt="404 Page Not Found"
        className="h-80 skew-4 "
      />

      <h1 className="text-2xl">Oops... Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">
        Go back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
