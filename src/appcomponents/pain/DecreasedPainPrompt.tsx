import * as React from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {MessagePromptInterface} from '../../res/data/messages';
import {AssessmentInterface} from '../../res/data/assessments';
import {BodySectionInterface} from '../../res/data/body';
import {PainReductionInterface} from '../../res/data/painReduction';
export interface Props {
  open: boolean;
  clearPrompt: (prompt: MessagePromptInterface) => void;
  message: {id: number, message: string[]};
  logPainReduction: (reasons: string[],painReduction: PainReductionInterface) => void;
  painReduction: PainReductionInterface;
  prompt: MessagePromptInterface;
  responseId?: string;
  assessment: AssessmentInterface;
  bodySection?: BodySectionInterface;
}

export interface State {
  responseId: string;
  responses: any[];
  selectValues: string[];
}

const selectOptions = [
  'Medications',
  'Watching a Movie',
  'Playing Games',
  'Listening to Music',
  'Sleeping',
  'Meditation',
  'Other'
];

export default class DecreasedPainPrompt extends React.Component<Props, State>{
  static defaultProps: Partial<Props> = {
    responseId: 'default'
  }

  public initialChildren: any[] = [];

  constructor(props){
    super(props);
    console.log(props.painReduction);
    this.state = {
      responseId: props.responseId,
      responses: [],
      selectValues: []
    }
  }

  handleSelectChange = (event, index, selectValues) => this.setState({selectValues});

  menuItems(values) {
    return selectOptions.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  handleClearPrompt = () => {
    this.props.clearPrompt(this.props.prompt);
    this.getResponseChildren('default');
  }

  componentWillMount(){
     this.initialChildren = !this.props.children ? [] : React.Children.map(this.props.children,child => child)
     this.getResponseChildren(this.state.responseId);
  }

  getResponseChildren = (responseId) => {
    const respChildren = this.initialChildren.map(
     (child) => {
       if(typeof (child as any).props.responseId !== 'undefined' && (child as any).props.responseId === responseId){
         return child;
       }
       return null;
     }
    );
    this.setState({
      responses: respChildren,
      responseId
    });
  }


  handleSelection = (saveData: boolean) => {
    return (event) => {
      const {selectValues} = this.state;
      const {logPainReduction,painReduction} = this.props;
      if(saveData){
        this.getResponseChildren('thank-you');
        setTimeout(() => {
         this.handleClearPrompt();
        },2000);
      } else {
        this.handleClearPrompt();
      }
      if(saveData && selectValues.length > 0){
        logPainReduction(this.state.selectValues, painReduction);
      }
    }
  }

  render(){

    const {open,message} = this.props;
    const {selectValues} = this.state;
    const actions = [
      <FlatButton
        label="Skip"
        primary={true}
        onClick={this.handleSelection(false)}
      />
    ];

    if(selectValues.length > 0){
        actions.unshift(
              <RaisedButton
                label="Save"
                primary={true}
                onClick={this.handleSelection(true)}
              />
          )
    }

    const sentences = message ? message.message : []
    return (<div>
              <Dialog
                title="Pain Decrease?"
                modal={false}
                open={open}
                actions={actions}
                onRequestClose={this.handleClearPrompt}
              >

                {sentences.map(msg => msg)}
                {this.state.responses}
                <div>
                  <SelectField 
                    hintText="Select reasons" 
                    value={selectValues} 
                    onChange={this.handleSelectChange} 
                    multiple={true}>
                    {this.menuItems(selectValues)}
                  </SelectField>
                </div>
              </Dialog>
            </div>);
  }
  
}