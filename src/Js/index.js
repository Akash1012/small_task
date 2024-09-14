// Write a sum method which will work properly
// when invoked using either syntax below.
// console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3)); // Outputs 5
function Infinity(...args) {
  return function (...nextArgs) {
    const sum = [...args, ...nextArgs].reduce((acc, curr) => acc + curr, 0);
    if (nextArgs.length) {
      return Infinity(sum);
    }
    return sum;
  };
}

console.log(Infinity(2, 3));
