const isUniqueString = string => {
    let isUnique = true;
    const charString = string.split('');
    charString.forEach((char, index) => {
        for (let x = index + 1; x < string.length; x++){
            if (char === charString[x]) {
                isUnique = false;
                break;
            }
        }

    })

    return isUnique;
}

const replaceSpace = string => {
    return string.replace(/' '/, '%20');
}

console.log(isUniqueString('tthiss'));
console.log(replaceSpace('This is replaced'));