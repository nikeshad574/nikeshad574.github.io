import { Mail } from "lucide-react";
import GlowingButton from "../../components/GlowingButton";

function GetInTouchContainer() {
  return (
    <section className="container">
      <h2 className="text-3xl font-medium mb-4 flex justify-center gap-2 mx-auto">
        <span className="w-1.5 bg-primary rounded-md" />
        Get In Touch
      </h2>

      <p className="text-md text-center mb-8">
        Ways to get in touch with me for collaborations, inquiries, or just to
        say hello.
      </p>

      <div className="flex flex-col sm:flex-row justify-between">
        <div className="bg-radial from-primary-900 to-primary-900/20  rounded-lg flex-1/2 flex flex-col gap-4 items-center justify-center p-4">
          <div>
            <h3 className="text-2xl font-medium">Nikesh Adhikari</h3>
            <div className="flex gap-2">
              <span className="bg-primary w-1 rounded-md" />
              <p>Fullstack Developer</p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center">
              <span className="bg-primary-700 flex items-center justify-center p-2 rounded-full translate-x-4">
                <Mail className="w-5 h-5" />
              </span>
              <p
                title="mail"
                className="bg-primary-800 py-0.5 pl-6 pr-4 rounded-xl"
              >
                nikeshad574@gmail.com
              </p>
            </div>

            <div className="flex items-center">
              <span className="bg-primary-700 flex items-center justify-center p-2 rounded-full translate-x-4">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-white"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </span>
              <p
                title="mail"
                className="bg-primary-800 py-0.5 pl-6 pr-4 rounded-xl"
              >
                nikeshad574
              </p>
            </div>
          </div>

          <h4>Socials:</h4>
          <div className="bg-primary-700 p-2 rounded-2xl flex items-center gap-3">
            <a href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-white"
              >
                <title>Facebook</title>
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
              </svg>
            </a>

            <a href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-white"
              >
                <title>YouTube</title>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            <a href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-white"
              >
                <title>X</title>
                <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
              </svg>
            </a>

            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="h-5 w-5 fill-white"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
          </div>
        </div>

        <form className="flex-1/2 flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="outline focus:outline-primary-400 rounded-md px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="outline focus:outline-primary-400 rounded-md px-2 py-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-medium">
              Message
            </label>
            <textarea
              id="message"
              className="outline focus:outline-primary-400 rounded-md px-2 py-1 h-32 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <GlowingButton
              onClick={() => console.log("clicked")}
              className="w-fit px-6 py-2 font-medium text-md "
            >
              Get In Touch
            </GlowingButton>
          </div>
        </form>
      </div>
    </section>
  );
}

export default GetInTouchContainer;
