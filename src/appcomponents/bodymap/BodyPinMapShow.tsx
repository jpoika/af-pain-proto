import * as React from "react";
import {BodySectionInterface} from '../../res/data/body';
import {AssessmentInterface} from '../../res/data/assessments';
import {PainLevelInterface} from '../../res/data/pain';


export interface Props{
  title: string;
  bodyImage: string;
  side: string;
  bodySections: BodySectionInterface[];
  painMarkings: {section:BodySectionInterface, painLevel: PainLevelInterface}[];
  gridSize: number;
  assessment: AssessmentInterface;
}

export interface State{

}

export default class BodyPinMapShow extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
    gridSize: 40
  };

  private mapBox;
  private boundingRect;
  //private tempEl;
  private gridMap = {};

  isSectionSaved = (section: BodySectionInterface) => {
     const {painMarkings} = this.props;
     return painMarkings.filter(mark => mark.section.id === section.id).length > 0;
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


  shouldIgnore = (row, col) => {
    const section = this.handleResolveBodySection(row, col);
    return !section || section.isBlank;
  }

  getCellId = (section: BodySectionInterface) => {
    return 'cell_body_' + section.id;
  }

  handleRemoveBodySelection = (section:BodySectionInterface) => {
    delete this.gridMap[this.getCellId(section)];
    let element = document.getElementById(this.getCellId(section));
    if(element){
        //older ie doesn't suppor remove
        if(typeof element.remove=='function'){
           //If support  is found 
           console.log("remove supported")
            element.remove();
        }
        else{
          //If not
          console.log("IE remove")
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
    let element = document.createElement('div');

    let left = section.col * this.props.gridSize;
    let top = section.row * this.props.gridSize;
    element.setAttribute('id',this.getCellId(section));
    element.setAttribute('class','body-section-cell');
    element.setAttribute('style',`border-radius: 25px; border: 2px solid black; background-color: ${painLevel.color}; position: absolute; top: ${top}px; left: ${left}px; width: ${this.props.gridSize}px; height: ${this.props.gridSize}px;`)
    this.mapBox.appendChild(element);

    element.addEventListener('click', (event) => {
      // this.handleDialogOpen(section,painLevel);
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

  render(){
    const {bodyImage} = this.props;

    return (
            <div>
              <div style={{position: 'relative', width: (this.props.gridSize * 15), height: (this.props.gridSize * 26)}} ref={(el) => { this.mapBox= el; }} >
                    <img src={bodyImage} width={(this.props.gridSize * 15)} height={(this.props.gridSize * 26)} />
              </div>
            </div>
           );
  }
}