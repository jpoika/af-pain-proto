export default {
  '1': {
    id: '1',
    name: 'Home',
    routes: ['/','/intro'],
    pathname: '/intro',
    level: 0,
    childrenIds: [],
    parentId: null
  },
  '10': {
    id: '10',
    name: 'Login',
    routes: ['/login'],
    pathname: '/login',
    level: 0,
    childrenIds: [],
    parentId: null
  },
  '2': {
    id: '2',
    name: 'Home',
    routes: ['/main'],
    level: 1,
    pathname: '/main',
    childrenIds: ['6']
  },
  '9': {
    id: '9',
    name: 'Initial Assessment',
    routes: [new RegExp('/main/assessment-start')],
    level: 1,
    pathname: '/main/assessment-start',
    childrenIds: ['5']
  },
  '4': {
    id: '4',
    name: 'Pain Education & Resources',
    routes: ['/main/resources'],
    pathname: '/main/resources',
    level: 1,
    childrenIds: []
  },
  '7': {
    id: '7',
    name: 'Progress & Assessment',
    routes: ['/main/progress'],
    pathname: '/main/progress',
    level: 1,
    childrenIds: []
  },
  '5': {
    id: '5',
    name: 'Pain Reassessment',
    routes: [new RegExp('/main/reassess')],
    level: 2,
    pathname: '/main/reassess',
    childrenIds: [],
  },
  '6': {
    id: '6',
    name: 'New Pain',
    routes: [new RegExp('/main/newpain')],
    level: 2,
    pathname: '/main/newpain',
    childrenIds: []
  },
  '8': {
    id: '8',
    name: 'Med Tracker',
    routes: [new RegExp('/main/mtracker')],
    level: 2,
    pathname: '/main/mtracker',
    childrenIds: []
  },
  '11': {
    id: '11',
    name: 'Extras',
    routes: [new RegExp('/main/extras')],
    level: 2,
    pathname: '/main/extras',
    childrenIds: []
  },
  '12': {
    id: '12',
    name: 'Settings',
    routes: [new RegExp('/main/settings')],
    level: 2,
    pathname: '/main/settings',
    childrenIds: []
  },
  '13': {
    id: '13',
    name: 'Account Home',
    routes: [new RegExp('/main/account-home')],
    level: 2,
    pathname: '/main/account-home',
    childrenIds: ['8','12']
  }
};
