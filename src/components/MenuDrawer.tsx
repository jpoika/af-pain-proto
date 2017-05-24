import * as React from "react";
import Menu from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';

/**
 * AppBarMenuIcon provides the left icon in the top navigation bar
 * @param  {[type]} options.paths   [description]
 * @param  {[type]} options.submenu [description]
 * @param  {[type]} options.parent  [description]
 * @return {[type]}                 [description]
 */

interface MyProps {
  paths?: any;
  submenu?: any;
  pathOnTouchTap(path:string): any
}

interface MyState {
  open: boolean;
}

export default class AppBarMenuIconDrawer extends React.Component<MyProps, MyState> {
    constructor (props, context) {
      super(props);
      this.state = {open: false};
    }

    handleToggle = (event) => {
        event.preventDefault();
        event.stopPropagation();

       this.setState({open: !this.state.open});
    }


    handleClosePath = (path) => {
      const {pathOnTouchTap} = this.props;
      return (event) => {
        pathOnTouchTap(path)(event);
        this.setState({open: false});
      }
    }

    handleClose = () => {
      this.setState({open: false});
    }
    render(){
        return (
          <div>
            <IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
              containerStyle={{paddingTop: 60}}
            >
              <Menu onItemTouchTap={this.handleClose} >
                 {this.props.children}
              </Menu>
            </Drawer>
          </div>
          );
    }
}