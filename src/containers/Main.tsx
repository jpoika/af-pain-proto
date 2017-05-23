import * as React from 'react';
import AppBarPage from '../components/AppBarPage'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AlarmSet from 'material-ui/svg-icons/action/alarm';
import { Link } from 'react-router';
import MenuDrawer from '../components/MenuDrawer';
import MenuItem from 'material-ui/MenuItem';
import TrackChangesIcon from 'material-ui/svg-icons/action/track-changes';
import DoneIcon from 'material-ui/svg-icons/action/done';

import categoriesData,{mainMenu} from '../res/data/menus';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {alertNurseDialogueOpen} from '../actions/nurse';
import {addAssessmentIfNecessary} from '../actions/assessment';

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
  user: {authenticated: boolean}
  alertNurse(): any;
  initAssessComplete: boolean;
}

interface State {
 
}

const userMenuFilter = (items,user) => {
  return items.filter((item) => {

        switch(item.type){
          case 'auth_link':
            if(user.authenticated){
              return false;
            }
            break;
          case 'nonauth_link':
            if(!user.authenticated){
              return false;
            }
            break;
        }
        return true;

  });
}

const makeLink = (user,menuItem,pathOnTouchTap) => {
    if(menuItem.children.length){
      return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)} primaryText={menuItem.item.title}  />;
    }
    return <MenuItem key={menuItem.id}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)}  />;
}
const subMenuItems = (user,menuItems,pathOnTouchTap) => {
     
      var menuItemsFinal = menuItems.length ? userMenuFilter(menuItems,user).map(menuItem => {

        switch(menuItem.type){
          case 'divider':
            return <Divider key={menuItem.id} />;
          case 'auth_link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'nonauth_link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'link_absolute':
            return <MenuItem key={menuItem.id} primaryText={menuItem.item.title} href={menuItem.item.path} />;
        }

      }) : null;
    
      return menuItemsFinal;
}
const createMenuItems = (user, menuItems,pathOnTouchTap,initAssessComplete) => {

  const secretTap = (path) => {
    const tapMax = 3;
    let tapCount = 0;
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
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
           <Divider key={'menu_top_divider'} />
             <MenuItem key={'menu_top_home'}  primaryText="Home" onTouchTap={pathOnTouchTap('/main/account-home')}  />
             {!initAssessComplete && <MenuItem key={'menu_top_init_assess'} rightIcon={initAssessComplete ? <DoneIcon color={'green'} /> : null} primaryText="Initial Assessment" onTouchTap={pathOnTouchTap('/main/assessment-start')}  />}
             <MenuItem key={'menu_top_reassess'} rightIcon={initAssessComplete ? <AlarmSet /> : null} disabled={!initAssessComplete} primaryText="Pain Reassessment" onTouchTap={pathOnTouchTap('/main/reassess')}  />
             
             <MenuItem key={'menu_top_new_pain'} primaryText="New Pain" disabled={!initAssessComplete} onTouchTap={pathOnTouchTap('/main/newpain')} />
             <MenuItem key={'menu_top_med_tracker'} rightIcon={<TrackChangesIcon color={'#3A7BAD'} />} primaryText="Med Tracker" onTouchTap={pathOnTouchTap('/main/mtracker')}  />
             {/*<MenuItem key={'menu_top_test'} primaryText="Test" onTouchTap={pathOnTouchTap('/main/assess-overview')} />*/}
          {userMenuFilter(menuItems,user).map(menuItem => {
            
            switch(menuItem.type){
              case 'divider':
                return <Divider key={menuItem.id} />;
              case 'link':
                return makeLink(user,menuItem,pathOnTouchTap);
              case 'link_absolute':
                return <MenuItem key={menuItem.id} primaryText={menuItem.item.title} href={menuItem.item.path} />;
              case 'auth_link':
                return makeLink(user,menuItem,pathOnTouchTap);
              case 'nonauth_link':
                return makeLink(user,menuItem,pathOnTouchTap);
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
    
    const {user, menuItems, categories, pathOnTouchTap,appConfig,parentRoute,flashMessage,appNameShort,appNameLong,alertNurse,initAssessComplete} = this.props;

    const leftIcon = !parentRoute ? createMenuItems(user, menuItems,pathOnTouchTap,initAssessComplete) : backIcon(parentRoute.pathname) ;
    return <AppBarPage alertNurse={alertNurse} leftIcon={leftIcon} categories={categories} pathOnTouchTap={pathOnTouchTap} appConfig={appConfig} flashMessage={flashMessage} appNameShort={appNameShort} appNameLong={appNameLong}>
              {this.props.children}
           </AppBarPage>
  }
}

const getParentRouteSafe = (state) => {
  //sometimes the when the current and parent pathname are the same (not sure why yest)
  // The left icon stays locked in the back position whic prevents navigation.
  const currentPathName = state.navigation.paths.current.pathname;
  const parent = state.navigation.paths.parent;
  if(parent && parent.pathname !== currentPathName){
    return state.navigation.paths.parent;
  }
  return null;
}

const stateToProps = (state) => {
  return {
    menuItems: mainMenu,
    categories: categoriesData,
    appConfig: {
      parentSite: 'http://afterdeployment.dcoe.mil'
    },
    parentRoute: getParentRouteSafe(state),
    flashMessage: state.view.flash,
    appNameShort: 'Pain Proto',
    appNameLong: 'Air Force Pain Proto',
    user: state.user,
    initAssessComplete: typeof state.assessments['1'] !== 'undefined' && state.assessments['1'].isComplete ? true : false
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    pathOnTouchTap: (path,preventDefault = true) => {
      return (event) => {
        if(preventDefault ){
          event.preventDefault();
          event.stopPropagation();
        }
        if(path == '/main/reassess'){
          dispatch(addAssessmentIfNecessary('reassessment'));
        }
        if(path == '/main/newpain'){
      
          dispatch(addAssessmentIfNecessary('newpain'));
        }
        dispatch(push(path));
      }
    },
    alertNurse: () => {
      dispatch(alertNurseDialogueOpen())
    }
  }
}
export default connect(
                  stateToProps,
                  dispatchToProps
                )(AppContainer);
