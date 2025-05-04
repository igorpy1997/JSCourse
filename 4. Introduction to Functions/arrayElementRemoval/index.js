function removeArrayItem(arr = [], item) {
    return arr.filter(i => i !== item);
}

console.log(`Let's remove from array [1, 2, 3, 4, 5] the element 3
 ${removeArrayItem([1, 2, 3, 4, 5], 3)}`);