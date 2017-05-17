
const categories = [
  {id: 8, title: 'About', path: '/', featured: true, img: ''},
  {id: 7, title: 'Home', path: '/main', featured: true, img: ''},
  {id: 11, title: 'Account Home', path: '/main/account-home', featured: true, img: ''},
  {id: 1, title: 'Initial Assessment',  path: '/main/assessment-start', featured: true, img: ''},
  {id: 2, title: 'Pain Education & Resources',  path: '/main/resources', featured: false, img: ''},
  //{id: 3, title: 'Progress & Assessment',  path: '/main/progress', featured: false, img: ''},
  {id: 4, title: 'Pain Reassessment',  path: '/main/reassess', featured: false, img: ''},
  {id: 5, title: 'New Pain',  path: '/main/newpain', featured: false, img: ''},
  {id: 10, title: 'Med Tracker',  path: '/main/mtracker', featured: false, img: ''},
  {id: 6, title: 'Extras',  path: '/main/extras', featured: false, img: ''},
  {id: 9, title: 'Settings',  path: '/main/settings', featured: false, img: ''},
  {id: 12, title: 'Test Alert Screen',  path: '/main/test-signaler', featured: false, img: ''}
];

const categoriesMap = categories.reduce((acc,cat) => {
  acc[cat.id] = cat
  return acc;
}, {});

export const mainMenu = [
/*
    {id: 1, type: 'divider' , item: {}, children: []},
    {id: 2, type: 'nonauth_link' , item: categoriesMap[7], children: []},
    {id: 16, type: 'auth_link' , item: categoriesMap[11], children: []},

    {id: 3, type: 'divider' , item: {}, children: []},
    {id: 4, type: 'link' , item: categoriesMap[1], children: []},
    {id: 11, type: 'link' , item: categoriesMap[4], children:[]},
     */
 

    //{id: 6, type: 'link' , item: categoriesMap[3], children: []},
    {id: 15, type: 'divider' , item: {}},
    {id: 5, type: 'link' , item: categoriesMap[2], children: []},
    {id: 7, type: 'link' , item: categoriesMap[6], children: []},
    {id: 8, type: 'link' , item: categoriesMap[9], children: []},
    {id: 16, type: 'link' , item: categoriesMap[8], children: []},
    {id: 10, type: 'divider' , item: {}},
    //{id: 14, type: 'link' , item: categoriesMap[12], children: []},
];

export default categories;