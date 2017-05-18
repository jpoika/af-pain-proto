import * as React from "react"; 
import {List, ListItem} from 'material-ui/List';
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
    const {assessment,viewPortSmall} = this.props;
    const statusDetails =  statusHash[assessment.status] || "Unknown";
    const completedOn = assessment.isComplete && Validators.isNumeric(assessment.completedOn) ? this.handleDateFormat(assessment.completedOn) : 'In Progress';
    const assessmentType = typeHash[assessment.type] || "Unknown";
    return <TableRow onRowClick={this.handleAssessmentClick}>
           {!viewPortSmall && <TableRowColumn>{assessmentType}</TableRowColumn>}
                              <TableRowColumn>{completedOn}</TableRowColumn>
                              <TableRowColumn>{statusDetails}</TableRowColumn>
          </TableRow>;
  }
}