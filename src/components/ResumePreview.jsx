import { useResume } from "../context/ResumeContext";
import {
  HiUser,
  HiBriefcase,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiGlobeAlt,
  HiAcademicCap,
  HiLightningBolt,
  HiChevronRight,
  HiTranslate,
  HiUsers,
} from "react-icons/hi";

import { forwardRef, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FiDownloadCloud } from "react-icons/fi";

const ResumePreview = ({ variant = "minimal" }) => {
  const { resumeData } = useResume();
  const {
    personalInfo,
    education,
    skills,
    languages,
    workExperience,
    references,
  } = resumeData;

  const componentRef = useRef();

  const downloadPDF = async () => {
    const element = componentRef.current;

    // Enhanced quality settings
    const options = {
      scale: 4, // Increased scale for sharper output
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      width: element.offsetWidth,
      height: element.offsetHeight,
      backgroundColor: "#ffffff",
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        // Force load all images and icons
        clonedDoc.querySelectorAll("img, svg").forEach((img) => {
          img.style.display = "block";
          img.style.width = img.width + "px";
          img.style.height = img.height + "px";
        });
      },
    };

    try {
      const canvas = await html2canvas(element, options);
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const imgX = (pageWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "JPEG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const timestamp = new Date()
        .toISOString()
        .slice(0, -5)
        .replace(/[:]/g, "-");
      pdf.save(`resume_${timestamp}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const ModernLayout = forwardRef((_, componentRef) => {
    ModernLayout.displayName = "ModernLayout";
    const { resumeData } = useResume();
    const {
      personalInfo,
      education,
      skills,
      languages,
      workExperience,
      references,
    } = resumeData;

    return (
      <div
        ref={componentRef}
        id="resume"
        className="bg-gradient-to-br from-blue-50 to-indigo-50 font-poppins p-8"
      >
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-3">
            {/* Left Panel */}
            <div className="col-span-1 bg-gradient-to-br from-[#2A3042] to-[#1E293B] text-white p-8">
              <div className="sticky top-0 space-y-6">
                {/* Profile Image & Name */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white/20 overflow-hidden">
                    <img
                      src={
                        personalInfo?.image || "https://via.placeholder.com/150"
                      }
                      alt={personalInfo?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-2xl font-bold tracking-wide">
                    {personalInfo?.name}
                  </h1>
                  <p className="text-blue-300 mt-1">{personalInfo?.jobTitle}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b border-white/20 pb-2">
                    Contact
                  </h2>
                  <div className="space-y-3">
                    {personalInfo?.phone && (
                      <div className="flex items-center space-x-3 group">
                        <HiPhone className="text-blue-300 group-hover:text-blue-200 transition-colors" />
                        <span className="text-sm">{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo?.email && (
                      <div className="flex items-center space-x-3 group">
                        <HiMail className="text-blue-300 group-hover:text-blue-200 transition-colors" />
                        <span className="text-sm">{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo?.location && (
                      <div className="flex items-center space-x-3 group">
                        <HiLocationMarker className="text-blue-300 group-hover:text-blue-200 transition-colors" />
                        <span className="text-sm">{personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Languages */}
                {languages?.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b border-white/20 pb-2">
                      Languages
                    </h2>
                    <div className="space-y-2">
                      {languages.map((lang, index) => (
                        <div key={index} className="text-sm">
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b border-white/20 pb-2">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel */}
            <div className="col-span-2 p-8 space-y-8">
              {/* Summary */}
              <div>
                <h2 className="text-xl font-bold text-[#2A3042] mb-4">
                  Professional Summary
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {personalInfo?.summary}
                </p>
              </div>

              {/* Experience */}
              {workExperience?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#2A3042] mb-6">
                    Work Experience
                  </h2>
                  <div className="space-y-6">
                    {workExperience.map((exp, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-[#2A3042] transition-colors">
                              {exp.position}
                            </h3>
                            <p className="text-blue-600">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#2A3042] mb-6">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="group">
                        <h3 className="font-semibold text-gray-800 group-hover:text-[#2A3042] transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-blue-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References */}
              {references?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#2A3042] mb-6">
                    References
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {references.map((ref) => (
                      <div key={ref.id} className="p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800">
                          {ref.name}
                        </h3>
                        <p className="text-blue-600">{ref.position}</p>
                        <p className="text-gray-600">{ref.company}</p>
                        <p className="text-gray-500 mt-2">{ref.contact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const MinimalLayout = forwardRef((_, componentRef) => {
    MinimalLayout.displayName = "MinimalLayout";
    const { resumeData } = useResume();
    const { personalInfo, education, skills, workExperience, references } =
      resumeData;
    return (
      <div
        ref={componentRef}
        className="max-w-4xl mx-auto p-12 bg-white min-h-screen font-raleway "
        id="resume"
      >
        {/* Header */}
        <header className="mb-10 border-b-2 border-zinc-700 pb-6 flex gap-16 justify-between">
          <div>
            <h1 className="mb-2 text-4xl uppercase tracking-wide font-raleway font-semibold text-zinc-800">
              {personalInfo.name}
            </h1>
            <p className="text-lg text-gray-600">{personalInfo.jobTitle}</p>
          </div>

          <ul className="space-y-2 text-sm text-gray-600 flex flex-col items-end">
            {personalInfo.location && (
              <li className="flex items-center gap-2">
                {personalInfo.location}
                <HiLocationMarker className="size-5 p-1 bg-zinc-600 text-white rounded-full" />
              </li>
            )}
            {personalInfo.phone && (
              <li className="flex items-center gap-2">
                {personalInfo.phone}
                <HiPhone className="size-5 p-1 bg-zinc-600 text-white rounded-full" />
              </li>
            )}
            {personalInfo.email && (
              <li className="flex items-center gap-2">
                {personalInfo.email}
                <HiMail className="size-5 p-1 bg-zinc-600 text-white rounded-full" />
              </li>
            )}
            {personalInfo.website && (
              <li className="flex items-center gap-2">
                {personalInfo.website}
                <HiGlobeAlt className="size-5 p-1 bg-zinc-600 text-white rounded-full" />
              </li>
            )}
          </ul>
        </header>

        <div className="grid grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="col-span-1 space-y-8 border-r-2 border-zinc-400 pr-4">
            {/* Education Section */}
            <section>
              <h2 className="font-semibold text-zinc-800 mb-4 uppercase tracking-wider font-raleway">
                Education
              </h2>
              <ul className="space-y-4">
                {education.map((edu, index) => (
                  <li key={index} className="text-sm">
                    <p className="font-semibold text-gray-800">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 font-medium">{edu.degree}</p>
                    <p className="text-gray-500">{edu.duration}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills Section */}
            <section>
              <h2 className="font-semibold text-gray-800 mb-4 uppercase tracking-wider font-raleway">
                Skills
              </h2>
              <ul className="space-y-4 text-sm text-gray-600">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="font-semibold text-gray-800 mb-4 uppercase tracking-wider font-raleway">
                  Languages
                </h2>
                <ul className="space-y-4 text-sm text-gray-600">
                  {languages.map((lang, index) => (
                    <li key={index}>
                      <span className="font-medium">{lang}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            {/* Summary Section */}
            <section className="-ml-4 pb-4 border-b-2 border-zinc-400">
              <h2 className="font-semibold text-gray-800 mb-4 uppercase tracking-wider font-raleway">
                Profile
              </h2>
              <p className="text-gray-600 leading-normal text-pretty">
                {personalInfo.summary}
              </p>
            </section>

            {/* Experience Section */}
            <section>
              <h2 className="font-semibold text-gray-800 mb-4 uppercase tracking-wider font-raleway">
                Work Experience
              </h2>
              <ul className="space-y-6">
                {workExperience.map((exp, index) => (
                  <li key={index} className="text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-gray-800">
                        {exp.position}
                      </p>
                      <p>{exp.duration}</p>
                    </div>
                    <p className="text-gray-600 mb-2">{exp.company}</p>
                    <p className="text-gray-600">{exp.description}</p>
                    <p className="text-gray-600">{exp.responsibilities}</p>
                  </li>
                ))}
              </ul>
            </section>
            {/* References Section */}
            {references.length > 0 && (
              <section>
                <h2 className="font-semibold text-gray-800 mb-4 uppercase tracking-wider font-raleway">
                  References
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div
                      key={ref.id}
                      className="text-sm border-l-2 border-zinc-400 pl-4"
                    >
                      <p className="font-semibold text-gray-800">{ref.name}</p>
                      <p className="text-gray-600">{ref.position}</p>
                      <p className="text-gray-500">{ref.company}</p>
                      <p className="text-gray-500">{ref.contact}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
        {/* Add clean lines and subtle animations */}
        <div className="border-l-4 border-zinc-800 pl-4 hover:border-zinc-600 transition-colors">
          {/* Add understated hover states */}
          <div className="group">
            <h2 className="group-hover:text-zinc-600 transition-colors">
              {/* Content with increased spacing */}
            </h2>
          </div>
        </div>
      </div>
    );
  });
  const ClassicLayout = forwardRef((_, componentRef) => {
    ClassicLayout.displayName = "ClassicLayout";
    const { resumeData } = useResume();
    const {
      personalInfo,
      education,
      workExperience,
      skills,
      languages,
      references,
    } = resumeData;

    return (
      <div ref={componentRef} className="bg-gray-100 py-10" id="resume">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-gray-200">
            <div>
              <img
                src={personalInfo?.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-36 h-36 rounded-md border-2 border-gray-300 mx-auto object-cover"
              />
            </div>
            <div className="col-span-2 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800">
                {personalInfo?.name}
              </h1>
              <h2 className="text-lg text-gray-600 flex items-center gap-2">
                <HiBriefcase className="text-gray-500" />
                {personalInfo?.jobTitle}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 px-6 py-8">
            <div className="space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiMail className="text-gray-600" />
                  Contact
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {personalInfo?.contact && (
                    <li className="flex items-center gap-2">
                      <HiPhone className="text-gray-500" />
                      {personalInfo.contact}
                    </li>
                  )}
                  {personalInfo?.email && (
                    <li className="flex items-center gap-2">
                      <HiMail className="text-gray-500" />
                      {personalInfo.email}
                    </li>
                  )}
                  {personalInfo?.location && (
                    <li className="flex items-center gap-2">
                      <HiLocationMarker className="text-gray-500" />
                      {personalInfo.location}
                    </li>
                  )}
                  {personalInfo?.website && (
                    <li className="flex items-center gap-2">
                      <HiGlobeAlt className="text-gray-500" />
                      {personalInfo.website}
                    </li>
                  )}
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiAcademicCap className="text-gray-600" />
                  Education
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {education?.map((edu) => (
                    <li key={edu.id} className="flex items-start gap-2">
                      <HiChevronRight className="text-gray-500 mt-1" />
                      <div>
                        <div className="font-medium">{edu.degree}</div>
                        <div>{edu.institution}</div>
                        <div className="text-sm text-gray-500">
                          {edu.duration}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiLightningBolt className="text-gray-600" />
                  Skills
                </h3>
                <ul className="space-y-1 text-gray-600">
                  {skills?.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <HiChevronRight className="text-gray-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiTranslate className="text-gray-600" />
                  Languages
                </h3>
                <ul className="space-y-1 text-gray-600">
                  {languages?.map((language, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <HiChevronRight className="text-gray-500" />
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-2 space-y-6">
              {/* Profile */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiUser className="text-gray-600" />
                  Profile
                </h3>
                <p className="text-gray-600">{personalInfo?.summary}</p>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiBriefcase className="text-gray-600" />
                  Work Experience
                </h3>
                <ul className="space-y-4">
                  {workExperience?.map((exp) => (
                    <li key={exp.id}>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-800">
                          {exp.company}
                        </span>
                        <span className="text-gray-600">{exp.duration}</span>
                      </div>
                      <div className="text-gray-700 mt-1">{exp.position}</div>
                      <p className="text-gray-600 mt-2">{exp.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* References */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiUsers className="text-gray-600" />
                  References
                </h3>
                <ul className="space-y-4 text-gray-600">
                  {references?.map((ref) => (
                    <li key={ref.id}>
                      <span className="font-medium">{ref.name}</span>,{" "}
                      {ref.company} / {ref.position}
                      <br />
                      <span className="font-medium">Contact:</span>{" "}
                      {ref.contact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const CreativeLayout = forwardRef((_, componentRef) => {
    CreativeLayout.displayName = "CreativeLayout";
    const { resumeData } = useResume();
    const { personalInfo, education, workExperience, skills, references } =
      resumeData;

    return (
      <div
        ref={componentRef}
        className="bg-gray-100 flex justify-center items-center min-h-screen font-montserrat"
        id="resume"
      >
        <div className="bg-white w-full max-w-4xl grid grid-cols-3 gap-6 p-8 rounded-lg shadow-lg">
          {/* Header */}
          <div className="col-span-3 flex justify-between items-center border-b-2 border-yellow-600 pb-4">
            <div>
              <h1 className="text-4xl font-bold uppercase text-gray-800">
                {personalInfo?.name || "Your Name"}
              </h1>
              <h2 className="text-lg text-gray-600 font-medium">
                {personalInfo?.jobTitle || "Your Title"}
              </h2>
            </div>
            <div>
              <img
                src={personalInfo?.image || "https://via.placeholder.com/120"}
                alt="Profile Photo"
                className="w-28 h-28 object-cover rounded-full border-4 border-yellow-600"
              />
            </div>
          </div>

          {/* Profile Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Profile</h3>
            <p className="text-gray-600 leading-relaxed">
              {personalInfo?.summary}
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 border-l-2 border-yellow-600 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-4">
              {personalInfo?.contact && (
                <li className="flex items-center">
                  <HiPhone className="w-6 h-6 text-yellow-600 mr-3" />
                  {personalInfo.contact}
                </li>
              )}
              {personalInfo?.email && (
                <li className="flex items-center">
                  <HiMail className="w-6 h-6 text-yellow-600 mr-3" />
                  {personalInfo.email}
                </li>
              )}
              {personalInfo?.location && (
                <li className="flex items-center">
                  <HiLocationMarker className="w-6 h-6 text-yellow-600 mr-3" />
                  {personalInfo.location}
                </li>
              )}
            </ul>
          </div>

          {/* Experience Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Experience</h3>
            <ul className="space-y-4">
              {workExperience?.map((exp) => (
                <li key={exp.id}>
                  <div className="font-bold text-gray-800">
                    {exp.position} / {exp.company} {exp.duration}
                  </div>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Education Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Education</h3>
            <ul className="space-y-2">
              {education?.map((edu) => (
                <li key={edu.id} className="text-gray-600">
                  {edu.institution} {edu.duration} {edu.degree}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Skills</h3>
            <ul className="list-disc list-inside text-gray-600">
              {skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* References Section */}
          <div className="col-span-3 border-t-2 border-yellow-600 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">References</h3>
            <div className="grid grid-cols-2 gap-6">
              {references?.map((ref) => (
                <div key={ref.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-bold text-gray-800">{ref.name}</div>
                  <div className="text-yellow-600">{ref.position}</div>
                  <div className="text-gray-600">{ref.company}</div>
                  <div className="text-gray-600 mt-2">{ref.contact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  });
  const SimpleLayout = forwardRef((_, componentRef) => {
    SimpleLayout.displayName = "SimpleLayout";
    const { resumeData } = useResume();
    const { personalInfo, education, workExperience, skills, references } =
      resumeData;

    return (
      <div
        ref={componentRef}
        className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex justify-center py-10 px-4"
        id="resume"
      >
        <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-xl">
          {/* Header with gradient border */}
          <div className="flex flex-col items-center pb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-1 after:bg-gradient-to-r after:from-transparent after:via-yellow-500 after:to-transparent">
            <div className="flex justify-center items-center w-28 h-28 border-4 border-yellow-500 rounded-full overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg">
              {personalInfo?.image ? (
                <img
                  src={personalInfo.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-serif text-yellow-600">
                  {personalInfo?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toLowerCase() || "cv"}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold mt-6 text-gray-800 tracking-wide">
              {personalInfo?.name}
            </h1>
            <h2 className="text-lg text-gray-600 mt-2 font-medium tracking-wider">
              {personalInfo?.jobTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiUser className="text-yellow-500" /> Profile
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {personalInfo?.summary}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiBriefcase className="text-yellow-500" /> Experience
                </h3>
                <div className="space-y-6">
                  {workExperience?.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-4 border-l-2 border-yellow-200 hover:border-yellow-500 transition-colors duration-300"
                    >
                      <h4 className="font-bold text-gray-800">
                        {exp.position}
                      </h4>
                      <p className="text-yellow-600 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 text-sm">{exp.duration}</p>
                      <p className="text-gray-600 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiMail className="text-yellow-500" /> Contact
                </h3>
                <ul className="space-y-3">
                  {personalInfo?.contact && (
                    <li className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                      <HiPhone className="text-yellow-500" />
                      {personalInfo.contact}
                    </li>
                  )}
                  {personalInfo?.email && (
                    <li className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                      <HiMail className="text-yellow-500" />
                      {personalInfo.email}
                    </li>
                  )}
                  {personalInfo?.location && (
                    <li className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                      <HiLocationMarker className="text-yellow-500" />
                      {personalInfo.location}
                    </li>
                  )}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiAcademicCap className="text-yellow-500" /> Education
                </h3>
                <ul className="space-y-4">
                  {education?.map((edu) => (
                    <li key={edu.id} className="group">
                      <p className="font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                        {edu.degree}
                      </p>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.duration}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiLightningBolt className="text-yellow-500" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm hover:bg-yellow-100 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  });

  let ResumeLayout = null;
  switch (variant) {
    case "modern":
      ResumeLayout = <ModernLayout ref={componentRef} />;
      break;
    case "minimal":
      ResumeLayout = <MinimalLayout ref={componentRef} />;
      break;
    case "classic":
      ResumeLayout = <ClassicLayout ref={componentRef} />;
      break;
    case "creative":
      ResumeLayout = <CreativeLayout ref={componentRef} />;
      break;
    case "simple":
      ResumeLayout = <SimpleLayout ref={componentRef} />;
      break;
    default:
      ResumeLayout = <MinimalLayout ref={componentRef} />;
  }

  return (
    <>
      <div className="space-y-8 w-full">
        {ResumeLayout}
        <button
          className="mx-auto flex items-center gap-2 font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-max text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          onClick={downloadPDF}
        >
          <FiDownloadCloud className="size-5" />
          <span>Download</span>
        </button>{" "}
      </div>
    </>
  );
};

export default ResumePreview;
