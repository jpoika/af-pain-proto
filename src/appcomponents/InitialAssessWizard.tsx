import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import AccountContainer  from '../containers/Account';
import BodyMap, {Props as BodyMapProps}  from './BodyMap';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export interface Props extends PageProps, BodyMapProps{
  stepIndex: number;
}
export default class InitialAssessmentWizard extends React.Component<Props, any>{
  constructor(props){
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }

  startOver = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: 0,
      finished: false
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions = (step) => {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 5 ? 'Finish' : 'Next'}
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

    const {appBarTitle,page,title,selectPain} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>
             <Stepper activeStep={this.state.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Account Setup</StepLabel>
                <StepContent>
                   <AccountContainer />
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Pain Map</StepLabel>
                <StepContent>
                 <BodyMap selectPain={selectPain} />
                 {this.renderStepActions(1)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Current Pain Level</StepLabel>
                <StepContent>
                 <h2>Overall Current Pain Level</h2>
                 {this.renderStepActions(2)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Acceptable Pain</StepLabel>
                <StepContent>
                 <h2>Acceptable Pain Level</h2>
                 {this.renderStepActions(3)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Tolerable Pain</StepLabel>
                <StepContent>
                 <h2>Tolerable Pain Level</h2>
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
        {this.state.stepIndex > 5 && (
          
          <RaisedButton
                label="Start Over"
                disabled={this.state.stepIndex < 1}
                disableTouchRipple={true}
                disableFocusRipple={true}
                onTouchTap={this.startOver}
              />
        )}
          </BasicPage>;
  }
}