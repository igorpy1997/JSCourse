function createAccumulator(value = 0){
    let accumulator = 0;
    return function(value){
        accumulator += value;
        return accumulator;
    }
}

const accumulatorFunction = createAccumulator();

console.log(accumulatorFunction(10));
console.log(accumulatorFunction(100));
console.log(accumulatorFunction(5));