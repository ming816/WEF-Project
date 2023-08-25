let patternText = `
         
     x     
    x x    
   xxxxx   
  x     x  
 x       x 
           
`

console.log(patternText)

let lines = patternText.split('\n')
lines = lines.slice(1, lines.length - 1)

let pattern = (lines.map(line => line.split('').map(char => char == 'x')))

pattern.forEach((xs,y)=>{
    xs.forEach((alive,x)=>{
      console.log({x,y,alive})
})
})

// patternText.split('\n')
// )