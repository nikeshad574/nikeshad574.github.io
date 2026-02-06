import { Loader, Printer } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import useGetAboutme from "../../hooks/aboutme.hooks";
import { useGetSkills } from "../../hooks/skill.hooks";

function AboutMe() {
  const { aboutMe, isLoading, error } = useGetAboutme();
  const { skills, isLoading: isGettingSkills } = useGetSkills();

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

  const aboutMeValues = aboutMe?.rows[0];

  const parseMaybeJsonArray = (arr: any[] | undefined) => {
    if (!arr) return [];
    return arr.map((item) => {
      if (typeof item === "string") {
        try {
          return JSON.parse(item);
        } catch {
          return item;
        }
      }
      return item;
    });
  };

  const professionalExperiences = parseMaybeJsonArray(
    aboutMeValues?.professionalExperiences as any[] | undefined
  );
  const education = parseMaybeJsonArray(
    aboutMeValues?.education as any[] | undefined
  );

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

      {isLoading && (
        <div className="border border-primary-100/40 rounded-md p-4 print:text-black">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      )}

      {error && (
        <div className="border border-primary-100/40 rounded-md p-4 print:text-black">
          <p className="text-red-500">Failed, {error.message}</p>
        </div>
      )}

      {!isLoading && aboutMe && aboutMeValues && (
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
            Github: {aboutMeValues.github} | LinkedIn: {aboutMeValues.linkedin}{" "}
            | Site: {aboutMeValues.site}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-medium">Professional Summary</h2>

            <p>{aboutMeValues.professionalSummary}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-medium">Skills</h2>

            <ul className="ml-4 list-disc">
              <li>
                <span className="font-medium mr-2">Core Skills:</span>
                {aboutMeValues.coreSkills.join(", ")}
              </li>
              <li>
                <span className="font-medium mr-2">Technical Skills:</span>
                {!isGettingSkills &&
                  skills &&
                  skills.rows.map((skill) => skill.name).join(", ")}
                {isGettingSkills && (
                  <Loader className="ml-2 inline-block animate-spin h-4 w-4" />
                )}
              </li>
              <li>
                <span className="font-medium mr-2">Additional Skills:</span>
                {aboutMeValues.additionalSkills.join(", ")}
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-medium mb-4">
              Professional Experience
            </h2>

            {professionalExperiences.map((pe, index) => (
              <div key={`${index}-${pe.company}`} className="mb-4">
                <h3 className="text-lg font-medium">
                  {pe.role} | {pe.company}
                </h3>
                <p className="mb-2">
                  {pe.location} | {pe.duration}
                </p>

                <ul className="list-disc ml-4">
                  {(pe.responsibilities as string[]).map((res, idx) => (
                    <li key={`${res}-${idx}`}>{res}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-medium">Education</h2>

            <ul className="list-disc ml-4">
              {education.map((edu, idx) => (
                <li key={`${idx}-${edu.institution}`}>
                  {edu.institution} | {edu.institution} | {edu.year}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default AboutMe;
