import * as React from 'react';
import {MedicationInterface} from '../res/data/medication';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

export interface Props{
  medication: MedicationInterface;
  update(medication: MedicationInterface): any;
  deleteItem(medicationId: number): any;
  validate(data: any): any;
}

export interface State{
  values: any;
  errors: any;
}

function normalizeValues(medication: MedicationInterface){
  let medValues = {...medication};
  delete medValues[medication.id];
  return medValues;
}

function normalizeErrors(medication: MedicationInterface){
  let medValues = {...medication};
  delete medValues[medication.id];
  let blankOb = Object.keys(medication).reduce((acc,propName) => {
    acc[propName] = ''
    return acc;
  }, {});
  delete blankOb[medication.id];

  return blankOb;
}

export default class MedicationItem extends React.Component<Props, State>{
  constructor (props) {
    super(props);

    this.state = {
      values: normalizeValues(this.props.medication),
      errors: normalizeErrors(this.props.medication)
    };
  }

  handleDelete = (event) => {
    const {deleteItem,medication} = this.props;
    deleteItem(medication.id);
  }

  handleUpdate = (event) => {
    //const {deleteItem,medication} = this.props;
    //deleteItem(medication.id);
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

  render(){
    const {medication} = this.props;
    const {values,errors} = this.state;
    return <Paper style={{padding: '5px', width: '90%',marginBottom: '15px',marginLeft: '10px'}}>
            <div>
            <TextField 
                  floatingLabelText={'Perscription name'} 
                  hintText={''} 
                  multiLine={false}
                  name='name'
                  value={values.name}
           
                  onChange={this.handleChange}
                  //ref={(input) => { (this as any).textInput = input; }}
                  errorText={errors.name} />
            </div>

            <div>
            <TextField 
                  floatingLabelText={'Amount'} 
                  hintText={'Numbers Only Please'} 
                  multiLine={false}
                  name='name'
                  value={values.amount}
             
                  onChange={this.handleChange}
                  //ref={(input) => { (this as any).textInput = input; }}
                  errorText={errors.amount} />
            </div>

            <div>
            <TextField 
                  floatingLabelText={'Frequency'} 
                  hintText={'Numbers Only Please'} 
                  multiLine={false}
                  name='frequency'
                  value={values.frequency}
             
                  onChange={this.handleChange}
                  //ref={(input) => { (this as any).textInput = input; }}
                  errorText={errors.frequency} />

            </div>
            <RaisedButton onTouchTap={this.handleDelete}>Delete</RaisedButton>
          </Paper>
              
  }
}