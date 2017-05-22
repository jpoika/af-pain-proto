import * as React from "react";
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import InfoIcon from 'material-ui/svg-icons/action/info';
import {Formats} from '../../lib/helpers';
export interface Props {
  user: {  
          firstname: string;
          lastname: string;
          middlename: string;
          dob: number;
        };
  css?: {[propName: string]: string|number};
  viewPort?: {[propName: string]:{[propName: string]: string|number}}[];
  viewPortSize: string;
  editClick(): void;
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
    const {user, editClick} = this.props;
    return <div style={this.handleWidth()}>
         <h2>User Overview</h2>
         <div style={{fontSize: '2em',marginBottom: '5px'}}>
            {user.lastname}, {user.firstname} {user.middlename}
         </div>
         <div style={{fontSize: '2em',marginBottom: '5px'}}>
            Born: {Formats.msToDateString(user.dob)}
         </div>
         <RaisedButton primary={true} onTouchTap={() =>  editClick()} label="Edit Account Details" />
    </div>;
  }
}