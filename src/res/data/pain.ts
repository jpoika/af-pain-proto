export interface PainLevelInterface{
  id: number;
  title: string;
  description: string;
  image: string,
  level: number;
}

export const makePainLevel = (id: number, level: number, title: string, image:string, description: string = ''):PainLevelInterface => {
  return {
    id,
    image: require('../images/' + image),
    title,
    description,
    level
  }
}

export const painLevels:PainLevelInterface[] = [
  makePainLevel(1,0,'0','scale_0.jpg',"To Be Determined"),
  makePainLevel(2,1,'1','scale_1.jpg',"To Be Determined"),
  makePainLevel(3,2,'2','scale_2.jpg',"To Be Determined"),
  makePainLevel(4,3,'3','scale_3.jpg',"To Be Determined"),
  makePainLevel(5,4,'4','scale_4.jpg',"To Be Determined"),
  makePainLevel(6,5,'5','scale_5.jpg',"To Be Determined"),
  makePainLevel(7,6,'6','scale_6.jpg',"To Be Determined"),
  makePainLevel(8,7,'7','scale_7.jpg',"To Be Determined"),
  makePainLevel(9,8,'8','scale_8.jpg',"To Be Determined"),
  makePainLevel(10,9,'9','scale_9.jpg',"To Be Determined"),
  makePainLevel(11,10,'10','scale_10.jpg',"To Be Determined")
];