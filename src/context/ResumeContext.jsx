import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

const initial_state = {
  personalInfo: {
    name: "",
    phone: "",
    email: "",
    location: "",
    website: "",
    image: "https://dummyimage.com/300x300",
    summary: "",
    jobTitle: "",
  },
  education:[],
  skills: [],
  languages: [],
  workExperience: [],
  references: [],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() =>
    localStorage.getItem("resumeData")
      ? JSON.parse(localStorage.getItem("resumeData"))
      : initial_state
  );

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  localStorage.setItem("resumeData", JSON.stringify(resumeData));


  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
