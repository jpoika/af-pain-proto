import * as React from "react";
import {BodySectionInterface} from '../../res/data/body';
import {AssessmentInterface} from '../../res/data/assessments';
import {PainLevelInterface} from '../../res/data/pain';
import BodyPainMark from './BodyPainMark';

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

  getCellId = (section: BodySectionInterface) => {
    return 'cell_body_show' + section.id;
  }

  getCalcSectionId = (row,col) => {
    let offset = row * 15;
    return offset + col + 1;
  }


  handleUpdateBoundingClientRect = () => {
    this.boundingRect = this.mapBox.getBoundingClientRect();
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
        return <BodyPainMark assessment={assessment} key={this.getCellId(section)} itemClick={() => {}} section={section} painLevel={painLevel} gridSize={gridSize} />
    });
  }
  render(){
    const {bodyImage} = this.props;
    const painMarkings = this.gatherCurrentPainLocations();
    return (
            <div>
              <div style={{position: 'relative', width: (this.props.gridSize * 15), height: (this.props.gridSize * 26)}} ref={(el) => { this.mapBox= el; }} >
                {painMarkings}
                <img src={bodyImage} width={(this.props.gridSize * 15)} height={(this.props.gridSize * 26)} />
              </div>
            </div>
           );
  }
}