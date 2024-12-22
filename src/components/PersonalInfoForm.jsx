import { useResume } from "../context/ResumeContext";

const PersonalInfoForm = () => {
  const { resumeData, updateResumeData } = useResume();

  const handleChange = (e) => {
    updateResumeData("personalInfo", {
      ...resumeData.personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        name="name"
        value={resumeData.personalInfo.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      {/* Add other personal info fields */}
    </form>
  );
};

export default PersonalInfoForm;
