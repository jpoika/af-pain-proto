import * as React from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
export interface Props { 
   assessments: any;
   appBarTitle(msg: string): any;
   pathOnTouchTap(path:string): any
   cols: number;
}

export interface State { 

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class Assessments extends React.Component<Props, State> {
    componentWillMount () {
      this.props.appBarTitle('Assessments');
    }
    componentWillReceiveProps(nextProps){ //not necessary unless title changes
      this.props.appBarTitle('Assessments');
    }
    render() {
      const {assessments,pathOnTouchTap,cols} = this.props;
      return (
          <div>
            <Helmet>
                <title>Assessments</title>
            </Helmet>
            <GridList
              cols={cols}
              cellHeight={200}
            >
              {assessments.map(tile => {
                return         (
                                 <Link to={'/main/assessment/' + tile.id} key={tile.id}>
                                  <GridTile
                   
                                    title={tile.title}
                                  >
                                    <img src={tile.image} />
                                  </GridTile>
                                  </Link>
                                );
              })}

            </GridList>
          </div>

        );
    }
}