const solution = require("./solution");

// PART 1

// Example from day
(() => {
  var result = solution.computeHashSum_1(
    "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
  );

  var expected = 1320;

  if (result === expected)
    console.log("Passed");
  else 
    console.log(`Failed: Expected ${expected}, Received ${result}`);
})();
