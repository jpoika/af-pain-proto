import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import DoNotDisturbControll from '../../containers/DoNotDisturbControll';
import UserDeleteAccountControl from '../../containers/user/UserDeleteAccountControl';
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
    return <div style={{...this.handleWidth(),position: 'relative'}}>
         <h2>User Overview</h2>
         <div style={{margin: '0px 10px 10px 10px', padding: '10px',backgroundColor: '#d3d3d3', borderRadius: '5px'}}>
           <div style={{fontSize: '1.7em',marginBottom: '5px'}}>
              Name: {user.lastname}, {user.firstname} {user.middlename}
           </div>
           <div style={{fontSize: '1.7em',marginBottom: '5px'}}>
              Born: {Formats.msToDateString(user.dob)}
           </div>
           <div style={{margin: '5px 0 10px 0'}}>
           <DoNotDisturbControll />
           </div>
           <span style={{position: 'absolute',right: 20, bottom: 10}}>
             <UserDeleteAccountControl  />
           </span>
           <RaisedButton primary={true} onTouchTap={() =>  editClick()} label="Edit Info" />
         </div>
         
    </div>;
  }
}