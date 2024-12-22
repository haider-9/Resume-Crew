import { useId, useRef, useState } from "react";
import { useResume } from "../context/ResumeContext";
import {
  LuAtSign,
  LuBriefcase,
  LuBriefcaseBusiness,
  LuBuilding,
  LuCalendarDays,
  LuFileText,
  LuGlobe,
  LuGraduationCap,
  LuLanguages,
  LuMapPin,
  LuPhone,
  LuPlus,
  LuUpload,
  LuUser,
  LuX,
} from "react-icons/lu";
import { FaAngleRight, FaTools } from "react-icons/fa";

const Total_Steps = 5;

const InputField = ({
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  startContent = null,
}) => {
  const inputRef = useRef();
  const inputId = useId();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="cursor-pointer">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-zinc-800 mb-2"
      >
        {label}
      </label>
      <div
        onClick={handleFocus}
        className="p-1 px-3 bg-white border border-zinc-400 rounded-lg flex items-center gap-4 focus-within:ring-2 ring-indigo-500"
      >
        {startContent}
        <input
          id={inputId}
          ref={inputRef}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="py-2 pr-4 focus:outline-none grow"
        />
      </div>
    </div>
  );
};

const PersonalInfoForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { personalInfo = {} } = resumeData;

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    updateResumeData("personalInfo", { ...personalInfo, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateResumeData("personalInfo", {
        ...personalInfo,
        image: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
        Personal Information
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="w-full sm:w-2/3 space-y-3 sm:space-y-4">
          <InputField
            label="Full Name"
            name="name"
            value={personalInfo.name || ""}
            onChange={handlePersonalInfoChange}
            startContent={<LuUser className="text-lg sm:text-xl" />}
          />
          <InputField
            label="Job Title"
            name="jobTitle"
            value={personalInfo.jobTitle || ""}
            onChange={handlePersonalInfoChange}
            startContent={
              <LuBriefcaseBusiness className="text-lg sm:text-xl" />
            }
          />
        </div>
        <div className="relative border inline-block mx-auto max-w-fit group">
          <img
            src={personalInfo.image || "https://via.placeholder.com/128"}
            alt={`${personalInfo.name || "Profile"}'s Image"`}
            className="size-24 sm:size-32 object-cover object-top rounded-xl"
          />
          <label
            htmlFor="profile-img"
            className="absolute top-0 left-0 h-full w-full cursor-pointer flex items-center justify-center bg-gray-900/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <LuUpload className="text-2xl sm:text-3xl text-gray-50" />
          </label>
          <input
            onInput={handleImageUpload}
            type="file"
            id="profile-img"
            hidden
            accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <InputField
          label="Email"
          name="email"
          value={personalInfo.email || ""}
          onChange={handlePersonalInfoChange}
          startContent={<LuAtSign className="text-lg sm:text-xl" />}
        />
        <InputField
          label="Contact Number"
          name="contact"
          value={personalInfo.contact || ""}
          onChange={handlePersonalInfoChange}
          startContent={<LuPhone className="text-lg sm:text-xl" />}
        />
        <InputField
          label="Location"
          name="location"
          value={personalInfo.location || ""}
          onChange={handlePersonalInfoChange}
          startContent={<LuMapPin className="text-lg sm:text-xl" />}
        />
        <InputField
          label="Website"
          name="website"
          value={personalInfo.website || ""}
          placeholder="https://example.com"
          onChange={handlePersonalInfoChange}
          startContent={<LuGlobe className="text-lg sm:text-xl" />}
        />
        <div className="sm:col-span-2 space-y-2 sm:space-y-3">
          <label className="text-sm sm:text-base font-semibold text-zinc-800">
            Professional Summary
          </label>
          <textarea
            name="summary"
            value={personalInfo.summary || ""}
            onChange={handlePersonalInfoChange}
            className="w-full p-3 border border-zinc-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none min-h-[120px] resize-y text-sm sm:text-base"
            placeholder="Write a compelling summary about yourself..."
          />
        </div>
      </div>
    </section>
  );
};
const EducationForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { education = [] } = resumeData;

  const addEducation = () => {
    updateResumeData("education", [
      ...education,
      { id: crypto.randomUUID(), institution: "", degree: "", duration: "" },
    ]);
  };

  const removeEducation = (id) => {
    updateResumeData(
      "education",
      education.filter((edu) => edu.id !== id)
    );
  };

  const handleEducationFieldChange = (id, field, value) => {
    updateResumeData(
      "education",
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <section className="mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
        Education
      </h2>
      {education.map((edu) => (
        <div
          key={edu.id}
          className="mb-4 sm:mb-6 p-4 sm:p-6 pt-8 sm:pt-10 bg-white rounded-xl transition-shadow duration-300 relative border-2 border-zinc-300 shadow-md hover:shadow-lg"
        >
          <button
            className="text-red-500 hover:bg-red-100 text-lg sm:text-xl p-1 rounded-full absolute top-3 sm:top-4 right-3 sm:right-4"
            onClick={() => removeEducation(edu.id)}
          >
            <LuX />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputField
              label="Institution"
              name="institution"
              placeholder="e.g. Harvard University"
              value={edu.institution}
              onChange={(e) =>
                handleEducationFieldChange(
                  edu.id,
                  "institution",
                  e.target.value
                )
              }
              startContent={<LuBuilding className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Degree"
              name="degree"
              placeholder="e.g. Bachelor's in Computer Science"
              value={edu.degree}
              onChange={(e) =>
                handleEducationFieldChange(edu.id, "degree", e.target.value)
              }
              startContent={<LuGraduationCap className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Duration"
              name="duration"
              placeholder="e.g. 2018 - 2022"
              value={edu.duration}
              onChange={(e) =>
                handleEducationFieldChange(edu.id, "duration", e.target.value)
              }
              startContent={<LuCalendarDays className="text-lg sm:text-xl" />}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto text-sm sm:text-base"
      >
        <LuPlus className="text-lg sm:text-xl" />
        Add Education
      </button>
    </section>
  );
};

const WorkExperienceForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { workExperience = [] } = resumeData;

  const addWorkExperience = () => {
    updateResumeData("workExperience", [
      ...workExperience,
      {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        duration: "",
        description: "",
      },
    ]);
  };

  const removeWorkExperience = (id) => {
    updateResumeData(
      "workExperience",
      workExperience.filter((exp) => exp.id !== id)
    );
  };

  const handleWorkExperienceFieldChange = (id, field, value) => {
    updateResumeData(
      "workExperience",
      workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <section className="mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
        Work Experience
      </h2>
      {workExperience.map((exp) => (
        <div
          key={exp.id}
          className="mb-4 sm:mb-6 p-4 sm:p-6 pt-8 sm:pt-10 bg-white rounded-xl transition-shadow duration-300 relative border-2 border-zinc-300 shadow-md hover:shadow-lg"
        >
          <button
            className="text-red-500 hover:bg-red-100 text-lg sm:text-xl p-1 rounded-full absolute top-3 sm:top-4 right-3 sm:right-4"
            onClick={() => removeWorkExperience(exp.id)}
          >
            <LuX />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputField
              label="Company"
              name="company"
              placeholder="e.g. Google"
              value={exp.company}
              onChange={(e) =>
                handleWorkExperienceFieldChange(
                  exp.id,
                  "company",
                  e.target.value
                )
              }
              startContent={<LuBuilding className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Position"
              name="position"
              placeholder="e.g. Software Engineer"
              value={exp.position}
              onChange={(e) =>
                handleWorkExperienceFieldChange(
                  exp.id,
                  "position",
                  e.target.value
                )
              }
              startContent={<LuBriefcase className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Duration"
              name="duration"
              placeholder="e.g. 2018 - 2022"
              value={exp.duration}
              onChange={(e) =>
                handleWorkExperienceFieldChange(
                  exp.id,
                  "duration",
                  e.target.value
                )
              }
              startContent={<LuCalendarDays className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Description"
              name="description"
              placeholder="e.g. Developed and maintained"
              value={exp.description}
              onChange={(e) =>
                handleWorkExperienceFieldChange(
                  exp.id,
                  "description",
                  e.target.value
                )
              }
              startContent={<LuFileText className="text-lg sm:text-xl" />}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addWorkExperience}
        className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto text-sm sm:text-base"
      >
        <LuPlus className="text-lg sm:text-xl" />
        Add Work Experience
      </button>
    </section>
  );
};

const SkillsAndLanguagesForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { skills = [], languages = [] } = resumeData;

  const addSkill = () => {
    updateResumeData("skills", [...skills, ""]);
  };
  const addLanguage = () => {
    updateResumeData("languages", [...languages, ""]);
  };
  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateResumeData("skills", updatedSkills);
  };
  const removeLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    updateResumeData("languages", updatedLanguages);
  };

  return (
    <section className="mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
        Skills & Languages
      </h2>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="mb-2 relative">
                <InputField
                  name={`skill-${index}`}
                  value={skill}
                  onChange={(e) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = e.target.value;
                    updateResumeData("skills", updatedSkills);
                  }}
                  startContent={<FaTools className="text-lg sm:text-xl" />}
                />
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:bg-red-100 text-lg sm:text-xl p-1 rounded-full absolute top-1/2 -translate-y-1/2 right-3 sm:right-4"
                >
                  <LuX />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addSkill}
            className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto mt-4 sm:mt-6 text-sm sm:text-base"
          >
            <LuPlus className="text-lg sm:text-xl" />
            Add Skill
          </button>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Languages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="relative">
                <InputField
                  name={`Language-${index}`}
                  value={lang}
                  onChange={(e) => {
                    const updatedLanguages = [...languages];
                    updatedLanguages[index] = e.target.value;
                    updateResumeData("languages", updatedLanguages);
                  }}
                  startContent={<LuLanguages className="text-lg sm:text-xl" />}
                />
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-red-500 hover:bg-red-100 text-lg sm:text-xl p-1 rounded-full absolute top-1/2 -translate-y-1/2 right-3 sm:right-4"
                >
                  <LuX />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addLanguage}
            className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto mt-4 sm:mt-6 text-sm sm:text-base"
          >
            <LuPlus className="text-lg sm:text-xl" />
            Add Languages
          </button>
        </div>
      </div>
    </section>
  );
};

const ReferenceForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { references = [] } = resumeData;

  const addReference = () => {
    updateResumeData("references", [
      ...references,
      {
        id: crypto.randomUUID(),
        name: "",
        position: "",
        company: "",
        contact: "",
      },
    ]);
  };

  const removeReference = (id) => {
    updateResumeData(
      "references",
      references.filter((ref) => ref.id !== id)
    );
  };

  const handleReferenceFieldChange = (id, field, value) => {
    updateResumeData(
      "references",
      references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    );
  };

  return (
    <section className="mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
        References
      </h2>
      {references.map((ref) => (
        <div
          key={ref.id}
          className="mb-4 sm:mb-6 p-4 sm:p-6 pt-8 sm:pt-10 bg-white rounded-xl transition-shadow duration-300 relative border-2 border-zinc-300 shadow-md hover:shadow-lg"
        >
          <button
            className="text-red-500 hover:bg-red-100 text-lg sm:text-xl p-1 rounded-full absolute top-3 sm:top-4 right-3 sm:right-4"
            onClick={() => removeReference(ref.id)}
          >
            <LuX />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputField
              label="Name"
              name="name"
              placeholder="e.g. John Doe"
              value={ref.name}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "name", e.target.value)
              }
              startContent={<LuUser className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Position"
              name="position"
              placeholder="e.g. Senior Manager"
              value={ref.position}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "position", e.target.value)
              }
              startContent={<LuBriefcase className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Company"
              name="company"
              placeholder="e.g. Google"
              value={ref.company}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "company", e.target.value)
              }
              startContent={<LuBuilding className="text-lg sm:text-xl" />}
            />
            <InputField
              label="Contact"
              name="contact"
              placeholder="e.g. john.doe@example.com"
              value={ref.contact}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "contact", e.target.value)
              }
              startContent={<LuAtSign className="text-lg sm:text-xl" />}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addReference}
        className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto text-sm sm:text-base"
      >
        <LuPlus className="text-lg sm:text-xl" />
        Add Reference
      </button>
    </section>
  );
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState("forward");

  const nextStep = () => {
    setDirection("forward");
    setCurrentStep((step) => (step === Total_Steps ? step : step + 1));
  };

  const prevStep = () => {
    setDirection("backward");
    setCurrentStep((step) => (step === 1 ? step : step - 1));
  };

  const steps = [
    { name: "Personal Info", component: <PersonalInfoForm /> },
    { name: "Education", component: <EducationForm /> },
    { name: "Experience", component: <WorkExperienceForm /> },
    { name: "Skills", component: <SkillsAndLanguagesForm /> },
    { name: "References", component: <ReferenceForm /> },
  ];

  return (
    <div className="min-h-screen min-w-fit space-y-6 sm:space-y-8 mx-auto bg-white p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center transform transition-all duration-300 ease-out">
        Resumé Form
      </h1>

      {/* Progress Steps with Enhanced Transitions */}
      <div className="flex justify-center items-center gap-3 sm:gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`transform transition-all duration-500 ease-in-out flex flex-col items-center gap-1.5 sm:gap-2
                ${
                  currentStep === index + 1
                    ? "scale-110 translate-y-0 opacity-100"
                    : "scale-95 translate-y-1 opacity-50"
                }`}
            >
              <div
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-colors duration-500
                  ${
                    currentStep >= index + 1 ? "bg-indigo-600" : "bg-gray-300"
                  }`}
              />
              <span className="text-xs sm:text-sm font-medium hidden sm:block transition-colors duration-300">
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-[2px] mx-1.5 sm:mx-2 transition-all duration-500
                  ${
                    currentStep > index + 1
                      ? "bg-indigo-600 scale-x-100"
                      : "bg-gray-300 scale-x-75"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content with Slide Transitions */}
      <div className="relative overflow-hidden">
        <div
          key={currentStep}
          className="transition-all duration-500 ease-in-out"
          style={{
            animation: `${
              direction === "forward" ? "slideLeft" : "slideRight"
            } 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <style jsx>{`
            @keyframes slideLeft {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes slideRight {
              from {
                transform: translateX(-100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
          {steps[currentStep - 1].component}
        </div>
      </div>

      {/* Navigation Buttons with Enhanced Transitions */}
      <div className="flex justify-between text-xl sm:text-2xl">
        <button
          onClick={prevStep}
          className={`transform transition-all duration-300 ease-in-out p-2 size-10 sm:size-12 flex justify-center items-center rounded-full bg-red-500 text-white font-semibold 
            hover:scale-110 hover:shadow-lg hover:bg-red-600 active:scale-95 
            ${
              currentStep === 1
                ? "opacity-0 translate-x-full invisible"
                : "opacity-100 translate-x-0"
            }`}
        >
          <FaAngleRight className="transform rotate-180" />
        </button>
        <button
          onClick={nextStep}
          className={`transform transition-all duration-300 ease-in-out p-2 size-10 sm:size-12 flex justify-center items-center rounded-full bg-green-500 text-white font-semibold 
            hover:scale-110 hover:shadow-lg hover:bg-green-600 active:scale-95
            ${
              currentStep === steps.length
                ? "opacity-0 -translate-x-full invisible"
                : "opacity-100 translate-x-0"
            }`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
