import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Transforms} from '../lib/helpers';
import {flexParentRowStyle,flexRowItemStyle} from '../components/commonStyles';
import {AccountInterface} from '../res/data/account'

export interface Props {
  validate(data: any): {isValid: boolean,errors: any};
  genders: {id: any, name: any}[];
  savedAccount: AccountInterface;
}

export interface AccountFormInterface {
  firstname: string;
  lastname: string;
  middlename: string;
  gender: number;
  dob: number;
}

export interface State {
  values: AccountFormInterface;
  errors: AccountFormInterface;
}

export default class LoginForm extends React.Component<Props, State>{
  constructor (props) {
    super(props);
    console.log(props.savedAccount);
    this.state = {
      values: {...props.savedAccount},
      errors: {
        firstname: '',
        lastname: '',
        middlename: '',
        gender: null,
        dob: null
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
  handleSelectChange = (valueName) => {
    return (event,key,payload) => {
      this.setState({
        values: {...this.state.values,[valueName]: payload},
        errors: {...this.state.errors,[valueName]: ''}
      } as any);
    }
  }
  handleDateChange = (name) => {
    return (event, date) => {

      this.setState({
        values: {...this.state.values,[name]: Transforms.dateToMS(date,null)},
        errors: {...this.state.errors,[name]: ''}
      } as any);
    }
  }

  excuseKeyboard = (event) => {
      event.target.focus();
  }

  render(){
    const {genders} = this.props;

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      

        <div>
        <TextField 
              floatingLabelText={'First Name'} 
              hintText={''} 
              multiLine={false}
              name='firstname'
              value={this.state.values.firstname}
              fullWidth={true}
              onChange={this.handleChange}
              //ref={(input) => { (this as any).textInput = input; }}
              errorText={this.state.errors.firstname} />
        </div>
        <div>
        <TextField 
              floatingLabelText={'Middle Name'} 
              hintText={''} 
              multiLine={false}
              name='middlename'
              value={this.state.values.middlename}
              fullWidth={true}
              onChange={this.handleChange}
              //ref={(input) => { (this as any).textInput = input; }}
              errorText={this.state.errors.middlename} />
        </div>
        <div>
        <TextField 
              floatingLabelText={'Last Name'} 
              hintText={''} 
              multiLine={false}
              name='lastname'
              value={this.state.values.lastname}
              fullWidth={true}
              onChange={this.handleChange}
              //ref={(input) => { (this as any).textInput = input; }}
              errorText={this.state.errors.lastname} />
        </div>
        <div>
        <SelectField
          floatingLabelText="Gender"
          errorText={this.state.errors.gender} 
          value={this.state.values.gender}
          onChange={this.handleSelectChange('gender')}
        >
          {genders.map((gender) => {
            return <MenuItem key={gender.id} value={gender.id} primaryText={gender.name} />
          })}
          
        </SelectField>
        </div>
        <div>
            <DatePicker 
                value={Transforms.msToDate(this.state.values.dob)}
                floatingLabelText={'Date of Birth'}
                locale={'en-US'}
                firstDayOfWeek={0}
                maxDate={new Date()}
                errorText={this.state.errors.dob}
                onChange={this.handleDateChange('dob')}
                onTouchTap={this.excuseKeyboard}
                name='dob'
                autoOk={false} />
        </div>
        <div style={flexParentRowStyle as any}>
          <div style={flexRowItemStyle as any}>
            <RaisedButton primary={true} type="submit" label="Save" />
          </div>
        </div>
      </form>
      </div>
    );
  }
}
