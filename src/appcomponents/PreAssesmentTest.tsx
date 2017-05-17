import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import RaisedButton from 'material-ui/RaisedButton';
import {AssessmentInterface} from '../res/data/assessments'
export interface Props{
  assessment: AssessmentInterface;
  skipAssessment(assessment: AssessmentInterface): void;
  noChangeAssessment(assessment: AssessmentInterface): void;
  onComplete(): void;
  lastStepIndex: number;
}
export interface State{

}
export default class PreAssessmentTest extends React.Component<Props, State>{
  handleOnComplete = (event) => {
    const {onComplete} = this.props;
    onComplete();
  }

  handleAssessmentChoice = (cb: (assessment: AssessmentInterface) => any) => {
    const {onComplete,assessment,lastStepIndex} = this.props;
    return (event) => {
      cb(assessment);
    }
  }
  
  render(){
    const {skipAssessment,noChangeAssessment,onComplete} = this.props;
    const question1 = <div>
                          <h3>Do you have any changes in your pain levels/locations to report?</h3>
                          <RaisedButton label="Yes" onTouchTap={this.handleOnComplete} />
                          &nbsp;&nbsp;
                          <RaisedButton label="No Changes." onTouchTap={this.handleAssessmentChoice(noChangeAssessment)} />
                          &nbsp;&nbsp;
                          <RaisedButton label="Skip this Assessment" onTouchTap={this.handleAssessmentChoice(skipAssessment)} />
                       </div>;

    return <div style={{padding: '5px'}}>
              <h1>How's it going?</h1>
              {question1}
           </div>
  }
}