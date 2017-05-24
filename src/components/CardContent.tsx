import * as React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export interface Props { 
  content: {title: string, content: string, subtitle: string}
  image: string;
  actions: any[];
}

export interface State { 

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class CardContent extends React.Component<Props, State> {
    //<CardTitle title={subtitle} />
    render() {
      const {content,image,actions} = this.props;
      let cardHeader = null;
      if(image){
        cardHeader = (<CardMedia
                      overlay={<CardTitle title={content.title} subtitle={content.subtitle} />}
                      >
                      <img src={image} />
                    </CardMedia>);
      } else {
        cardHeader = <CardHeader
                title={content.title}
                subtitle={content.subtitle}
              />
      }
      return (
                <Card>
                    {cardHeader}
                    
                    <CardText>
                     
                      <div dangerouslySetInnerHTML={{__html: content.content}} />
                      {this.props.children}
                    </CardText>
                    <CardActions>
                      {actions.map(act => <FlatButton key={act.label} onTouchTap={act.action} label={act.label} />)}
                    </CardActions>
                </Card>
              );
    }
}