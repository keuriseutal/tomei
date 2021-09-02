import { useState } from 'react';
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container
} from '@material-ui/core';
import styles from '../styles/TomeiStepper.module.css';

import TomeiForm from './TomeiForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  buttonContainer: {
    width: "90%",
  }
}));

const getSteps = () => {
  return [
    'Create your account password',
    'Personal Information',
    'Employment Details',
    'Upload Documents',
    'Complete',
  ];
};

const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return (
        <TomeiForm
          title="Create Your Account"
          message="Because there will be documents that you need to prepare to apply for the loan, let's start
                  off by creating a password so that you can login to your account once you have these documents ready."
        />
      );
    case 1: 
      return (
        <TomeiForm
          title="Personal Information"
          message=""
        />
      );
    case 2: 
      return (
        <TomeiForm
          title="Employment Details"
          message=""
        />
      );
    case 3: 
      return (
        <TomeiForm
          title="Upload Documents"
          message=""
        />
      );
    case 4: 
      return (
        <TomeiForm
          title="Summary"
          message=""
        />
      );
    default:
      return (
        <TomeiForm
          title="Title not Found"
          message=""
        />
      );
  }
};

const TomeiStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());

  const steps = getSteps();

  const handleNext = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    const newCompleted = new Set(completed);
    newCompleted.delete(activeStep);
    setCompleted(newCompleted);

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setCompleted(new Set());
    setActiveStep(0);
  };
  
  const handleIconStyle = (index) => {
    if(completed.has(index) && index === activeStep)
      return styles.stepperActiveCompletedIcon;
    else if(completed.has(index))
      return styles.stepperCompletedIcon;
    else if(index === activeStep)
      return styles.stepperActiveIcon;
    else
      return styles.stepperIcon;
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} className={styles.stepperLine}>
            <StepLabel className={handleIconStyle(index)}>
              <div
                className={
                  index === activeStep
                    ? styles.stepperActiveLabel
                    : styles.stepperLabel
                }
              >
                <span>{`STEP ${index + 1}:`}</span>
                <br />
                <span>{label}</span>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} style={{textAlign: "center"}}>
              All steps completed
            </Typography>
            <Container maxWidth="md" className={`${classes.buttonContainer} pt-6`}>
              <button
              onClick={handleReset}
              className={`button is-light is-active is-pulled-right mr-3 
                        ${styles.backButton}`}
              >
                <span>Reset</span>
              </button>
            </Container>
          </div>
        ) : (
          <div>
            <Container maxWidth="md" className="pt-6">
              {getStepContent(activeStep)}
            </Container>
            <Container maxWidth="md" className={`${classes.buttonContainer} pt-6`}>
              <button
                onClick={handleNext}
                className={`button is-info is-active is-pulled-right mr-6 ${styles.saveButton}`}
                >
                <span>{activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}</span>
                {activeStep < steps.length - 1 && 
                <span className="icon is-small">
                  <i className="fas fa-arrow-right"></i>
                </span>}
              </button>
              <button
              onClick={handleBack}
              className={`button is-light is-active is-pulled-right mr-3 
                        ${styles.backButton}
                        ${activeStep === 0 && styles.hide}`}
              >
                <span>Back</span>
              </button>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default TomeiStepper;
