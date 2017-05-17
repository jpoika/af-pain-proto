import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import AccountContainer  from '../containers/AccountEdit';
import BodyMap  from '../containers/BodyMap';
import OverallPainLevel  from '../containers/OverallPainLevel';
import MedicationsList  from '../containers/MedicationsList';
import {AssessmentInterface} from '../res/data/assessments';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export interface Props extends PageProps{
  stepIndex: number;
  nextStep(idx: number, assessmentId: number): any;
  maxSteps: number,
  assessment: AssessmentInterface;
}

export interface State {
  finished: boolean;
}
export default class AssessmentWizard extends React.Component<Props, State>{
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

  handleNext = () => {
    const {stepIndex,nextStep,maxSteps,assessment} = this.props;

    nextStep(stepIndex + 1, assessment.id)
    this.setState({
      finished: stepIndex >= (maxSteps - 1),
    });
  };

  handlePrev = () => {
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

    const {appBarTitle,page,title, maxSteps, assessment,replaceContent,restoreContent} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>
             <Stepper activeStep={this.props.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Account Setup</StepLabel>
                <StepContent>
                   <AccountContainer />
          
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Pain Map Front</StepLabel>
                <StepContent>
                 <BodyMap side='front' assessment={assessment} replaceContent={replaceContent} restoreContent={restoreContent}  />
                 {this.renderStepActions(1)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Pain Map Back</StepLabel>
                <StepContent>
                 <BodyMap side='back' assessment={assessment} replaceContent={replaceContent} restoreContent={restoreContent} />
                 {this.renderStepActions(2)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Current Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel replaceContent={replaceContent} restoreContent={restoreContent} actions={this.renderBackButton(3)} onComplete={this.handleNext} step={2} title={'Curren Pain Level'} assessmentId={assessment.id} categoryId={1} />
                 
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Tolerable Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel replaceContent={replaceContent} restoreContent={restoreContent} actions={this.renderBackButton(4)} checkPain={true} onComplete={this.handleNext} step={3} title={'Tolerable Pain Level'} assessmentId={assessment.id} categoryId={3} />
                 
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Medications</StepLabel>
                <StepContent>
                  <MedicationsList actions={this.renderBackButton(5)} onComplete={this.handleNext} />
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
          </BasicPage>;
  }
}