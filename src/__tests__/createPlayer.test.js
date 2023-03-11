import { createPlayer } from "../factories/createPlayer";
let player;
let computer;

beforeEach(()=>{
  player = createPlayer('joe');
  computer = createPlayer('comp',true);
});

describe('testing the computer functionality of createPlayer.',()=>{
  test('testing if attack coordinates are properly generated',()=>{
    for(let i=0;i<30;i+=1){
      computer.makeAttack(player.board);
    };
    console.log(player.board.attacks);
    expect(player.board.attacks.every((e)=>{
      let eArr = e.split('');
      let eLetter = eArr.slice(0,1)[0];
      let eNumber = eArr.slice(1).join('');
      let letterValid = (eLetter.charCodeAt(0) >= 65 && eLetter.charCodeAt(0) <= 76);
      let numberValid = (eNumber>=1 && eNumber<=10);
      if(letterValid && numberValid){
        console.log(`${eLetter+eNumber} is a valid target.`);
        return true;
      };
    })).toBe(true);
  });
});