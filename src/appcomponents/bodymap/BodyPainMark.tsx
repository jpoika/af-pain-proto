import * as React from "react";

//import HistoryIcon from 'material-ui/svg-icons/action/history';
import {BodySectionInterface} from '../../res/data/body';
import {PainLevelInterface} from '../../res/data/pain';

interface Props{
  section: BodySectionInterface;
  painLevel: PainLevelInterface;
  gridSize: number;
  itemClick: (section: BodySectionInterface,painLevel: PainLevelInterface) => void;
}

const BodyPainMark: React.SFC<Props> = (props) => {
    const {section, painLevel,itemClick,gridSize} = props;

    const itemClicked = (event) => {
      itemClick(section,painLevel);
    }


    let left = section.col * gridSize;
    let top = section.row * gridSize;


    const styles = {
      borderRadius: 25, 
      border: '2px solid black', 
      backgroundColor: painLevel.color,
      position: 'absolute' as 'absolute',
      top: top,
      left: left,
      width: gridSize,
      height: gridSize
    };
    
    return <div onTouchTap={itemClicked} style={styles}>

    </div>;
}

export default BodyPainMark;