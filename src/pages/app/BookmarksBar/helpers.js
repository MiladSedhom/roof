import _ from "lodash";

export function getFolders(objOrArray) {
  const filterdList = [];

  const _getFolders = (objOrArray) => {
    if (objOrArray.type === "folder") {
      filterdList.push(objOrArray);
    }
    if (typeof objOrArray === "object") {
      for (let element in objOrArray) {
        _getFolders(objOrArray[element]);
      }
    }
  };

  _getFolders(objOrArray);
  return filterdList;
}

// ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh danti mara bnt ws5aaaa

export function replaceNestedProperty(objOrArray, value, newValue) {
  if (_.isEqual(objOrArray, value)) {
    Object.assign( objOrArray, newValue) // equlivint to call by refrence
    return true;
  }
  if (typeof objOrArray === "object") {
    for (let element in objOrArray) {
      const isSucces = replaceNestedProperty(objOrArray[element] ,value ,newValue);
      if (isSucces) return isSucces;
    }
  }
}

// export function replaceNestedProperty(objOrArray, value, newValue) {
//   for (let element in objOrArray) {
//     if (_.isEqual(objOrArray[element], value)) {
//       objOrArray[element] = newValue;
//       return true;
//     }
//   }
//   if (typeof objOrArray === "object") {
//     return replaceNestedProperty(objOrArray[element], value, newValue);
//   }
// }
