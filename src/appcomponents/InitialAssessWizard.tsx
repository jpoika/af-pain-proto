import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import AccountContainer  from '../containers/Account';
import BodyMap  from '../containers/BodyMap';
import OverallPainLevel  from '../containers/OverallPainLevel';
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
  nextStep(idx: number): any;
  maxSteps: number
}

export interface State {
  finished: boolean;
}
export default class InitialAssessmentWizard extends React.Component<Props, State>{
  constructor(props){
    super(props)
    this.state = {
      finished: false
    };
  }

  startOver = () => {
    const {nextStep} = this.props;
    nextStep(0);
    this.setState({
    //  stepIndex: 0,
      finished: false
    });
  };

  handleNext = () => {
    const {stepIndex,nextStep,maxSteps} = this.props;
    nextStep(stepIndex + 1)
    this.setState({
     // stepIndex: stepIndex + 1,
      finished: stepIndex >= (maxSteps - 1),
    });
  };

  handlePrev = () => {
    const {stepIndex,nextStep} = this.props;
    if (stepIndex > 0) {
      nextStep(stepIndex - 1);
    }
  };

  renderStepActions = (step) => {
    const {stepIndex,maxSteps} = this.props;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === (maxSteps - 1) ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
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

    const {appBarTitle,page,title} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>
             <Stepper activeStep={this.props.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Account Setup</StepLabel>
                <StepContent>
                   <AccountContainer />
          
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Pain Map</StepLabel>
                <StepContent>
                 <BodyMap assessmentId={1} />
                 {this.renderStepActions(1)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Current Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel title={'Curren Pain Level'} assessmentId={1} categoryId={1} />
                 {this.renderStepActions(2)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Acceptable Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel title={'Acceptable Pain Level'} assessmentId={1} categoryId={2} />
                 {this.renderStepActions(3)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Tolerable Pain</StepLabel>
                <StepContent>
                 <OverallPainLevel title={'Tolerable Pain Level'} assessmentId={1} categoryId={3} />
                 {this.renderStepActions(4)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Medications</StepLabel>
                <StepContent>
                 <h2>Current Medications</h2>
                 {this.renderStepActions(5)}
                </StepContent>
              </Step>

             </Stepper>
        {this.props.stepIndex > 5 && (
          
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