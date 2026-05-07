import Image from "next/image";
import Header from "@/app/components/Header";
import Services from "./Services/page";
import Resume from "./Resume/page";
import Work from "./Work/page";
import ContactPage from "./Contact/page";

export default function Home() {
  return (
    <>
      <section id="home">
        <Header />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="resume">
        <Resume />
      </section>
      <section id="work">
        <Work />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
    </>
  );
}
 