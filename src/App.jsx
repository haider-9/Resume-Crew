import { ResumeProvider } from "./context/ResumeContext";
import ResumePreview from "./components/ResumePreview";
import MultiStepForm from "./components/MultiStepForm";
import TemplateChanger from "./components/TemplateChanger";
import { useState } from "react";

function App() {
  const [variant, setVariant] = useState("modern");
  return (
    <ResumeProvider>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
        <div className="text-center py-6 sm:py-8 lg:py-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-zinc-900">
            Craft Your Perfect Resume in Minutes! ✨📄
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
            Fast, easy, and professional — your career journey starts here.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6 sm:gap-8">
          <div className="w-full lg:w-1/2">
            <MultiStepForm />
          </div>
          <div className="w-full lg:w-1/2">
            <ResumePreview variant={variant} />
          </div>
        </div>
      </div>
      <TemplateChanger setVariant={setVariant} />
    </ResumeProvider>
  );
}

export default App;