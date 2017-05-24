import * as React from "react";
import {PainLevelInterface} from '../res/data/pain';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';
import PainExplanation from './PainExplanation';

export interface Props {
  painLevels: PainLevelInterface[];
  replaceContent(content: any): void;
  restoreContent(): void;
  top?: number;
}

export interface State {
}



export default class PainSelector extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      top: -9
  };

  showExplanation = () => {
      const {replaceContent, painLevels,restoreContent} = this.props;
      replaceContent(<PainExplanation restoreContent={restoreContent} painLevels={painLevels} />)
  }

  render(){
    const {top} = this.props;
    return <IconButton style={{position: 'relative',top: top}} onTouchTap={this.showExplanation} ><InfoIcon /></IconButton>;
  }
}