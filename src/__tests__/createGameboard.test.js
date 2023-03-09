import { createGameboard } from "../factories/createGameboard";

let playerBoard;
let computerBoard;

beforeEach(()=>{
  playerBoard = createGameboard();
  computerBoard = createGameboard();
});

describe.skip('testing gameboard place method',()=>{
  test('test if a single ship is placed correctly',()=>{
    let testShip = playerBoard.place(['B4','C4','D4','E4']);
    expect(testShip['coordinates'].join()).toBe('B4,C4,D4,E4');
    expect(playerBoard['ships']).toContain(testShip);
  });
});

describe.skip('testing gameboard recieveAttack method',()=>{
  let testShip;

  beforeEach(()=>{
    testShip = playerBoard.place(['F7','F8','F9','F10']);
  })

  test('testing if a hit is properly received.',()=>{
    playerBoard.receiveAttack('F9');
    expect(testShip.getDamage()).toBe(1);
  });

  test('testing if multipul hits are properly received.',()=>{
    playerBoard.receiveAttack('F7');
    playerBoard.receiveAttack('F8');
    playerBoard.receiveAttack('F9');
    expect(testShip.getDamage()).toBe(3);
  });

  test('testing if hits and misses are properly received.',()=>{
    playerBoard.receiveAttack('G7');
    expect(testShip.getDamage()).toBe(0);
    playerBoard.receiveAttack('F8');
    expect(testShip.getDamage()).toBe(1);
    playerBoard.receiveAttack('E9');
    expect(testShip.getDamage()).toBe(1);
  });

  test('testing if multipul hits to the same spot count as multipul hits on a ship.',()=>{
    playerBoard.receiveAttack('F8');
    playerBoard.receiveAttack('F8');
    playerBoard.receiveAttack('F8');
    expect(testShip.getDamage()).toBe(1);
  });
});

// describe('testing gameboards ability to keep track of all attacks made',()=>{
//   test('',()=>{

//   });
// });

// describe('testing gameboard win report method',()=>{
//   test('',()=>{

//   });
// });