export const createShip = (coordinateArray) =>{
  let coordinates = coordinateArray;
  let length = coordinates.length;
  let damage = 0;
  //pure => only depends on arguments, no observable side effects, the same input must produce the same output everytime.
  //not sure how to write this as a pure function or if I even should.
  function hit(){
    damage += 1;
    return damage;
  };

  function isSunk(){
    if(length === damage){
      return true;
    } else {
      return false;
    };
  };

  return { coordinates, hit, isSunk };
  //only need to test an objects public interface i.e. methods/properties that can be accessed outside of said object
};
