function isPalindrome(str) {
  return str.replace(/[,\s]/g, "").toLowerCase() ===
    str.replace(/[,\s]/g, "").toLowerCase().split("").reverse().join("")
    ? true
    : false;
}

console.log(isPalindrome("А роза упала на лапу Азора"));
console.log(isPalindrome("Привет"));
