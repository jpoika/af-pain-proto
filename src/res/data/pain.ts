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
  makePainLevel(1,0,'0','scale_0.jpg',"No pain"),
  makePainLevel(2,1,'1','scale_1.jpg',"Hardly notice pain"),
  makePainLevel(3,2,'2','scale_2.jpg',"Notice pain, does not interfere with activities"),
  makePainLevel(4,3,'3','scale_3.jpg',"Sometimes distracts me"),
  makePainLevel(5,4,'4','scale_4.jpg',"Distracts me, can do usual activities"),
  makePainLevel(6,5,'5','scale_5.jpg',"Interrupts some activities"),
  makePainLevel(7,6,'6','scale_6.jpg',"Hard to ignore, avoid usual activities"),
  makePainLevel(8,7,'7','scale_7.jpg',"Focus of attention, prevents doing daily activities"),
  makePainLevel(9,8,'8','scale_8.jpg',"Awful, hard to do anything"),
  makePainLevel(10,9,'9','scale_9.jpg',"Can't bear the pain, unable to do anything"),
  makePainLevel(11,10,'10','scale_10.jpg',"As bad as it could be, nothing else matters")
];