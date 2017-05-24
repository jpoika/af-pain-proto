import * as React from "react";
import {Props as PageProps} from '../../components/BasicPage';
import {MedicationInterface} from '../../res/data/medication';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ChipSvgIcon from 'material-ui/svg-icons/image/edit';

const styles = {
  chip: {
    margin: 4,
  }
  ,wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export interface Props extends PageProps {
  medications: MedicationInterface[];
  css?: {[propName: string]: string|number};
  viewPort?: {[propName: string]:{[propName: string]: string|number}}[];
  viewPortSize: string;
  editClick(): void;
}

export interface State {

}
export default class MedicationList extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      css: {width: '100%'},
      viewPort: []
  };

  handleWidth = () => {
    const {viewPort,viewPortSize,css} = this.props;

    let cssStyles = viewPort.filter((vConf) => {
        return typeof vConf[viewPortSize] !== 'undefined';
    }).map(vConf => vConf[viewPortSize]);

    return cssStyles.length > 0 ? cssStyles[0] : css;
  }

  render(){

    const {medications,editClick} = this.props


    return <div style={this.handleWidth()}>
              <h2>Medications</h2>
              <div style={styles.wrapper as any}>
              {medications.map(medication => {
                return <Chip
                          style={styles.chip}
                        >
                    
                        {medication.name}
                      </Chip>
              })}
              {medications.length === 0 && <Chip
                style={styles.chip}
              >
            
                No Medications
              </Chip>}
              <Chip
                onTouchTap={() => editClick()}
                style={{backgroundColor: '#3A7BAD',margin: 4}}

              >
                <Avatar icon={<ChipSvgIcon />} />
                Manage Medications
              </Chip>
              </div>
           </div>;
  }
}