import * as React from "react"; 
import {List, ListItem} from 'material-ui/List';
import {Formats} from '../../lib/helpers';
import {AssessmentInterface, statusHash,typeHash} from '../../res/data/assessments';
import AssessmentListItem from './AssessmentListItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export interface Props{
  assessments: AssessmentInterface[];
  viewPortSmall: boolean;
  assessmentClicked(assessment: AssessmentInterface): void;
}

export interface State{

}

export default class AssessmentList extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      viewPortSmall: false
  };

  handleDateFormat = (epochMs) => {
    return Formats.msToDateTimeString(epochMs);
  }

  handleAssessmentClick = (assessment: AssessmentInterface) => {
    const {assessmentClicked} = this.props;
    assessmentClicked(assessment);
  }
  render(){
    const {assessments,viewPortSmall} = this.props;
    return <div>
              <h2>Assessments</h2>
              <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    {!viewPortSmall && <TableHeaderColumn>Type</TableHeaderColumn>}
                    <TableHeaderColumn>Completed On</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {assessments.map(assess => <AssessmentListItem assessmentClick={this.handleAssessmentClick} viewPortSmall={viewPortSmall} assessment={assess}/>)}
                </TableBody>
              </Table> 
            </div>;
  }
}