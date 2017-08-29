import * as React from "react";
import BodyMap  from '../containers/BodyMap';
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

  render(){
    const {replaceContent,restoreContent,assessment} = this.props;
    const {view} = this.state;
    return <div style={{position: 'relative'}}>
           <RaisedButton style={{position: 'absolute', left: 0}} onTouchTap={this.handleViewSelect('front')} label="Front" />
           <RaisedButton style={{position: 'absolute', right: 0}} onTouchTap={this.handleViewSelect('back')} label="Back" />
           {view === 'front' && <BodyMap replaceContent={replaceContent} restoreContent={restoreContent} side={'front'} assessment={assessment} />}
           {view === 'back' && <BodyMap replaceContent={replaceContent} restoreContent={restoreContent} side={'back'} assessment={assessment} />}
    </div>;
  }
}

