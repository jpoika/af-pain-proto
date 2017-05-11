//ref={(input) => { (this as any).textInput = input; }}
import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import MainAssessmentWizardContainer from '../containers/MainAssessmentWizard';
import {BodySectionInterface} from '../res/data/body';
import {PainLevelInterface} from '../res/data/pain';
import PainSelectorDialog from './PainSelectorDialog';
import PainSelectorDialogContainer from '../containers/PainSelector';

declare module 'react' { //See https://github.com/zilverline/react-tap-event-plugin/issues/58
    interface HTMLProps<T> {
        onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
    }
}

export interface Props{
  title: string;
  bodyImage: string;
  assessmentId: number;
  side: string;
  markPain(assessmentId: number, side: string, sectionId: number, painLevel: PainLevelInterface): any;
  deleteSection(sectionId: number);
  dialogOpen?: boolean;
  bodySections: BodySectionInterface[];
  painMarkings: {section:BodySectionInterface, painLevel: PainLevelInterface}[];
}

export interface State{
  dialogOpen: boolean;
  activeSection: BodySectionInterface;
  currentPainLevel: PainLevelInterface;
}

export default class BodyPinMap extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
    dialogOpen: false
  };

  private mapBox;
  private boundingRect;
  //private tempEl;
  private gridMap = {};
  private ignoreMaskFrontArray = ['cell25_0', 'cell25_1', 'cell25_2', 'cell25_3', 'cell25_4', 'cell25_5', 'cell24_5', 'cell23_5', 'cell23_4', 'cell24_4', 'cell24_3', 'cell24_2', 'cell24_1', 'cell24_0', 'cell23_0', 'cell23_1', 'cell23_2', 'cell23_3', 'cell22_4', 'cell22_3', 'cell22_2', 'cell22_1', 'cell22_0', 'cell21_0', 'cell18_1', 'cell20_0', 'cell19_0', 'cell19_1', 'cell20_1', 'cell21_1', 'cell21_2', 'cell21_3', 'cell21_4', 'cell20_4', 'cell19_4', 'cell18_4', 'cell17_4', 'cell17_3', 'cell18_3', 'cell19_3', 'cell20_3', 'cell20_2', 'cell19_2', 'cell18_0', 'cell18_2', 'cell16_4', 'cell16_3', 'cell17_2', 'cell16_2', 'cell16_1', 'cell17_1', 'cell17_0', 'cell16_0', 'cell15_4', 'cell15_3', 'cell15_0', 'cell14_0', 'cell13_0', 'cell12_0', 'cell11_1', 'cell11_0', 'cell10_1', 'cell10_0', 'cell9_1', 'cell9_0', 'cell8_1', 'cell8_2', 'cell8_0', 'cell7_0', 'cell7_1', 'cell7_2', 'cell6_2', 'cell6_1', 'cell6_0', 'cell5_2', 'cell5_1', 'cell5_0', 'cell4_3', 'cell4_2', 'cell3_3', 'cell3_2', 'cell4_1', 'cell3_1', 'cell4_0', 'cell3_0', 'cell2_0', 'cell2_1', 'cell2_2', 'cell2_3', 'cell2_4', 'cell3_4', 'cell2_5', 'cell1_5', 'cell1_4', 'cell0_5', 'cell0_4', 'cell0_3', 'cell1_3', 'cell1_2', 'cell0_2', 'cell0_1', 'cell1_1', 'cell1_0', 'cell0_0', 'cell0_9', 'cell0_10', 'cell1_9', 'cell2_9', 'cell1_10', 'cell0_11', 'cell0_13', 'cell0_14', 'cell0_12', 'cell1_11', 'cell1_12', 'cell1_13', 'cell1_14', 'cell2_14', 'cell2_13', 'cell2_12', 'cell2_11', 'cell2_10', 'cell3_10', 'cell3_12', 'cell3_11', 'cell3_13', 'cell3_14', 'cell4_14', 'cell4_13', 'cell4_12', 'cell4_11', 'cell5_12', 'cell5_13', 'cell5_14', 'cell6_12', 'cell6_13', 'cell6_14', 'cell7_12', 'cell7_13', 'cell7_14', 'cell8_12', 'cell8_13', 'cell8_14', 'cell9_13', 'cell9_14', 'cell10_14', 'cell10_13', 'cell11_13', 'cell11_14', 'cell12_14', 'cell13_14', 'cell14_14', 'cell15_14', 'cell16_14', 'cell16_13', 'cell16_12', 'cell16_11', 'cell15_11', 'cell15_10', 'cell16_10', 'cell17_10', 'cell17_11', 'cell17_12', 'cell17_13', 'cell17_14', 'cell18_10', 'cell18_11', 'cell18_12', 'cell18_13', 'cell18_14', 'cell19_14', 'cell19_13', 'cell19_12', 'cell19_11', 'cell19_10', 'cell20_10', 'cell20_11', 'cell20_12', 'cell20_13', 'cell20_14', 'cell21_14', 'cell21_13', 'cell21_12', 'cell21_11', 'cell21_10', 'cell22_10', 'cell22_11', 'cell22_12', 'cell22_13', 'cell22_14', 'cell23_14', 'cell23_13', 'cell23_12', 'cell23_11', 'cell23_10', 'cell23_9', 'cell24_9', 'cell24_10', 'cell24_12', 'cell24_13', 'cell24_14', 'cell24_11', 'cell25_9', 'cell25_10', 'cell25_11', 'cell25_12', 'cell25_13', 'cell25_14'];
  private ignoreMapFront;

  constructor(props){
    super(props)
    this.ignoreMapFront = this.ignoreMaskFrontArray.reduce((acc,cellId) => {
        acc[cellId] = cellId;
      return acc;
    } ,{});
    this.state = {
      dialogOpen: this.props.dialogOpen,
      activeSection: null,
      currentPainLevel: null
    }
  }

  handleClickEvent = (event) => {
 
     this.handleUpdateBoundingClientRect();
     if(typeof event.clientX !== 'undefined'){
       this.handleLocateSection(event.clientX,event.clientY);
     }
  }

  isSectionSaved = (section: BodySectionInterface) => {
     const {painMarkings} = this.props;
     return painMarkings.filter(mark => mark.section.id === section.id).length > 0;
  }

  handleLocateSection = (x: number, y:number) => {
    let relX = x - this.boundingRect.left;
    let relY = y - this.boundingRect.top;
    let col =  Math.floor(relX / 50);
    let row =  Math.floor(relY / 50);
    if(!this.shouldIgnore(row, col)){
      const section = this.handleResolveBodySection(row, col);
      if(section && !this.isSectionSaved(section)){
     
        this.handleDialogOpen(section);
      }
    }
  }

  handleResolveBodySection = (row, col) => {
    const {bodySections} = this.props;
    let filtered = bodySections.filter((section) => {
       if(section.row === row && section.col === col){
         return true;
       }
       return false;
    });
    return filtered.length ? filtered[0] : null;
  }

  handleDeletePain = (sectionId) => {
    const {deleteSection} = this.props;
    this.state.activeSection && this.handleRemoveBodySelection(this.state.activeSection);
    deleteSection(sectionId);
  }


  shouldIgnore = (row, col) => {
    const section = this.handleResolveBodySection(row, col);
    return !section || typeof this.ignoreMapFront[this.getCellId(section)] !== 'undefined';
  }
/*
  addToGridMap = (row, col) => {
   
    this.gridMap[this.getCellId(row, col)] = [row, col];
 
    
    let element = document.createElement('div');
    var newContent = document.createTextNode(Object.keys(this.gridMap).reduce((acc, propName) =>{
     let cell = this.gridMap[propName];
      acc += "'" + this.getCellId(cell[0],cell[1]) + "', ";
      return acc;
    } ,''));
    this.tempEl.innerHTML = "";
    element.appendChild(newContent);
    this.tempEl.appendChild(newContent); 
  }
*/
  getCellId = (section: BodySectionInterface) => {
    return 'cell_body_' + section.id;
  }

  handleDialogOpen = (section:BodySectionInterface,painLevel: PainLevelInterface = null) => {
    this.setState({
      dialogOpen: true,
      activeSection: section,
      currentPainLevel: painLevel
    });
  }

  handleRemoveBodySelection = (section:BodySectionInterface) => {
    delete this.gridMap[this.getCellId(section)];
    let element = document.getElementById(this.getCellId(section));
    if(element){
      element.remove();
    }
  }

  getCalcSectionId = (row,col) => {
    let offset = row * 15;
    return offset + col + 1;
  }

  handleAddBodySelection(section:BodySectionInterface, painLevel: PainLevelInterface){
    this.handleRemoveBodySelection(section);
    let element = document.createElement('div');
    let contentElement = document.createElement('h1');
    contentElement.setAttribute('style',`color: ${painLevel.color};`);
    var painLevelContent = document.createTextNode(painLevel.level + '');
    contentElement.appendChild(painLevelContent);

    
    
    element.appendChild(contentElement);
    let left = section.col * 50;
    let top = section.row * 50;
    element.setAttribute('id',this.getCellId(section));
    element.setAttribute('class','body-section-cell');
    element.setAttribute('style',`border-radius: 25px; background-color: white; position: absolute; top: ${top}px; left: ${left}px; width: 50px; height: 50px; padding-left: 17px;`)
    this.mapBox.appendChild(element);

    element.addEventListener('click', (event) => {
       this.handleDialogOpen(section,painLevel);
    });
  }

  handleClearCells(){
     let cells = document.getElementsByClassName("body-section-cell");
     for(let i = 0; i < cells.length; i++){
       let item = cells.item(i);
       item && item.remove();
     }
  }

  handleUpdateBoundingClientRect = () => {
    this.boundingRect = this.mapBox.getBoundingClientRect();
  }

  componentDidMount(){
    const {painMarkings} = this.props;
 
    painMarkings.map(({section, painLevel}) => {
     this.handleAddBodySelection(section,painLevel)
    });
  }  

  componentDidUpdate(prevProps, prevState){
    const {painMarkings} = this.props;
    painMarkings.map(({section, painLevel}) => {
       this.handleAddBodySelection(section,painLevel)
    });
  } 

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      activeSection: null,
      currentPainLevel: null
    });
  } 

  handleSelectPain = (painLevel:PainLevelInterface) => {

    const {markPain,assessmentId,side} = this.props;
    if(this.state.activeSection){
      markPain(assessmentId,side,this.state.activeSection.id,painLevel);
    }

  }

  render(){
    const {title,bodyImage,painMarkings,deleteSection} = this.props;
 
    return (
            <div style={{overflow: 'auto'}}>
              <div onClick={this.handleClickEvent} onTouchTap={this.handleClickEvent} style={{position: 'relative', width: 750, height: 1300}} ref={(el) => { this.mapBox= el; }} >
                    <img src={bodyImage} width="750" height="1300" />
              </div>
        
              <PainSelectorDialog section={this.state.activeSection} deleteSection={this.handleDeletePain} painLevel={this.state.currentPainLevel} handleClose={this.handleDialogClose} selectPain={this.handleSelectPain} open={this.state.dialogOpen} />
            </div>
           );
  }
}