import * as React from "react";
import BodyPinMap  from '../containers/BodyPinMap';
import {AssessmentInterface} from '../res/data/assessments'
import RaisedButton from 'material-ui/RaisedButton';

export interface Props {
  view?: string;
  replaceContent(content: any): void;
  restoreContent(): void;
  assessment: AssessmentInterface;
}

export interface State {
  view: string;
}



export default class BodyMapsCombined extends React.Component<Props, State>{
  static defaultProps: Partial<Props> = {
    view: 'front'
  }

  constructor(props){
    super(props);
    this.state = {
      view: this.props.view
    }
  }

  handleViewSelect = (view: string) => {
      return (event) => {
        this.setState({
          view
        });
      }
  }

  handleViewToggle =  (event) => {
    this.setState({
      view: this.state.view === 'front' ? 'back' : 'front'
    });
  }

  render(){
    const {replaceContent,restoreContent,assessment} = this.props;
    const {view} = this.state;
    const buttonLabel = view === 'front' ? "View Back" : "View Front";
    return <div style={{position: 'relative'}}>
           <RaisedButton style={{position: 'absolute', left: 0}} onTouchTap={this.handleViewToggle} label={buttonLabel} />
           {view === 'front' && <BodyPinMap replaceContent={replaceContent} restoreContent={restoreContent} side={'front'} assessment={assessment} />}
           {view === 'back' && <BodyPinMap replaceContent={replaceContent} restoreContent={restoreContent} side={'back'} assessment={assessment} />}
    </div>;
  }
}

