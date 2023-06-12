export const randString = () => {
    const len = 8;
    let randStr = ''
    for(let i=0; i<len; i++){
        const char = Math.floor((Math.random() * 10)+1)
        randStr += char
    }

    return randStr
}