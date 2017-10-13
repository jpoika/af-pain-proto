import * as React from "react";
import {BodySectionInterface} from '../../res/data/body';
import {PainLevelInterface} from '../../res/data/pain';
import {AssessmentInterface} from '../../res/data/assessments';
import DecreasedPainPrompt from '../../containers/assessment/DecreasedPainPrompt';
import PromptResponse from '../pain/PromptResponse';

interface Props{
  section: BodySectionInterface;
  painLevel: PainLevelInterface;
  gridSize: number;
  assessment: AssessmentInterface;
  itemClick: (section: BodySectionInterface, painLevel: PainLevelInterface) => void;
}

const BodyPainMark: React.SFC<Props> = (props) => {
    const {section, painLevel,itemClick,gridSize,assessment} = props;

    const itemClicked = (event) => {
      event.preventDefault();
      event.stopPropagation();
      itemClick(section,painLevel);
    }


    let left = section.col * gridSize;
    let top = section.row * gridSize;
    let styles = {
      borderRadius: 25, 
      border: '2px solid black', 
      backgroundColor: painLevel.color,
      position: 'absolute' as 'absolute',
      top: top,
      left: left,
      width: gridSize,
      height: gridSize
    };

    if(painLevel.level === 0){
      styles = {...styles, backgroundColor: 'transparent',border: 'none'};
    }

    //<div onTouchTap={itemClicked} style={styles}>
    return <div onClick={itemClicked} style={styles}>
               <DecreasedPainPrompt assessment={assessment} bodySection={section}>
                  <PromptResponse responseId='thank-you'>
                    Thank you.
                  </PromptResponse>
               </DecreasedPainPrompt>
    </div>;
}

export default BodyPainMark;