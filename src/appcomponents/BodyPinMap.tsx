import * as React from "react";
import {BodySectionInterface} from '../res/data/body';
import {AssessmentInterface} from '../res/data/assessments';
import {PainLevelInterface} from '../res/data/pain';
import PainSelectorDialog from './PainSelectorDialog';

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
  markPain(assessment: AssessmentInterface, side: string, sectionId: number, painLevel: PainLevelInterface): any;
  deleteSection(sectionId: number);
  dialogOpen?: boolean;
  bodySections: BodySectionInterface[];
  painMarkings: {section:BodySectionInterface, painLevel: PainLevelInterface}[];
  gridSize: number;
  assessment: AssessmentInterface;
  replaceContent(content: any): void;
  restoreContent(): void;
}

export interface State{
  dialogOpen: boolean;
  activeSection: BodySectionInterface;
  currentPainLevel: PainLevelInterface;
}

export default class BodyPinMap extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
    dialogOpen: false,
    gridSize: 20
  };

  private mapBox;
  private boundingRect;
  //private tempEl;
  private gridMap = {};

  constructor(props){
    super(props)

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
    let col =  Math.floor(relX / this.props.gridSize);
    let row =  Math.floor(relY / this.props.gridSize);
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
    return !section || section.isBlank;
  }

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
        //older ie doesn't suppor remove
        if(typeof element.remove=='function'){
           //If support  is found 
          
            element.remove();
        }
        else{
          //If not
        
           element.parentElement.removeChild(element);
       }
    }
  }

  getCalcSectionId = (row,col) => {
    let offset = row * 15;
    return offset + col + 1;
  }

  handleAddBodySelection(section:BodySectionInterface, painLevel: PainLevelInterface){
    this.handleRemoveBodySelection(section);
    if(painLevel.level === 0){
      this.handleDeletePain(section.id);
      return;
    }
    let element = document.createElement('div');
    let left = section.col * this.props.gridSize;
    let top = section.row * this.props.gridSize;
    element.setAttribute('id',this.getCellId(section));
    element.setAttribute('class','body-section-cell');
    element.setAttribute('style',`border-radius: 25px; border: 2px solid black; background-color: ${painLevel.color}; position: absolute; top: ${top}px; left: ${left}px; width: ${this.props.gridSize}px; height: ${this.props.gridSize}px;`)
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
    console.log('bpm componentDidMount');
    console.log(painMarkings);
    painMarkings.map(({section, painLevel}) => {
     this.handleAddBodySelection(section,painLevel)
    });
  }  

  componentDidUpdate(prevProps, prevState){
    const {painMarkings} = this.props;
    console.log('bpm componentDidUpdate');
    console.log(painMarkings);
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

    const {markPain,assessment,side} = this.props;
    if(this.state.activeSection){
      markPain(assessment,side,this.state.activeSection.id,painLevel);
    }

  }

  render(){
    const {bodyImage,replaceContent,restoreContent} = this.props;

    return (
            <div>
              <div onClick={this.handleClickEvent} onTouchTap={this.handleClickEvent} style={{position: 'relative', width: (this.props.gridSize * 15), height: (this.props.gridSize * 26)}} ref={(el) => { this.mapBox= el; }} >
                    <img src={bodyImage} width={(this.props.gridSize * 15)} height={(this.props.gridSize * 26)} />
              </div>
        
              <PainSelectorDialog restoreContent={restoreContent} replaceContent={replaceContent} section={this.state.activeSection} deleteSection={this.handleDeletePain} painLevel={this.state.currentPainLevel} handleClose={this.handleDialogClose} selectPain={this.handleSelectPain} open={this.state.dialogOpen} />
            </div>
           );
  }
}