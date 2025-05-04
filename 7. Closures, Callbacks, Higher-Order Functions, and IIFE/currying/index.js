function getProductCarrying(a = 1){
    return function (b = 1){
        return a * b;
    }
}

console.log(getProductCarrying(2)(3));
console.log(getProductCarrying(6)(7))