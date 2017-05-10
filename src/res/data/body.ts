export interface BodySectionInterface{
  id: number;
  row: number;
  col: number;
  title: string;
  description: string;
  image: string;
  isBlank: boolean;
  region: string;
}
const makeBodySection = (id: number, row: number, col: number, region: string, image: string, isBlank:boolean = false, title: string ='', description: string = ''):BodySectionInterface => {
  return {
    id,
    row,
    col,
    image,
    title,
    description,
    isBlank,
    region
  }
}

export interface bodiesObjectInterface {
  [propName: string]: BodySectionInterface
}

export const frontBodyMaskRanges = [
  [1,6],
  [10,21],
  [25,36],
  [40,50],
  [56,64],
  [72,78],
  [88,93],
  [103,108],
  [118,123],
  [133,137],
  [149,152],
  [164,167],
  [179,181],
  [195,196],
  [210,211],
  [221,221],
  [225,227],
  [229,230],
  [236,237],
  [240,245],
  [251,260],
  [266,275],
  [281,290],
  [296,305],
  [311,320],
  [326,335],
  [341,351],
  [355,366],
  [370,381],
  [385,390]
];

export const frontBodyMask = frontBodyMaskRanges.reduce((acc,range) => {
  for(let i = range[0]; i <= range[1]; i++){
    acc.push(i);
  }
  return acc;
},[]);

export const backBodyMask = frontBodyMask; //just being lazy for now //TODO

export const bodySectionList:BodySectionInterface[] = [];

const bodyRows = 26;
const bodyCols = 15;
for(let i = 0; i < bodyRows; i++){
  for(let j = 0; j < bodyCols; j++){
    let frontId = (j+(i * 15))+1;
    let backId = bodyRows * bodyCols + frontId;
    let frontImage = '';//require('../images/body_map/front/images/Front_' + frontId + '.png');
    let backImage = '';//require('../images/body_map/back/images/Back_' + frontId + '.png');
    let row = Math.floor((frontId - 1)/15);
    let col = (frontId - 1) % 15;

    bodySectionList.push(
      makeBodySection(frontId, row, col, 'front', frontImage, frontBodyMask.indexOf(frontId) !== -1)
    );

    bodySectionList.push(
      makeBodySection(backId, row, col, 'back', backImage, backBodyMask.indexOf(frontId) !== -1)
    );
  }
}

export const frontBodySectionIds = bodySectionList
                                      .filter((sect) => sect.region === 'front')
                                      .map(sect => sect.id + '');
                                      
export const backBodySectionIds = bodySectionList
                                      .filter((sect) => sect.region === 'back')
                                      .map(sect => sect.id + '');




