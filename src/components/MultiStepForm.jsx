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
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Personal Information
      </h2>
      <div className="flex items-end gap-6 mb-6">
        <div className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            value={personalInfo.name || ""}
            onChange={handlePersonalInfoChange}
            startContent={<LuUser />}
          />
          <InputField
            label="Job Title"
            name="jobTitle"
            value={personalInfo.jobTitle || ""}
            onChange={handlePersonalInfoChange}
            startContent={<LuBriefcaseBusiness />}
          />
        </div>
        <div className="relative border inline-block mx-auto max-w-fit group">
          <img
            src={personalInfo.image || "https://via.placeholder.com/128"}
            alt={`${personalInfo.name || "Profile"}'s Image"`}
            className="size-32 object-cover object-top rounded-xl"
          />
          <label
            htmlFor="profile-img"
            className="absolute top-0 left-0 h-full w-full cursor-pointer flex items-center justify-center bg-gray-900/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <LuUpload className="mr-2 text-3xl text-gray-50" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Email"
          name="email"
          value={personalInfo.email || ""}
          onChange={handlePersonalInfoChange}
          startContent={<LuAtSign />}
        />
        <InputField
          label="Contact Number"
          name="contact"
          value={personalInfo.contact || ""}
          onChange={handlePersonalInfoChange}
          startContent={<LuPhone />}
        />
        <InputField
          label="Location"
          name="location"
          value={personalInfo.location || ""}
          onChange={handlePersonalInfoChange}
          startContent={<LuMapPin />}
        />
        <InputField
          label="Website"
          name="website"
          value={personalInfo.website || ""}
          placeholder="https://example.com"
          onChange={handlePersonalInfoChange}
          startContent={<LuGlobe />}
        />
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-zinc-800 mb-2">
            Professional Summary
          </label>
          <textarea
            name="summary"
            value={personalInfo.summary || ""}
            onChange={handlePersonalInfoChange}
            className="w-full p-3 border border-zinc-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none min-h-[120px] resize-y "
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
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Education
      </h2>
      {education.map((edu) => (
        <div
          key={edu.id}
          className="mb-6 p-6 pt-10 bg-white rounded-xl transition-shadow duration-300 relative border-2 border-zinc-300 shadow-md hover:shadow-lg"
        >
          <button
            className="text-red-500 hover:bg-red-100 text-xl p-1 rounded-full absolute top-4 right-4"
            onClick={() => removeEducation(edu.id)}
          >
            <LuX />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              startContent={<LuBuilding />}
            />
            <InputField
              label="Degree"
              name="degree"
              placeholder="e.g. Bachelor's in Computer Science"
              value={edu.degree}
              onChange={(e) =>
                handleEducationFieldChange(edu.id, "degree", e.target.value)
              }
              startContent={<LuGraduationCap />}
            />
            <InputField
              label="Duration"
              name="duration"
              placeholder="e.g. 2018 - 2022"
              value={edu.duration}
              onChange={(e) =>
                handleEducationFieldChange(edu.id, "duration", e.target.value)
              }
              startContent={<LuCalendarDays />}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto"
      >
        <LuPlus />
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
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Work Experience
      </h2>
      {workExperience.map((exp) => (
        <div
          key={exp.id}
          className="mb-6 p-6 pt-10 bg-white rounded-xl transition-shadow duration-300 relative border-2 border-zinc-300 shadow-md hover:shadow-lg"
        >
          <button
            className="text-red-500 hover:bg-red-100 text-xl p-1 rounded-full absolute top-4 right-4"
            onClick={() => removeWorkExperience(exp.id)}
          >
            <LuX />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              startContent={<LuBuilding />}
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
              startContent={<LuBriefcase />}
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
              startContent={<LuCalendarDays />}
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
              startContent={<LuFileText />}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addWorkExperience}
        className="flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto"
      >
        <LuPlus />
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
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Skills & Languages
      </h2>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                startContent={<FaTools />}
              />
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:bg-red-100 text-xl p-1 rounded-full absolute top-1/2 -translate-y-1/2 right-4"
              >
                <LuX />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addSkill}
          className="flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto"
        >
          <LuPlus />
          Add Skill
        </button>
      </div>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">Languages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                startContent={<LuLanguages />}
              />
              <button
                onClick={() => removeLanguage(index)}
                className="text-red-500 hover:bg-red-100 text-xl p-1 rounded-full absolute top-1/2 -translate-y-1/2 right-4"
              >
                <LuX />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addLanguage}
          className="flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto"
        >
          <LuPlus />
          Add Langauges
        </button>
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
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        References
      </h2>
      {references.map((ref) => (
        <div
          key={ref.id}
          className="mb-6 p-6 pt-10 bg-white rounded-xl transition-shadow duration-300 relative border-2 border-zinc-300 shadow-md hover:shadow-lg"
        >
          <button
            className="text-red-500 hover:bg-red-100 text-xl p-1 rounded-full absolute top-4 right-4"
            onClick={() => removeReference(ref.id)}
          >
            <LuX />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Name"
              name="name"
              placeholder="e.g. John Doe"
              value={ref.name}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "name", e.target.value)
              }
              startContent={<LuUser />}
            />
            <InputField
              label="Position"
              name="position"
              placeholder="e.g. Senior Manager"
              value={ref.position}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "position", e.target.value)
              }
              startContent={<LuBriefcase />}
            />
            <InputField
              label="Company"
              name="company"
              placeholder="e.g. Google"
              value={ref.company}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "company", e.target.value)
              }
              startContent={<LuBuilding />}
            />
            <InputField
              label="Contact"
              name="contact"
              placeholder="e.g. john.doe@example.com"
              value={ref.contact}
              onChange={(e) =>
                handleReferenceFieldChange(ref.id, "contact", e.target.value)
              }
              startContent={<LuAtSign />}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addReference}
        className="flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md gap-2 mx-auto"
      >
        <LuPlus />
        Add Reference
      </button>
    </section>
  );
};
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('forward');

  const nextStep = () => {
    setDirection('forward');
    setCurrentStep((step) => (step === Total_Steps ? step : step + 1));
  };

  const prevStep = () => {
    setDirection('backward');
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
    <div className="min-h-screen min-w-fit space-y-8 mx-auto bg-white p-10 rounded-3xl shadow-lg">
      <h1 className="text-center text-4xl font-semibold">Resumé Form</h1>

      {/* Progress Steps */}
      <div className="flex justify-center items-center gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`transition-all duration-300 flex flex-col items-center gap-2
                ${currentStep === index + 1 ? 'scale-110' : 'opacity-50'}`}
            >
              <div className={`h-3 w-3 rounded-full ${currentStep >= index + 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium">{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-[2px] mx-2 ${currentStep > index + 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content with Transitions */}
      <div className="relative overflow-hidden">
        <div
          key={currentStep}
          className="transition-all duration-500"
          style={{
            animation: `${direction === 'forward' ? 'slideLeft' : 'slideRight'} 0.5s ease-out`
          }}
        >
          <style>
            {`
              @keyframes slideLeft {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              @keyframes slideRight {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            `}
          </style>
          {steps[currentStep - 1].component}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between text-2xl">
        <button
          onClick={prevStep}
          className={`p-2 size-12 flex justify-center items-center rounded-full bg-red-500 text-white font-semibold 
            transition-all duration-300 hover:scale-105 hover:shadow-lg ${currentStep === 1 && "invisible"}`}
        >
          <FaAngleRight className="transform rotate-180" />
        </button>
        <button
          onClick={nextStep}
          className={`p-2 size-12 flex justify-center items-center rounded-full bg-green-500 text-white font-semibold 
            transition-all duration-300 hover:scale-105 hover:shadow-lg ${currentStep === steps.length && "invisible"}`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};export default MultiStepForm;
