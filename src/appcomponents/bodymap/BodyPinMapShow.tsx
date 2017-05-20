import * as React from "react";
import MainAssessmentWizardContainer from '../../containers/MainAssessmentWizard';
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
    let contentElement = document.createElement('div');
    const levelLeftOffset = painLevel.level > 9 ? '0' : '6';
    contentElement.setAttribute('style',`color: ${painLevel.color}; font-size: 1.3em; margin: 1px 0px 0px ${levelLeftOffset}px;`);
    var painLevelContent = document.createTextNode(painLevel.level + '');
    contentElement.appendChild(painLevelContent);

    
    
    element.appendChild(contentElement);
    let left = section.col * this.props.gridSize;
    let top = section.row * this.props.gridSize;
    element.setAttribute('id',this.getCellId(section));
    element.setAttribute('class','body-section-cell');
    element.setAttribute('style',`border-radius: 25px; border: 2px solid black; background-color: white; position: absolute; top: ${top}px; left: ${left}px; width: ${this.props.gridSize}px; height: ${this.props.gridSize}px;`)
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
    const {title,bodyImage,painMarkings} = this.props;

    return (
            <div style={{overflow: 'auto'}}>
              <div style={{position: 'relative', width: (this.props.gridSize * 15), height: (this.props.gridSize * 26)}} ref={(el) => { this.mapBox= el; }} >
                    <img src={bodyImage} width={(this.props.gridSize * 15)} height={(this.props.gridSize * 26)} />
              </div>
            </div>
           );
  }
}