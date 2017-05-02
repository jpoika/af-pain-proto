import * as React from 'react';
import {MedicationInterface} from '../res/data/medication';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {flexParentRowStyle, flexRowItemStyle} from '../components/commonStyles';
export interface Props{
  medication: MedicationInterface;
  update(medication: MedicationInterface): any;
  deleteItem(medicationId: number): any;
  validate(data: MedicationInterface): any;
  onSave?(medication: MedicationInterface): any
  routes: {id: number, name: string, description: string}[],
  amountUnits: {id: number, name: string, description: string}[],
  frequencyUnits: string[]
}

export interface State{
  values: any;
  errors: any;
  mode: number; //0 view 1//edit
}

function normalizeValues(medication: MedicationInterface){
  let medValues = {...medication};
  //delete medValues[medication.id];
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
 public static defaultProps: Partial<Props> = {
      onSave: () => {}
  };
  constructor (props) {
    super(props);

    this.state = {
      values: normalizeValues(this.props.medication),
      errors: normalizeErrors(this.props.medication),
      mode: this.props.medication.name ? 1 : 0
    };
  }

  handleDelete = (event) => {
    const {deleteItem,medication} = this.props;
    deleteItem(medication.id);
  }

  handleUpdate = (data) => {
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

     const {validate,update,onSave} = this.props;
     console.log(this.state.values);
 
    const result = validate(this.state.values);
   
    if(!result.isValid){
      this.setState({
        errors: result.errors
      });
    }else{
      onSave(this.state.values);
      update(this.state.values);
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
    const {medication,amountUnits,frequencyUnits,routes} = this.props;
    const {values,errors} = this.state;
    return <Paper style={{padding: '5px', width: '97%',marginBottom: '15px',marginLeft: '10px'}}>
            <form onSubmit={this.handleSubmit}>
            <div>
            <div>
              <SelectField
                floatingLabelText="Method of intake"
                errorText={this.state.errors.routeId} 
                value={this.state.values.routeId}
                onChange={this.handleSelectChange('routeId')}
              >
                {routes.map((ru) => {
                  return <MenuItem key={ru.id} value={ru.id} primaryText={ru.name} />
                })}
                
              </SelectField>
            </div>
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
            <div style={flexParentRowStyle as any}>
              <div style={flexRowItemStyle as any}>
                <RaisedButton primary={true} type="submit">Save</RaisedButton>
              </div>
              <div style={flexRowItemStyle as any}>
                <RaisedButton onTouchTap={this.handleDelete}>Delete</RaisedButton>
              </div>
            </div>
            </form>
          </Paper>
              
  }
}