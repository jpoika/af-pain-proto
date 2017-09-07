import * as React from "react"; 
import BodyPinMapShow  from '../../containers/bodymap/BodyPinMapShow';
import {AssessmentInterface, typeHash} from '../../res/data/assessments';
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
  showStartSummary?: boolean;
  editAssessment: (assessment: AssessmentInterface) => boolean;
}

export interface State{

}

export default class AssessmentOverview extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
    showStartSummary: true
  }
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
    return overalPainRatings.map((rating,index) => {
      const {painLevel} = rating;
      return <div key={index}>
                <h3>{rating.category}</h3>
                <span style={{fontSize: '2em',fontWeight: 'bolder',color: painLevel.color}}>{painLevel.title}</span> 
                &nbsp;&nbsp;<span style={{fontSize: '1.2em',color: painLevel.color}}>{this.truncate(painLevel.description)}</span>
                <PainExplanationButton top={6} restoreContent={restoreContent} replaceContent={replaceContent} />
              </div>;
    });
  }
  render(){
    const {assessment,deleteAssessment,editAssessment/*,viewPortSmall*/,showStartSummary} = this.props;
    
    const completedOn = assessment.isComplete && Validators.isNumeric(assessment.completedOn) ? this.handleDateFormat(assessment.completedOn) : 'In Progress';
    const assessmentType = typeHash[assessment.type] || "Unknown";
    let regionStyles = {};


    let editAssessmentButton = <RaisedButton primary={true} label="Edit" onTouchTap={() => editAssessment(assessment)} />;

    //if(!viewPortSmall){
      regionStyles['float'] = 'left';
    //}



    let painRatings =  (<div>
                            {this.renderPainRatings()}
                          </div>);

    let skippedSummary = (<div><h2>This Assessment was Skipped</h2></div>);

    let noChangeSummary = (<div><h2>No Change in Pain Levels</h2></div>);

    let startedSummary = (<div>
                              <h2>This Assessment is incomplete </h2>
                              {editAssessmentButton} &nbsp; &nbsp; {assessment.type === 'newpain' && <RaisedButton label="Delete" onTouchTap={() => deleteAssessment(assessment)} />} 
                          </div>);

    const displaySummary = assessment.status > 0 || showStartSummary;

    const summary = <div>
                      <h3>Completed On: {completedOn}</h3>
                      <h1>Summary</h1>
                      {assessment.status == 0 && startedSummary}
                      {assessment.status == 2 && noChangeSummary}
                      {assessment.status == 3 && skippedSummary}
                    </div>;

    return <div>
              <h1>{assessmentType}</h1>
              <div style={regionStyles}>
                {displaySummary && summary}
                {assessment.status < 2 && painRatings}
              </div>
              <div style={regionStyles}>
                <h3>Pain Map</h3>
                <div style={{float: 'left'}}>
                  <BodyPinMapShow gridSize={10} side='front' assessment={assessment}  />
                </div>
                <div style={{float: 'left'}}>
                  <BodyPinMapShow gridSize={10} side='back' assessment={assessment}  />
                </div>
              </div>
            </div>;
  }
}