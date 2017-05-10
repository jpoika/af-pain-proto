import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import MainAssessmentWizardContainer from '../containers/MainAssessmentWizard';
import {BodySectionInterface} from '../res/data/body';
import {PainLevelInterface} from '../res/data/pain';

export interface Props{
  title: string;
  bodyImage: string;
  assessmentId: number;
  side: string;
  markPain(assessmentId: number, side: string, sectionId: number, painLevel: PainLevelInterface): any
}

export interface State{

}

export default class BodyImageMap extends React.Component<Props, State>{
  render(){
    const {title,bodyImage} = this.props
    return <div>
<img src={bodyImage} width="750" height="1300" useMap="#map" />

<map name="map">
<area shape="rect" coords="351,0,396,45" />
<area shape="rect" coords="396,0,441,45"   />
<area shape="rect" coords="306,0,351,45"   />
<area shape="rect" coords="306,45,351,90"   />
<area shape="rect" coords="351,45,396,90"   />
<area shape="rect" coords="397,45,441,90"   />
<area shape="rect" coords="306,90,351,135"   />
<area shape="rect" coords="351,90,396,135"   />
<area shape="rect" coords="396,90,441,135"   />
<area shape="rect" coords="276,136,465,194"   />
<area shape="rect" coords="336,195,411,330"   />
<area shape="rect" coords="186,195,336,330"   />
<area shape="rect" coords="411,195,561,330"   />
<area shape="rect" coords="336,330,411,555"   />
<area shape="rect" coords="261,330,336,555"   />
<area shape="rect" coords="411,330,486,555"   />
<area shape="rect" coords="156,330,261,435"   />
<area shape="rect" coords="486,330,591,435"   />
<area shape="rect" coords="501,435,621,480"   />
<area shape="rect" coords="141,435,261,480"   />
</map>
       
    </div>;
  }
}

