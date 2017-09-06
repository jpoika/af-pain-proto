import FlatButton from 'material-ui/FlatButton'
import * as React from "react";

export interface Props { 
  newPainClick(): void;
  initAssessClick(): void;
  initAssessmentComplete: boolean;
  style: any;
}

export interface State { 

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class NewPainButton extends React.Component<Props, State> {

    render() {
        const {initAssessmentComplete, newPainClick, initAssessClick, style} = this.props;
        let combinedStyles = {...style,color: '#FFFFFF', backgroundColor: '#4caf50'};

        if(!initAssessmentComplete){
          return (<FlatButton style={combinedStyles} onTouchTap={initAssessClick} label="Take Initial Assessment" />);
        }

        return (<FlatButton style={combinedStyles} onTouchTap={newPainClick} label="New Pain" />);
    }
}

export default NewPainButton;