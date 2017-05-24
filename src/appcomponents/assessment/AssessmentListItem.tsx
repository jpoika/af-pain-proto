import * as React from "react"; 
import {AssessmentInterface, statusHash, typeHash} from '../../res/data/assessments';
import {Formats,Validators} from '../../lib/helpers';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export interface Props{
  assessment: AssessmentInterface;
  viewPortSmall: boolean;
  assessmentClick(assessment: AssessmentInterface): void;
  isReassessmentDue: boolean;
}

export interface State{

}

export default class AssessmentListItem extends React.Component<Props, State>{
  
  
  handleDateFormat = (epochMs) => {
    return Formats.msToDateTimeString(epochMs);
  }

  handleAssessmentClick = (event) => {
    const {assessment,assessmentClick} = this.props;
    assessmentClick(assessment);
  }

  render(){
    const {assessment,viewPortSmall,isReassessmentDue} = this.props;
    let statusDetails =  statusHash[assessment.status] || "Unknown";
    const completedOn = assessment.isComplete && Validators.isNumeric(assessment.completedOn) ? this.handleDateFormat(assessment.completedOn) : 'In Progress';
    const assessmentType = typeHash[assessment.type] || "Unknown";

    //if we have an incomplete reassessment but It's not do we want to let the user know they can wait
    if(assessment.type === 'reassessment' && !assessment.isComplete && !isReassessmentDue){
        statusDetails = "Not Due Yet";
    }

    return <TableRow onRowClick={this.handleAssessmentClick}>
           {!viewPortSmall && <TableRowColumn>{assessmentType}</TableRowColumn>}
                              <TableRowColumn>{completedOn}</TableRowColumn>
                              <TableRowColumn>{statusDetails}</TableRowColumn>
          </TableRow>;
  }
}