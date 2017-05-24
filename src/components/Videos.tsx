import * as React from 'react';
import Helmet from 'react-helmet';
import {GridList, GridTile} from 'material-ui/GridList';
import { Link } from 'react-router';

interface MyProps {
  appBarTitle(title: string): any;
  videos: any[];
  cols: number;
  title: string;
}

interface MyState {

}

export default class Videos extends React.Component<MyProps, MyState> {
  componentWillMount(){
      this.props.appBarTitle && this.props.appBarTitle(this.props.title)
  }
  componentWillReceiveProps(nextProps) {
      this.props.appBarTitle && this.props.appBarTitle(this.props.title)
  }

  render(){

  var {videos, cols} = this.props;

    return (
    <div>
        <Helmet>
            <title>Videos</title>
        </Helmet>
      <GridList
        cols={cols}
      >

        {videos.map((tile) => (

          <Link key={tile.id} to={'/main/videos/'+tile.id}  cols={tile.featured ? 1 : 1} >
            <GridTile
              
              
              title={tile.title}
            >
              <img src={tile.img} />
            </GridTile>
          </Link>
        
         
        ))}
      </GridList>

    </div>);
  }

};
