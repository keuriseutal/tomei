import { useState } from 'react';
import { makeStyles, 
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography } from '@material-ui/core';
import styles from '../styles/TomeiStepper.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }
}));

const getSteps = () => {
    return [
        'Create your account password', 
        'Personal Information', 
        'Employment Details',
        'Upload Documents',
        'Complete'
    ];
};

const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
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

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                <Step key={label} className={styles.stepperLine}>
                    <StepLabel className={completed.has(index) ? 
                                        styles.stepperFilledIcon :
                                        index === activeStep ?
                                        styles.stepperFilledIcon : 
                                        styles.stepperIcon}>
                        <div className={index === activeStep ? 
                                        styles.stepperActiveLabel :
                                        styles.stepperLabel}>
                            <span>{`STEP ${index + 1}:`}</span><br/>
                            <span>{label}</span>
                        </div>
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
            {/* <div>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
                ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </div>
                </div>
                )}
            </div> */}
        </div>
    )
}

export default TomeiStepper;
