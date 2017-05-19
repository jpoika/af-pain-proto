import * as React from "react"; 
import BodyPinMapShow  from '../../containers/BodyPinMapShow';
import {List, ListItem} from 'material-ui/List';
import {AssessmentInterface, statusHash, typeHash} from '../../res/data/assessments';
import {Formats,Validators} from '../../lib/helpers';
import {PainLevelInterface} from '../../res/data/pain';
import PainExplanationButton from '../../containers/PainExplanationButton';
import RaisedButton from 'material-ui/RaisedButton';

export interface Props{
  assessment: AssessmentInterface;
  overalPainRatings: {category: string, painLevel:PainLevelInterface}[];
  replaceContent(content: JSX.Element): void;
  restoreContent(): void;
  viewPortSmall: boolean;
  deleteAssessment(assessment: AssessmentInterface): void;
}

export interface State{

}

export default class AssessmentOverview extends React.Component<Props, State>{
  handleDateFormat = (epochMs) => {
    return Formats.msToDateTimeString(epochMs);
  }

  truncate = (text: string) => {
     const maxLen = 40;
     const {viewPortSmall} = this.props;
     if(viewPortSmall && text.length > maxLen){
         return text.substr(0,maxLen) + '...';
     }
     return text;
  }
  renderPainRatings = () => {
    const {overalPainRatings,restoreContent,replaceContent} = this.props;
    return overalPainRatings.map(rating => {
      const {painLevel} = rating;
      return <div>
                <h3>{rating.category}</h3>
                <span style={{fontSize: '2em',fontWeight: 'bolder',color: painLevel.color}}>{painLevel.title}</span> 
                &nbsp;&nbsp;<span style={{fontSize: '1.2em'}}>{this.truncate(painLevel.description)}</span>
                <PainExplanationButton top={6} restoreContent={restoreContent} replaceContent={replaceContent} />
              </div>;
    });
  }
  render(){
    const {assessment,deleteAssessment,viewPortSmall} = this.props;
    const statusDetails =  statusHash[assessment.status] || "Unknown";
    const completedOn = assessment.isComplete && Validators.isNumeric(assessment.completedOn) ? this.handleDateFormat(assessment.completedOn) : 'In Progress';
    const assessmentType = typeHash[assessment.type] || "Unknown";
    let regionStyles = {};

    if(!viewPortSmall){
      regionStyles['float'] = 'left';
    }
    let painMapFront = (<div style={regionStyles}>
                          <h3>Pain Map Front</h3>
                          <BodyPinMapShow gridSize={25} side='front' assessment={assessment}  />
                        </div>);

    let painMapBack = (<div style={regionStyles}>
                        <h3>Pain Map Back</h3>
                        <BodyPinMapShow gridSize={25} side='back' assessment={assessment}  />
                      </div>);



    let normalSummary =  (<div>
                            <h2>Pain Ratings</h2>
                            {this.renderPainRatings()}
                          </div>);

    let skippedSummary = (<div><h2>This Assessment was Skipped</h2></div>);

    let noChangeSummary = (<div><h2>No Change in Pain Levels</h2></div>);

    let startedSummary = (<div>
                              <h2>This Assessment is incomplete</h2>
                              {assessment.type === 'newpain' && <RaisedButton label="Delete" onTouchTap={() => deleteAssessment(assessment)} />}
                          </div>);


    return <div>
              <div style={regionStyles}>
                <h1>{assessmentType}</h1>
                <h3>Completed On: {completedOn}</h3>
                <h1>Summary</h1>
                {assessment.status == 0 && startedSummary}
                {assessment.status == 1 && normalSummary}
                {assessment.status == 2 && noChangeSummary}
                {assessment.status == 3 && skippedSummary}
              </div>
              {painMapFront}
              {painMapBack}
            </div>;
  }
}