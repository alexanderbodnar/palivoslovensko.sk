import { useTranslation } from "react-i18next";
import { FaReact, FaGithub, FaPython } from "react-icons/fa"; // Font Awesome
import { SiFirebase, SiTailwindcss } from "react-icons/si"; // Simple Icons
import ListGenerator from "../Common/ListGenerator";

export default function AboutProject() {
  const { t } = useTranslation();
  const content = [
    {
      header: t("aboutProject.goalsHeader"),
      text: t("aboutProject.goalsDescription"),
    },
    {
      header: t("aboutProject.technologiesHeader"),
    },
  ];
  const Icons = () => {
    return (
      <div className="flex flex-wrap md:space-x-8 text-9xl ">
        {/* React */}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="React Website"
          className="flex flex-col items-center hover:scale-110"
        >
          <FaReact className="text-blue-500  transition-transform" />
          <h1 className="text-4xl mt-2  transition-transform">
            React
          </h1>
        </a>
  
        {/* Tailwind */}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tailwind CSS Website"
          className="flex flex-col items-center hover:scale-110"
        >
          <SiTailwindcss className="text-teal-500  transition-transform" />
          <h1 className="text-4xl mt-2  transition-transform">
            Tailwind
          </h1>
        </a>
  
        {/* Firebase */}
        <a
          href="https://firebase.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Firebase Website"
          className="flex flex-col items-center hover:scale-110"
        >
          <SiFirebase className="text-yellow-500  transition-transform" />
          <h1 className="text-4xl mt-2  transition-transform">
            Firebase
          </h1>
        </a>
  
        {/* GitHub */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Website"
          className="flex flex-col items-center hover:scale-110"
        >
          <FaGithub className="text-black  transition-transform" />
          <h1 className="text-4xl mt-2  transition-transform">
            GitHub
          </h1>
        </a>
  
        {/* Python */}
        <a
          href="https://www.python.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Python Website"
          className="flex flex-col items-center hover:scale-110"
        >
          <FaPython className="text-black  transition-transform" />
          <h1 className="text-4xl mt-2  transition-transform">
            Python
          </h1>
        </a>
      </div>
    );
  };

  return (
    <div className="max-w-full">
      <div className="border-b-2 w-full text-center py-2 max-w-full">
        <h1 className="text-4xl">Viac o projekte Palivoslovensko</h1>
      </div>
      <ListGenerator content={content} CustomComponent={Icons} />
    </div>
  );
}
