function chunkArray(array, size) {
  let arr = [];

  for (let i = 0; i < array.length; i += size) {
    arr.push(array.slice(i, i + size));
  }
  return arr;
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 4));
