import * as React from "react";
import {BodySectionInterface} from '../../res/data/body';
import {AssessmentInterface} from '../../res/data/assessments';
import {PainLevelInterface} from '../../res/data/pain';
import PainSelectorDialog from '../pain/PainSelectorDialog';
import BodyPainMark from './BodyPainMark';
import BodyPainMarkPrevious from './BodyPainMarkPrevious';
import HistoryIcon from 'material-ui/svg-icons/device/access-time';
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
  previousPainMarkings?: {section:BodySectionInterface, painLevel: PainLevelInterface}[];
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
    gridSize: 20,
    previousPainMarkings: []
  };

  private mapBox;
  private boundingRect;


  constructor(props){
    super(props)

    this.state = {
      dialogOpen: this.props.dialogOpen,
      activeSection: null,
      currentPainLevel: null
    }
  }

  handleClickEvent = (event) => {
     event.preventDefault();
     event.stopPropagation();
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
    //this.state.activeSection && this.handleRemoveBodySelection(this.state.activeSection);
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

  getCalcSectionId = (row,col) => {
    let offset = row * 15;
    return offset + col + 1;
  }


  handleUpdateBoundingClientRect = () => {
    this.boundingRect = this.mapBox.getBoundingClientRect();
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

  gatherCurrentPainLocations = () => {
    const {painMarkings,gridSize,assessment} = this.props;
    if(painMarkings.length === 0){
      return null;
    }
    return painMarkings.map(({section, painLevel}) => {
        // if(painLevel.level === 0){
        //   return null;
        // }
        return <BodyPainMark assessment={assessment} key={this.getCellId(section)} itemClick={this.handleDialogOpen} section={section} painLevel={painLevel} gridSize={gridSize} />
    });
  }

  gatherPreviousPainLocations = () => {
    const {previousPainMarkings,gridSize} = this.props;
    if(previousPainMarkings.length === 0){
      return null;
    }
    return previousPainMarkings.map(({section, painLevel}) => {
        if(painLevel.level === 0){
          return null;
        }
        return <BodyPainMarkPrevious key={this.getCellId(section)} itemClick={this.handleDialogOpen} section={section} painLevel={painLevel} gridSize={gridSize} />
    });
  }

  render(){

    const {bodyImage,replaceContent,restoreContent} = this.props;
    const painMarkings = this.gatherCurrentPainLocations();
    const previousPainMarkings  = this.gatherPreviousPainLocations();
    const iconStyles = {
      width: 20,
      height: 20,
      position: 'relative',
      top: 5
    }
    const hasPreviousMarkings = previousPainMarkings && previousPainMarkings.length > 0;
    return (
            <div>
              {hasPreviousMarkings && <div style={{position: 'absolute', top: 0, left: 180}}><HistoryIcon style={iconStyles} color={'#000000'} /> Last Pain Location</div>}
              <div onClick={this.handleClickEvent}  style={{position: 'relative', width: (this.props.gridSize * 15), height: (this.props.gridSize * 26)}} ref={(el) => { this.mapBox= el; }} >
                      {previousPainMarkings}
                      {painMarkings}
                    <img src={bodyImage} width={(this.props.gridSize * 15)} height={(this.props.gridSize * 26)} />
              </div>
        
              <PainSelectorDialog restoreContent={restoreContent} replaceContent={replaceContent} section={this.state.activeSection} deleteSection={this.handleDeletePain} painLevel={this.state.currentPainLevel} handleClose={this.handleDialogClose} selectPain={this.handleSelectPain} open={this.state.dialogOpen} />
            </div>
           );
  }
}