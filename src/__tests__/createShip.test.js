import { createShip } from "../factories/createShip";

let destroyer;

beforeEach(()=>{
  destroyer = createShip(4);
});

describe.skip('testing createShips hit method',()=>{
  test('hit test',()=>{
    expect(destroyer.hit()).toBe(1);
  });
  test('multi-hit test',()=>{
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.hit()).toBe(3);
  });
});

describe.skip('testing createShips isSunk method',()=>{
  test('sunk should be false',()=>{
    expect(destroyer.isSunk()).toBe(false);
  });
  test('sunk should be true',()=>{
    destroyer.hit();
    destroyer.hit();
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toBe(true);
  });
})
