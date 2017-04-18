export interface BodySectionInterface{
  id: number;
  title: string;
  description: string;
  image: string
}
const makeBodySection = (id: number, image: string, title: string ='', description: string = ''):BodySectionInterface => {
  return {
    id,
    image: require('../images/body_map/' + image),
    title,
    description
  }
}

export const bodySectionList:BodySectionInterface[] = [

makeBodySection(1,'bodyMap2.png'),
makeBodySection(2,'bodyMap3.png'),

makeBodySection(3,'bodyMap5.png'),
makeBodySection(4,'bodyMap6.png'),
makeBodySection(5,'bodyMap7.png'),
makeBodySection(6,'bodyMap8.png'),

makeBodySection(7,'bodyMap9.png'),
makeBodySection(8,'bodyMap10.png'),
makeBodySection(9,'bodyMap11.png'),
makeBodySection(10,'bodyMap12.png'),


makeBodySection(11,'bodyMap13.png'),
makeBodySection(12,'bodyMap14.png'),
makeBodySection(13,'bodyMap15.png'),
makeBodySection(14,'bodyMap16.png'),

makeBodySection(15,'bodyMap17.png'),
makeBodySection(16,'bodyMap18.png'),
makeBodySection(17,'bodyMap19.png'),
makeBodySection(18,'bodyMap20.png'),

makeBodySection(19,'bodyMap22.png'),
makeBodySection(20,'bodyMap23.png'),

makeBodySection(21,'bodyMap26.png'),
makeBodySection(22,'bodyMap27.png'),

makeBodySection(23,'bodyMap30.png'),
makeBodySection(24,'bodyMap31.png')
]
