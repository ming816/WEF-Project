//https://gist.github.com/semibran/005a9defcec54ea4060cdadf3dc03d83
//https://conwaylife.com/wiki/Run_Length_Encoded
//https://conwaylife.com/wiki/Glider

const decode=(string)=>{
    var cells = []
    var ignore = false
    var step = 1
    var x = 0
    var y = 0
    var match, number
    for (var i = 0; i < string.length; i++) {
      if (ignore) {
        if (string[i] === "\n") {
          ignore = false
        }
        continue
      }
      switch (string[i]) {
        case "#":
        case "x":
        case "!":
          ignore = true
          continue
        case "$":
          x = 0
          y += step
          continue
        case "b":
          x += step
          step = 1
          continue
        case "o":
          for (var j = 0; j < step; j++) {
            cells.push(x++, y)
          }
          step = 1
          continue
      }
      match = string.slice(i).match(/[0-9]+/)
      if (match && !match.index) {
        number = match[0]
        step = parseInt(number)
        i += number.length - 1
      }
    }
    return cells
}

const encode = (arr)=>{
  let cpy = [];
  for (let row of arr){
    cpy.push(row.slice(0,row.lastIndexOf(1)+1));
  }
  const res = cpy.reduce((acc,row)=>{
    const match = row.join("").match(/([1]+)|([0]+)/g);
    let str = [];
    for(let eachMatch of match){
      let len = eachMatch.length;
      str.push(eachMatch[0]==="0"?`${len>1?len:""}b`:`${len>1?len:""}o`);
    }
    acc.push(str.join("").concat("$"));
    return acc;
  },[]);
  return res.join("").concat("!");
}

const glider = [
  [0,1,0],
  [0,0,1],
  [1,1,1]
]
console.log( encode(glider));
