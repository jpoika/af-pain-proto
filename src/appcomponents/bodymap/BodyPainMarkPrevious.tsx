import * as React from "react";

import HistoryIcon from 'material-ui/svg-icons/device/access-time';
import {BodySectionInterface} from '../../res/data/body';
import {PainLevelInterface} from '../../res/data/pain';

interface Props{
  section: BodySectionInterface;
  painLevel: PainLevelInterface;
  gridSize: number;
  itemClick: (section: BodySectionInterface,painLevel: PainLevelInterface) => void;
}

const BodyPainMarkPrevious: React.SFC<Props> = (props) => {
    const {section, painLevel /*,itemClick*/,gridSize} = props;

    // const itemClicked = (event) => {
    //   itemClick(section,painLevel);
    // }


    let left = section.col * gridSize;
    let top = section.row * gridSize;


    const styles = {
      borderRadius: '50%', 
     // border: `1px solid ${painLevel.color}`, 
      backgroundColor: painLevel.color, //'#AAAAAA',
      position: 'absolute' as 'absolute',
      top: top,
      left: left,
      width: gridSize,
      height: gridSize
    };

    const iconStyles = {
      width: gridSize,
      height: gridSize
    }
    
    return <div style={styles}>
            <HistoryIcon  style={iconStyles} color={'#000000'} />
    </div>;
}

export default BodyPainMarkPrevious;