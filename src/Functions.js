export const isValidSudoku = (code) => {
  let ur = {},uc = {};
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (ur[code[i][j]] === undefined) {
        ur[code[i][j]] = 1;
      } else {
        ur[code[i][j]]++;
      }
      if (uc[code[j][i]] === undefined) {
        uc[code[j][i]] = 1;
      } else {
        uc[code[j][i]]++;
      }
    }
    for (let key in ur) {
      // if (key != "") console.log(key, ur[key]);
      if (ur[key] > 1 && key !== "") return false;
    }
    for (let key in uc) {
      // if (key != "") console.log(key, uc[key]);
      if (uc[key] > 1 && key !== "") return false;
    }
    ur = {};
    uc = {};
  }
  ur = {};
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ur = {};
      for (let x = 3 * i; x < 3 * (i + 1); x++) {
        for (let y = 3 * j; y < 3 * (j + 1); y++) {
          if (ur[code[x][y]] === undefined) {
            ur[code[x][y]] = 1;
          } else {
            ur[code[x][y]]++;
          }
        }
      }
      for (let key in ur) {
       
        if (ur[key] > 1 && key !== "") return false;
      }
    }
  }
  return true;
};

export const isValid=(code,x,y)=>{
    let ur = {},
      uc = {};
    for (let i = 0; i < 9; i++) {
     
        if (ur[code[x][i]] === undefined) {
          ur[code[x][i]] = 1;
        } else {
          ur[code[x][i]]++;
        }
        if (uc[code[i][y]] === undefined) {
          uc[code[i][y]] = 1;
        } else {
          uc[code[i][y]]++;
        }
    }
      for (let key in ur) {
        
        if (ur[key] > 1 && key !== "") return false;
      }
      for (let key in uc) {
       
        if (uc[key] > 1 && key !== "") return false;
      }
      ur = {};
      uc = {};
    let bx=Math.floor(x/3),by=Math.floor(y/3);
    
        ur = {};
        for (let i = 3 * bx; i < 3 * (bx+ 1); i++) {
          for (let j = 3 * by; j < 3 * (by + 1); j++) {
            if(code[i][j]===undefined) console.log(code[i][j],i,j,bx,by);
            if (ur[code[i][j]] === undefined) {
              ur[code[i][j]] = 1;
            } else {
              ur[code[i][j]]++;
            }
          } 
        }
        // console.log(code);
        // console.log(ur);
        for (let key in ur) {
          // if (key != "") console.log(key, ur[key]);
          if (ur[key] > 1 && key !== "") return false;
        }
      
    return true;
}
let count=0;
export const solver=(code ,i,j,setValue,vis)=>{
         let r=false;
        if(code[i][j]!=''){
            if(i==8&&j==8) {
             
              return true;
            }
            let x=i,y=j;
            y++;
            if(y>8){
                y=0;
                x++;
            }
            return solver(code,x,y,setValue,vis);
        }else{
            
            for(let k=1;k<=9;k++){
                code[i][j]=String(k);
                if(vis){setTimeout(()=>{
                  setValue(i,j,String(k));
                
                },count*500);
                count++;}
           
                if(isValid(code,i,j)){
                    if(i==8&&j==8) {
                      
                      return true;
                    }
                   let x=i,y=j;
                    y++;
                    if(y>8){
                        y=0;
                        x++;
                    }
                   r= solver(code,x,y,setValue,vis);
                    if(r) return r;
                }
            }
        }
        code[i][j]='';
        if(vis){setTimeout(() => {
          setValue(i, j, "");
         
        }, (count) * 500);
        count++;}
        return r;
}