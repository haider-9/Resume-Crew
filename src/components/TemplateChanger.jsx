import { HiTemplate, HiViewGrid } from "react-icons/hi";
import { BsLayoutTextWindow, BsLayoutSplit } from "react-icons/bs";
import { RiLayoutLine } from "react-icons/ri";

const variants = [
  {
    title: "Modern",
    variant: "modern",
    icon: <HiTemplate className="text-xl sm:text-2xl" />,
  },
  {
    title: "Minimal",
    variant: "minimal",
    icon: <RiLayoutLine className="text-xl sm:text-2xl" />,
  },
  {
    title: "Classic",
    variant: "classic",
    icon: <BsLayoutTextWindow className="text-xl sm:text-2xl" />,
  },
  {
    title: "Creative",
    variant: "creative",
    icon: <HiViewGrid className="text-xl sm:text-2xl" />,
  },
  {
    title: "Simple",
    variant: "simple",
    icon: <BsLayoutSplit className="text-xl sm:text-2xl" />,
  }
];

const TemplateChanger = ({ setVariant }) => {
  return (
    <div className="fixed md:top-1/2 bottom-0 left-1/2 md:left-0 -translate-x-1/2 translate-y-2/3 hover:translate-y-0 md:-translate-y-1/2 md:hover:translate-y-[-50%] bg-zinc-950/50 backdrop-blur-sm md:h-[80vh] md:min-h-96 w-[90vw] sm:w-[80vw] md:w-max text-white rounded-xl md:hover:translate-x-0 transition-all duration-500 ease-in-out p-2 sm:p-3 hover:bg-zinc-950/70">
      <div className="flex md:flex-col gap-6 sm:gap-8 md:gap-12 items-center justify-center h-full overflow-auto contain-content scrollbar-none relative">
        {variants.map((item) => (
          <div
            key={item.variant}
            className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer relative group"
            onClick={() => setVariant(item.variant)}
          >
            <div className="relative p-2 sm:p-3 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative text-xl sm:text-2xl group-hover:text-indigo-400 transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            <span className="text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 group-hover:text-indigo-400 group-hover:translate-y-0.5">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateChanger;
