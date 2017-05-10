export interface PainLevelInterface{
  id: number;
  title: string;
  description: string;
  image: string;
  level: number;
  color: string;
}

export interface PainLevelsObject {
  [propName: string]: PainLevelInterface;
}

const resolvePainColor = (level) => {
    if(level === 0){
      return '#000000'
    }
    if(level < 3){
      return '#3C9344';
    }
    if(level < 5){
      return '#8FB545';
    }
    if(level < 7){
      return '#EAD23A';
    }
    if(level < 9){
      return '#D67034';
    }
    return '#A12629';
}

export const makePainLevel = (id: number, level: number, title: string, image:string, description: string = ''):PainLevelInterface => {
  return {
    id,
    image,
    title,
    description,
    level,
    color: resolvePainColor(level)
  }
}



export const painLevels:PainLevelInterface[] = [
  makePainLevel(1,0,'0',require('../images/scale_0.jpg'),"No pain"),
  makePainLevel(2,1,'1',require('../images/scale_1.jpg'), "Hardly notice pain"),
  makePainLevel(3,2,'2',require('../images/scale_2.jpg'), "Notice pain, does not interfere with activities"),
  makePainLevel(4,3,'3',require('../images/scale_3.jpg'), "Sometimes distracts me"),
  makePainLevel(5,4,'4',require('../images/scale_4.jpg'), "Distracts me, can do usual activities"),
  makePainLevel(6,5,'5',require('../images/scale_5.jpg'), "Interrupts some activities"),
  makePainLevel(7,6,'6',require('../images/scale_6.jpg'), "Hard to ignore, avoid usual activities"),
  makePainLevel(8,7,'7',require('../images/scale_7.jpg'), "Focus of attention, prevents doing daily activities"),
  makePainLevel(9,8,'8',require('../images/scale_8.jpg'), "Awful, hard to do anything"),
  makePainLevel(10,9,'9',require('../images/scale_9.jpg'), "Can't bear the pain, unable to do anything"),
  makePainLevel(11,10,'10',require('../images/scale_10.jpg'), "As bad as it could be, nothing else matters")
];