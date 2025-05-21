export function countElements(array) {
    const result = [];
    const countMap = {};
    array.forEach(element => {
      countMap[element] = (countMap[element] || 0) + 1;
    });

    for (const [key, value] of Object.entries(countMap)) {
      result.push([key, value]);
    }
  
    return result;
  }