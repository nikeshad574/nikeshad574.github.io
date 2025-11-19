import { Printer } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

function AboutMe() {
  const aboutMeValues = {
    name: "Nikesh Adhikari",
    location: "Kathmandu, Nepal",
    profession: "Full Stack Developer",
    email: "nikeshad574@gmail.com",
    github: "nikeshad574",
    site: "https://nikeshad574.github.io",
    linkedin: "nikeshad574",
    professionalSummary:
      "Full-Stack Developer with hands-on experience in building web applications using React, Node.js, Laravel, and WordPress. Skilled in backend and frontend development, API integration, and team collaboration. Successfully small teams to deliver projects on time. ",
    coreSkills: [
      "Team Leadership",
      "Problem Solving",
      "Project Management",
      "Time Management",
    ],
    technicalSkills: [
      "MySQL",
      "MongoDB",
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Express.js",
      "React",
      "Node.js",
      "PHP",
      "Laravel",
      "WordPress",
      "Rest API",
    ],
    additionalSkills: ["Java", ".NET", "Python", "AI Assisted Coding"],
    professionalExperience: [
      {
        role: "Full Stack Developer",
        company: "Softved Multipurpose Pvt. Ltd.",
        duration: "Dec 2024 - Present",
        location: "Kathmandu, Nepal",
        responsibilites: [
          "Lead a team of 4 developers to deliver a MERN-based e-commerce platform and several internal projects.",
          "Developed and deployed a MERN appliction as part of team projects.",
          "Built a customized website using WordPress for internal use.",
          "Integrated REST APIs with MongoDB and MySQL backends, enabling real-time data synchronization.",
          "Developed PHP and Laravel-based applications, implementing CRUD operations and REST APIs.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Computer Application (BCA), IT",
        institution: "Nist Highter Education",
        year: "2025",
      },
      {
        degree: "Higher Secondary Education (10+2), Science",
        institution: "Nist Highter Education",
        year: "2020",
      },
    ],
  };

  const printableRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    if (!printableRef.current) return;

    const content = printableRef.current.innerHTML;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();

    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    )
      .map((link) => link.outerHTML)
      .join("\n");

    const styleTags = Array.from(document.querySelectorAll("style"))
      .map((style) => style.outerHTML)
      .join("\n");

    const html = doc.createElement("html");
    html.innerHTML = `
      <head>
        <title>Print</title>
        ${styles}
        ${styleTags}
        <style>
        @media print {
          body {
            color: black;
          }
        }
        </style>
      </head>
      <body>
        <div>${content}</div>
      </body>
  `;
    doc.appendChild(html);
    doc.close();

    // Ensure styles are applied before printing
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <section className="container mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium mb-4">About Me</h1>
        <button
          className="cursor-pointer hover:text-primary-500"
          onClick={handlePrint}
        >
          <Printer />
        </button>
      </div>

      <div
        id="resume"
        ref={printableRef}
        className="border border-primary-100/40 rounded-md p-4 print:text-black"
      >
        <h1 className="text-3xl pb-2 mb-2 border-b-2 font-medium">
          {aboutMeValues.name}
        </h1>
        <p className="text-md">
          Email: {aboutMeValues.email} | Location: {aboutMeValues.location}
        </p>
        <p className="text-md">
          Github: {aboutMeValues.github} | LinkedIn: {aboutMeValues.linkedin} |
          Site: {aboutMeValues.site}
        </p>

        <div className="mt-4">
          <h2 className="text-xl font-medium">Professional Summary</h2>

          <p>{aboutMeValues.professionalSummary}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-medium">Skills</h2>

          <ul className="ml-4 list-disc">
            <li>Core Skills: {aboutMeValues.coreSkills.join(", ")}</li>
            <li>
              Technical Skills: {aboutMeValues.technicalSkills.join(", ")}
            </li>
            <li>
              Additional Skills: {aboutMeValues.additionalSkills.join(", ")}
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-medium mb-4">Professional Experience</h2>

          {aboutMeValues.professionalExperience.map((pe, index) => (
            <div key={`${index}-${pe.company}`} className="mb-4">
              <h3 className="text-lg font-medium">
                {pe.role} | {pe.company}
              </h3>
              <p className="mb-2">
                {pe.location} | {pe.duration}
              </p>

              <ul className="list-disc ml-4">
                {pe.responsibilites.map((res, idx) => (
                  <li key={`${res}-${idx}`}>{res}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-medium">Education</h2>

          <ul className="list-disc ml-4">
            {aboutMeValues.education.map((edu, idx) => (
              <li key={`${idx}-${edu.institution}`}>
                {edu.institution} | {edu.institution} | {edu.year}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
