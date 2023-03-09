import { createGameboard } from "../factories/createGameboard";

let playerBoard;
let computerBoard;

beforeEach(()=>{
  playerBoard = createGameboard();
  computerBoard = createGameboard();
});

describe('testing gameboard place method',()=>{
  test('test if a single ship is placed correctly',()=>{
    let testShip = playerBoard.place(['B4','C4','D4','E4']);
    expect(playerBoard.fleetCoordinates().includes(testShip.coordinates)).toBe(true);
  });
});

describe('testing gameboard recieveAttack method',()=>{
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

describe('testing gameboard isFleetSunk method',()=>{
  let testShip1;
  let testShip2;
  let testShip3;

  beforeEach(()=>{
    testShip1 = playerBoard.place(['A1','A2','A3']);
    testShip2 = playerBoard.place(['E5','E6','E7']);
    testShip3 = playerBoard.place(['B3','C3','D3']);

    playerBoard.receiveAttack('A1');
    playerBoard.receiveAttack('A2');
    playerBoard.receiveAttack('A3');
    playerBoard.receiveAttack('E5');
    playerBoard.receiveAttack('E6');
    playerBoard.receiveAttack('E7');
    playerBoard.receiveAttack('B3');
  });

  test('testing if isFleetSunk properly reports the fleet as not sunk.',()=>{
    expect(playerBoard.isFleetSunk()).toBe(false);
  });

  test('testing if isFleetSunk properly reports the fleet as sunk.',()=>{
    playerBoard.receiveAttack('C3');
    playerBoard.receiveAttack('D3');
    expect(playerBoard.isFleetSunk()).toBe(true);
  });
});