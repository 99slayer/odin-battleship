import { createShip } from "../factories/createShip";

let destroyer;

//runs before each test**
beforeEach(()=>{
  destroyer = createShip(4);
});

describe('testing createShips hit method',()=>{
  test('hit test',()=>{
    expect(destroyer.hit()).toBe(1);
  });
  test('multi-hit test',()=>{
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.hit()).toBe(3);
  });
});

describe('testing createShips isSunk method',()=>{
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
