import { createGameboard } from "../factories/createGameboard";
//place
//recieveattack
//should keep track of each attack made
//report it all ships sunk

//get ship placements method?

let playerBoard;
let computerBoard;

beforeEach(()=>{
  playerBoard = createGameboard();
  computerBoard = createGameboard();
});

describe('testing gameboard place method',()=>{

  test('tests if a single ship is placed correctly',()=>{
    playerBoard.place('X', 'B4', 4);
    expect(playerBoard['ships'].some((e)=>{
      return e.coordinates.join() === 'B4,C4,D4,E4';
    })).toBe(true);
  });
  
  test('tests to make sure the place method will stop an invalid ship placement',()=>{
    expect(()=>{playerBoard.place('X','J1',4)}).toThrow('ship exceeds the x axis of the gameboard.');
    expect(()=>{playerBoard.place('Y','A10',4)}).toThrow('ship exceeds the y axis of the gameboard.');
  });

});

// describe('testing gameboard recieveAttack method',()=>{
//   test('',()=>{

//   });
// });

// describe('testing gameboards ability to keep track of all attacks made',()=>{
//   test('',()=>{

//   });
// });

// describe('testing gameboard win report method',()=>{
//   test('',()=>{

//   });
// });