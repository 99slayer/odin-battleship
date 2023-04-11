import { createShip } from '../factories/createShip';

let destroyer;

beforeEach(() => {
  destroyer = createShip(['A1', 'A2', 'A3', 'A4']);
});

describe.skip('testing createShips hit method', () => {
  test('hit test', () => {
    destroyer.hit();
    expect(destroyer.getDamage()).toBe(1);
  });

  test('multi-hit test', () => {
    for (let i = 0; i < 3; i += 1) {
      destroyer.hit();
    };
    expect(destroyer.getDamage()).toBe(3);
  });
});

describe.skip('testing createShips isSunk method', () => {
  test('sunk should be false', () => {
    expect(destroyer.isSunk()).toBe(false);
  });

  test('sunk should be true', () => {
    destroyer.hit();
    destroyer.hit();
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toBe(true);
  });
});
