import * as React from "react";
import {Props as PageProps} from '../../components/BasicPage';
import BodyMapsCombined  from '../bodymap/BodyMapsCombined';
import OverallPainLevel  from '../../containers/pain/OverallPainLevel';
import MedicationsList  from '../../containers/medication/MedicationsList';
import PreAssesmentTest  from '../../containers/assessment/PreAssesmentTest';
import BodyPinMapShow  from '../../containers/bodymap/BodyPinMapShow';
import AssessmentOverview  from '../../containers/assessment/AssessmentOverview';
import SeverePainPrompt from '../../containers/pain/SeverePainPrompt';
import PromptResponse from '../pain/PromptResponse';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done';


import {AssessmentInterface} from '../../res/data/assessments';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';



export interface Props extends PageProps{
  stepIndex: number;
  nextStep(idx: number, assessment: AssessmentInterface): any;
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
    nextStep(0,assessment);
    this.setState({

      finished: false
    });
  };

  handleNext = () => {
  
    const {stepIndex,nextStep,maxSteps,assessment} = this.props;
    
    nextStep(stepIndex + 1, assessment)
    this.setState({
      finished: stepIndex >= (maxSteps - 1),
    });
  };

  handlePrev = () => {
    
    const {stepIndex,nextStep,assessment} = this.props;
    if (stepIndex > 0) {
      nextStep(stepIndex - 1, assessment);
    }
  };

  renderBackButton = (step) => {
    const {stepIndex} = this.props;
     return <RaisedButton
              label="Back"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev}
            />;
  }

  renderStepActions = (step, backOnly=false) => {
    const {stepIndex,maxSteps} = this.props;

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
          <RaisedButton
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

    const {replaceContent, restoreContent, maxSteps, assessment} = this.props;

    return (<div>
      
             <SeverePainPrompt assessment={assessment}>
                  <PromptResponse responseId='nurse-alert'>
                    <CircularProgress /> Alerting Nurse
                  </PromptResponse>
                  <PromptResponse responseId='nurse-alert-done'>
                    <DoneIcon /> Nurse on their way
                  </PromptResponse>
             </SeverePainPrompt>

             <Stepper activeStep={this.props.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Checking In</StepLabel>
                <StepContent>
                  <PreAssesmentTest assessment={assessment} lastStepIndex={maxSteps} onComplete={this.handleNext} />
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Pain Map</StepLabel>
                <StepContent>
                 <BodyMapsCombined  replaceContent={replaceContent} restoreContent={restoreContent}  assessment={assessment} />
                 {this.renderStepActions(1)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Current Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel selectorType={'dropdown'} replaceContent={replaceContent} restoreContent={restoreContent} actions={this.renderBackButton(2)} onComplete={this.handleNext} step={2} title={'Current Pain Level'} assessment={assessment} categoryId={2}>
                     <div>Current Pain Locations (For Reference)</div>
                     <div style={{float: 'left',width: 135}}>
                       <BodyPinMapShow gridSize={9} side='front' assessment={assessment}  />
                     </div>
                     <div style={{float: 'left',width: 135}}>
                       <BodyPinMapShow gridSize={9} side='back' assessment={assessment}  />
                     </div>
                 </OverallPainLevel>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Tolerable Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel selectorType={'dropdown'} replaceContent={replaceContent} restoreContent={restoreContent} actions={this.renderBackButton(3)} checkPain={true} onComplete={this.handleNext} step={3} title={'Tolerable Pain Level'} assessment={assessment} categoryId={3} />
                 
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Medications</StepLabel>
                <StepContent>
                  <div style={{paddingBottom: 3}}>
                    <MedicationsList actions={this.renderBackButton(4)} onComplete={this.handleNext} />
                  </div>
                </StepContent>
              </Step>
              <Step>
                  <StepLabel>Overview</StepLabel>
                  <StepContent>
                  <h2>Is the information below accurate?</h2>
                  {this.renderStepActions(5)}
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