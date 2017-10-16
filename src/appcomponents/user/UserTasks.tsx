import * as React from "react";
import DoneIcon from 'material-ui/svg-icons/action/done';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import CountDown from '../../containers/assessment/CountDown';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export interface Props {
  css?: {[propName: string]: string|number};
  viewPort?: {[propName: string]:{[propName: string]: string|number}}[];
  viewPortSize: string;
  reAssessmentClick(): void;
  initialAssessmentClick(isDone: boolean): void;
  initAssessComplete: boolean;
  reassessmentReady: boolean;
  reassessmentDeadline: number;
}

export interface State {
}



export default class UserOverview extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      css: {width: '100%'},
      viewPort: []
  };
  handleWidth = () => {
    const {viewPort,viewPortSize,css} = this.props;

    let cssStyles = viewPort.filter((vConf) => {
        return typeof vConf[viewPortSize] !== 'undefined';
    }).map(vConf => vConf[viewPortSize]);

    return cssStyles.length > 0 ? cssStyles[0] : css;
  }

  render(){ 
    const {initialAssessmentClick, reAssessmentClick,initAssessComplete,reassessmentReady} = this.props;
    const initRighIcon = initAssessComplete ? <DoneIcon color={'green'} /> : <WarningIcon color={'red'} />;
    const initAssessText = initAssessComplete ? "Initial Assessment Complete" : "Please complete your Initial Assessment";
    const reassessText = !reassessmentReady ? "Reassessment Count Down" : "Please complete a Reassessment";
    //const reassessRighIcon = !reassessmentReady ? <DoneIcon color={'green'} /> : <WarningIcon color={'red'} />;
    const reassessRighIcon = !reassessmentReady ? <CountDown mode="compact" /> : <WarningIcon color={'red'} />;

    return <div style={this.handleWidth()}>
             <h2>User Tasks</h2>
             <Table selectable={true}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
  
                  <TableRowColumn><div onClick={() => initialAssessmentClick(initAssessComplete)}>{initAssessText}</div></TableRowColumn>
                  <TableRowColumn>{initRighIcon}</TableRowColumn>
                </TableRow>
                {initAssessComplete && <TableRow>
                  <TableRowColumn><div onClick={() => reAssessmentClick()}>{reassessText}</div></TableRowColumn>
                  <TableRowColumn>{reassessRighIcon}</TableRowColumn>
                </TableRow>}
              </TableBody>
            </Table>

             
          </div>;
  }
}