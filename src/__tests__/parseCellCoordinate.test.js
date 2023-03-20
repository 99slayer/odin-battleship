import { parseCellCoordinate } from "../parseCellCoordinate";

describe.skip('testing parseCellCoordinate function',()=>{
  test('testing 2 number coordinates.',()=>{
    expect(parseCellCoordinate('1-2')).toBe('A2');
    expect(parseCellCoordinate('7-7')).toBe('G7');
  });

  test('testing 2 digit number coordinates.',()=>{
    expect(parseCellCoordinate('10-3')).toBe('J3');
    expect(parseCellCoordinate('5-10')).toBe('E10');
    expect(parseCellCoordinate('10-10')).toBe('J10');
  });
})