export const createShip = (size) =>{
  let length = size;
  let hits = 0;
  let sunk = false;

  function hit(){
    //pure => only depends on arguments, and no observable side effects
    //if hits is changed this function is no longer pure**??
    //not sure how to write this as a pure function or if I even should.
    hits += 1;
    return hits;
  };

  function isSunk(){
    if(length === hits){
      sunk = true;
    };
    return sunk;
  };

  return {hit,isSunk};
  //only need to test an objects public interface i.e. methods/properties that can be accessed outside of said object
};
