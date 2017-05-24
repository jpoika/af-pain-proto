import * as React from "react"; 
import {Formats} from '../../lib/helpers';
import {AssessmentInterface} from '../../res/data/assessments';
import AssessmentListItem from './AssessmentListItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';


export interface Props{
  assessments: AssessmentInterface[];
  css?: {[propName: string]: string|number};
  viewPort?: {[propName: string]:{[propName: string]: string|number}}[];
  viewPortSize: string;
  assessmentClicked(assessment: AssessmentInterface): void;
  isReassessmentDue: boolean;
}

export interface State{
  css: {[propName: string]: string|number};
}

export default class AssessmentList extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      css: {width: '100%'},
      viewPort: []
  };

  constructor(props){
    super(props);
    this.state = {
      css: props.css
    };
  }

  handleDateFormat = (epochMs) => {
    return Formats.msToDateTimeString(epochMs);
  }

  handleAssessmentClick = (assessment: AssessmentInterface) => {
    const {assessmentClicked} = this.props;
    assessmentClicked(assessment);
  }

  handleWidth = () => {
    const {viewPort,viewPortSize,css} = this.props;

    let cssStyles = viewPort.filter((vConf) => {
        return typeof vConf[viewPortSize] !== 'undefined';
    }).map(vConf => vConf[viewPortSize]);

    return cssStyles.length > 0 ? cssStyles[0] : css;
  }


  render(){
    const {assessments,viewPortSize,isReassessmentDue} = this.props;

    return <div style={this.handleWidth()}>
              <h2>Assessments</h2>
              <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    {!(viewPortSize === 'small') && <TableHeaderColumn>Type</TableHeaderColumn>}
                    <TableHeaderColumn>Completed On</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {assessments.map(assess => <AssessmentListItem isReassessmentDue={isReassessmentDue} assessmentClick={this.handleAssessmentClick} viewPortSmall={viewPortSize === 'small'} assessment={assess}/>)}
                </TableBody>
              </Table> 
            </div>;
  }
}