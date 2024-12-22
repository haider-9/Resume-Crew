import { ResumeProvider } from "./context/ResumeContext";
import ResumePreview from "./components/ResumePreview";
import MultiStepForm from "./components/MultiStepForm";
import TemplateChanger from "./components/TemplateChanger";
import { useState } from "react";

function App() {
  const [variant, setVariant] = useState("modern");
  return (
    <ResumeProvider>
      <div className="container mx-auto pb-32">
        <div className="text-center text-white py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-900">
            Craft Your Perfect Resume in Minutes! ✨📄
          </h1>
          <p className="text-lg md:text-xl text-zinc-600">
            Fast, easy, and professional — your career journey starts here.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-8 p-4">
          <MultiStepForm />
          <ResumePreview variant={variant} />
        </div>
      </div>
      <TemplateChanger setVariant={setVariant} />
    </ResumeProvider>
  );
}

export default App;
