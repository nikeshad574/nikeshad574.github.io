import SEO from "../../components/SEO";
import GetInTouchContainer from "../home/GetInTouchContainer";

function Contact() {
  return (
    <section className="container">
      <SEO
        title="Contact Me"
        description="Get in touch with Nikesh Adhikari, a full stack developer based in Nepal. Contact him for inquiries, project collaborations, or to hire him for your next project. View his portfolio and reach out today."
        canonical="https://nikeshad574.com/contact"
      />
      <div className="h-4" />
      <GetInTouchContainer />
    </section>
  );
}

export default Contact;
