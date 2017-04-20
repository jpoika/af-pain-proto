import * as React from 'react';
import {AllergyInterface} from '../res/data/allergy';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {flexParentRowStyle, flexRowItemStyle} from '../components/commonStyles';
export interface Props{
  allergy: AllergyInterface;
  update(allergy: AllergyInterface): any;
  deleteItem(allergyId: number): any;
  validate(data: AllergyInterface): any;
  onSave?(allergy: AllergyInterface): any
  routes: {id: number, name: string, description: string}[],
  amountUnits: {id: number, name: string, description: string}[],
  frequencyUnits: string[]
}

export interface State{
  values: any;
  errors: any;
  mode: number; //0 view 1//edit
}

function normalizeValues(allergy: AllergyInterface){
  let medValues = {...allergy};
  //delete medValues[allergy.id];
  return medValues;
}

function normalizeErrors(allergy: AllergyInterface){
  let medValues = {...allergy};
  delete medValues[allergy.id];
  let blankOb = Object.keys(allergy).reduce((acc,propName) => {
    acc[propName] = ''
    return acc;
  }, {});
  delete blankOb[allergy.id];

  return blankOb;
}

export default class AllergyItemEdit extends React.Component<Props, State>{
 public static defaultProps: Partial<Props> = {
      onSave: () => {}
  };
  constructor (props) {
    super(props);

    this.state = {
      values: normalizeValues(this.props.allergy),
      errors: normalizeErrors(this.props.allergy),
      mode: this.props.allergy.name ? 1 : 0
    };
  }

  handleDelete = (event) => {
    const {deleteItem,allergy} = this.props;
    deleteItem(allergy.id);
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

/*
  handleSelectChange = (valueName) => {
    return (event,key,payload) => {
      this.setState({
        values: {...this.state.values,[valueName]: payload},
        errors: {...this.state.errors,[valueName]: ''}
      } as any);
    }
  } */

  render(){
    const {allergy,amountUnits,frequencyUnits,routes} = this.props;
    const {values,errors} = this.state;
    return <Paper style={{padding: '5px', width: '97%',marginBottom: '15px',marginLeft: '10px'}}>
            <form onSubmit={this.handleSubmit}>
              <div>
              <TextField 
                    floatingLabelText={'Name'} 
                    hintText={''} 
                    multiLine={false}
                    name='name'
                    value={values.name}
             
                    onChange={this.handleChange}
                   
                    errorText={errors.name} />
              </div>

              <div>
              <TextField 
                    floatingLabelText={'Description'} 
                    hintText={''} 
                    multiLine={true}
                    name='description'
                    value={values.description}
               
                    onChange={this.handleChange}
                    
                    errorText={errors.description} />
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