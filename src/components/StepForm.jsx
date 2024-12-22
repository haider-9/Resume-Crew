import { useState } from 'react';
import '../styles/steps.css';

function StepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { name: 'Personal', component: <PersonalInfo /> },
    { name: 'Address', component: <AddressInfo /> },
    { name: 'Review', component: <Review /> }
  ];

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="form-container">
      {/* Step Content */}
      <div className={`step-container ${currentStep === index ? 'active' : ''}`}>
        {steps[currentStep].component}
      </div>

      {/* Pagination */}
      <div className="step-pagination">
        {steps.map((step, index) => (
          <button
            key={step.name}
            className={`step-button ${currentStep === index ? 'active' : ''}`}
            onClick={() => goToStep(index)}
          >
            {step.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StepForm;
