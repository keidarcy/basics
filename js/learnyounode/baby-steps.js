const list = process.argv.splice(2);

let sum = 0;
list.forEach((n) => {
  sum += +n;
});

console.log(sum);
