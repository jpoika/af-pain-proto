import * as React from 'react';
import AppBarPage from '../components/AppBarPage'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';
import MenuDrawer from '../components/MenuDrawer';
import MenuItem from 'material-ui/MenuItem';
import categoriesData,{mainMenu} from '../res/data/menus';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {viewActions} from '../lib/local-t2-view';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

interface Props {
  appBarTitle(msg: string): any;
  menuItems: any[];
  categories: any[];
  pathOnTouchTap(path:string): any
  appConfig: any;
  parentRoute: any;
  flashMessage: {message: string, open: boolean};
  appNameShort: string;
  appNameLong: string;
}

interface State {
 
}
const subMenuItems = (menuItems,pathOnTouchTap) => {
      return menuItems.length ? menuItems.map(menuItem => {

        switch(menuItem.type){
          case 'divider':
            return <Divider key={menuItem.id} />;
          case 'link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'link_absolute':
            return <MenuItem key={menuItem.id} primaryText={menuItem.item.title} href={menuItem.item.path} />;
        }

      }) : null;
}
const createMenuItems = (menuItems,pathOnTouchTap) => {

  const secretTap = (path) => {
    const tapMax = 3;
    let tapCount = 0;
    return (event) => {
      tapCount++;
      if(tapCount >= tapMax){
        pathOnTouchTap(path)(event);
      }
    }
  }

  const conditionalClickAction = (menuItem) => {
    if(menuItem.children.length){
      return null
    }
    return pathOnTouchTap(menuItem.item.path);
  }

  return (
    <IconMenu
      iconButtonElement={<IconButton><MenuIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
          {menuItems.map(menuItem => {
   
            switch(menuItem.type){
              case 'divider':
                return <Divider key={menuItem.id} />;
              case 'link':
                if(menuItem.children.length){
                  return <MenuItem key={menuItem.id} menuItems={subMenuItems(menuItem.children,pathOnTouchTap)} primaryText={menuItem.item.title}  />;
                }
                return <MenuItem key={menuItem.id}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)}  />;
              case 'link_absolute':
                return <MenuItem key={menuItem.id} primaryText={menuItem.item.title} href={menuItem.item.path} />;
            }

          })}
          
          <MenuItem innerDivStyle={{color: 'grey'}} key='version_num' primaryText={'v1.0.0'} onTouchTap={secretTap('debug')} />
    </IconMenu>
  );
}

const backIcon = (path) => {
  return <Link to={path}><IconButton><ArrowBack /></IconButton></Link>
}

class AppContainer extends React.Component<Props, State>{
  render(){
    
    const {menuItems, categories, pathOnTouchTap,appConfig,parentRoute,flashMessage,appNameShort,appNameLong} = this.props;

    const leftIcon = !parentRoute ? createMenuItems(menuItems,pathOnTouchTap) : backIcon(parentRoute.pathname) ;
    return <AppBarPage leftIcon={leftIcon} categories={categories} pathOnTouchTap={pathOnTouchTap} appConfig={appConfig} flashMessage={flashMessage} appNameShort={appNameShort} appNameLong={appNameLong}>
              {this.props.children}
           </AppBarPage>
  }
}

const stateToProps = (state) => {
  return {
    menuItems: mainMenu,
    categories: categoriesData,
    appConfig: {
      parentSite: 'http://afterdeployment.dcoe.mil'
    },
    parentRoute: state.navigation.paths.parent,
    flashMessage: state.view.flash,
    appNameShort: 'Pain Proto',
    appNameLong: 'Air Force Pain Proto'
  }
}
const dispatchToProps = (distatch,ownProps) => {
  return {
    pathOnTouchTap: (path,preventDefault = true) => {
      return (event) => {
        if(preventDefault ){
          event.preventDefault();
          event.stopPropagation();
        }
        distatch(push(path));
      }
    }
  }
}
export default connect(
                  stateToProps,
                  dispatchToProps
                )(AppContainer);
