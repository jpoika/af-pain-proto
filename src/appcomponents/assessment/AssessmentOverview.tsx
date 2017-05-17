import * as React from "react"; 
import {List, ListItem} from 'material-ui/List';
import {AssessmentInterface, statusHash, typeHash} from '../../res/data/assessments';
import {Formats,Validators} from '../../lib/helpers';
import {PainLevelInterface} from '../../res/data/pain';
import PainExplanationButton from '../../containers/PainExplanationButton';

export interface Props{
  assessment: AssessmentInterface;
  overalPainRatings: {category: string, painLevel:PainLevelInterface}[];
  replaceContent(content: JSX.Element): void;
  restoreContent(): void;
}

export interface State{

}

export default class AssessmentOverview extends React.Component<Props, State>{
  handleDateFormat = (epochMs) => {
    return Formats.msToDateTimeString(epochMs);
  }
  renderPainRatings = () => {
    const {overalPainRatings,restoreContent,replaceContent} = this.props;
    return overalPainRatings.map(rating => {
      const {painLevel} = rating;
      return <div>
                <h2>{rating.category}</h2>
                <span style={{fontSize: '3em',fontWeight: 'bolder',color: painLevel.color}}>{painLevel.title}</span> 
                &nbsp;&nbsp;<span style={{fontSize: '1.5em'}}>{painLevel.description}</span>
                <PainExplanationButton top={0} restoreContent={restoreContent} replaceContent={replaceContent} />
              </div>;
    });
  }
  render(){
    const {assessment} = this.props;
    const statusDetails =  statusHash[assessment.status] || "Unknown";
    const completedOn = assessment.isComplete && Validators.isNumeric(assessment.completedOn) ? this.handleDateFormat(assessment.completedOn) : 'In Progress';
    const assessmentType = typeHash[assessment.type] || "Unknown";
    return <div>
              <h1>{assessmentType}</h1>
              <h3>Completed On: {completedOn}</h3>
              <h1>Pain Ratings</h1>
              {this.renderPainRatings()}
            </div>;
  }
}