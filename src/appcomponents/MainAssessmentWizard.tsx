import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import AccountContainer  from '../containers/pages/AccountEditPage';
import BodyMap  from '../containers/BodyMap';
import OverallPainLevel  from '../containers/OverallPainLevel';
import MedicationsList  from '../containers/MedicationsList';
import PreAssesmentTest  from '../containers/PreAssesmentTest';
import {AssessmentInterface} from '../res/data/assessments';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AssessmentOverview  from '../containers/AssessmentOverview';

export interface Props extends PageProps{
  stepIndex: number;
  nextStep(idx: number, assessmentId: number): any;
  maxSteps: number;
  assessment: AssessmentInterface;
  type: string; /* the type of assessment (newpain|reassessment) */
}

export interface State {
  finished: boolean;
}
export default class MainAssessmentWizard extends React.Component<Props, State>{
  constructor(props){
    super(props)
    this.state = {
      finished: false
    };
  }

  startOver = () => {
    const {nextStep,assessment} = this.props;
    nextStep(0,assessment.id);
    this.setState({

      finished: false
    });
  };

  handleNext = (event) => {
  
    event.preventDefault();
    event.stopPropagation();
    const {stepIndex,nextStep,maxSteps,assessment} = this.props;
    
    nextStep(stepIndex + 1, assessment.id)
    this.setState({
      finished: stepIndex >= (maxSteps - 1),
    });
  };

  handlePrev = (event) => {
    
    event.preventDefault();
    event.stopPropagation();
    const {stepIndex,nextStep,assessment} = this.props;
    if (stepIndex > 0) {
      nextStep(stepIndex - 1, assessment.id);
    }
  };

  renderBackButton = (step) => {
    const {stepIndex,maxSteps} = this.props;
     return <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev}
            />;
  }

  renderStepActions = (step, backOnly=false) => {
    const {stepIndex,maxSteps} = this.props;
    const backButton = this.renderBackButton(step);
    return (
      <div style={{margin: '12px 0'}}>

        {!backOnly && <RaisedButton
          label={stepIndex === (maxSteps - 1) ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          labelColor="#FFFFFF"
        />}
        {step > 0 && (
          <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev}
            />
        )}


      </div>
    );
  }

  render(){

    const {appBarTitle,replaceContent, restoreContent, page,title, maxSteps, assessment} = this.props;

    return (<div>
             <Stepper activeStep={this.props.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Checking In</StepLabel>
                <StepContent>
                  <PreAssesmentTest assessment={assessment} lastStepIndex={maxSteps} onComplete={this.handleNext} />
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Pain Map Front</StepLabel>
                <StepContent>
                 <BodyMap replaceContent={replaceContent} restoreContent={restoreContent} side='front' assessment={assessment} />
                 {this.renderStepActions(1)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Pain Map Back</StepLabel>
                <StepContent>
                 <BodyMap replaceContent={replaceContent} restoreContent={restoreContent} side='back' assessment={assessment} />
                 {this.renderStepActions(2)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Current Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel replaceContent={replaceContent} restoreContent={restoreContent} actions={this.renderBackButton(3)} onComplete={this.handleNext} step={3} title={'Current Pain Level'} assessment={assessment} categoryId={2} />
                 
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Tolerable Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel replaceContent={replaceContent} restoreContent={restoreContent} actions={this.renderBackButton(4)} checkPain={true} onComplete={this.handleNext} step={4} title={'Tolerable Pain Level'} assessment={assessment} categoryId={3} />
                 
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Medications</StepLabel>
                <StepContent>
                  <MedicationsList actions={this.renderBackButton(5)} onComplete={this.handleNext} />
                </StepContent>
              </Step>
              <Step>
                  <StepLabel>Overview</StepLabel>
                  <StepContent>
                  <h2>Is the information below accurate?</h2>
                  {this.renderStepActions(6)}
                  <br /><br />
                  <AssessmentOverview showStartSummary={false} assessment={assessment} />
                  
                  </StepContent>
              </Step>
             </Stepper>
        {this.props.stepIndex >= maxSteps && (
          
          <RaisedButton
                label="Start Over"
                disabled={this.props.stepIndex < 1}
                disableTouchRipple={true}
                disableFocusRipple={true}
                onTouchTap={this.startOver}
              />
        )}
          </div>);
  }
}