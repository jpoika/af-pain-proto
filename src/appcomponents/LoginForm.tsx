import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {flexParentRowStyle,flexRowItemStyle} from '../components/commonStyles';


export interface Props {
  onCancelClick(Event: any): any;
  validate(data: any): {isValid: boolean,errors: any}
}

export interface State {
  values: {username: string, password: string};
  errors: {username: string, password: string}
}

export default class LoginForm extends React.Component<Props, State>{
  constructor (props) {
    super(props);
    this.state = {
      values: {
        username: '',
        password: '',
      },
      errors: {
        username: '',
        password: '',
      }
    }
  }

  handleChange = (event) => {
   
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      values: {...this.state.values,[name]: value},
      errors: {...this.state.errors,[name]: ''}
    } as any);
  }

  handleSubmit = (event) => {
    const {validate} = this.props;
    const result = validate(this.state.values);
    console.log(result);
    if(!result.isValid){
      this.setState({
        errors: result.errors
      });
    }
    event.preventDefault();
  }

  excuseKeyboard = (event) => {
      event.target.focus();
  }

  render(){
    const {onCancelClick} = this.props;
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      

        <div>
        <TextField 
              floatingLabelText={'Email'} 
              hintText={'you@example.com'} 
              multiLine={false}
              name='username'
              value={this.state.values.username}
              fullWidth={true}
              onChange={this.handleChange}
              //ref={(input) => { (this as any).textInput = input; }}
              errorText={this.state.errors.username} />
        </div>
        <div>
          <TextField 
                floatingLabelText={'Password'} 
                multiLine={false}
                name='password'
                value={this.state.values.password}
                fullWidth={true}
                onChange={this.handleChange}
                type="password"
                errorText={this.state.errors.password} />
        </div>
        <div style={flexParentRowStyle as any}>

          <div style={flexRowItemStyle as any}>
            <RaisedButton primary={true} type="submit" label="Submit" />
          </div>
          <div style={flexRowItemStyle as any}>
            <RaisedButton onTouchTap={onCancelClick} type="button" label="Cancel" />
          </div>

        </div>
      
      </form>
      </div>
    );
  }
}
