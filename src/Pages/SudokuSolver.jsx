import React,{useState,useEffect} from 'react'
import Box from './../Components/Box';
import _ from "lodash"
import "../Css/SS.css"
import { isValidSudoku, solver } from './../Functions';
export default function SudokuSolver() { 
    const [sudoku,setSudoku]=useState([]);
    const [preFilled, setpreFilled] = useState([]);
    useEffect(()=>{
       set();

    },[])
    const setValue=(x,y,value,filler=false)=>{
        if(filler){
          preFilled[x][y]=true;
        }
        let code=[...sudoku];
        code[x][y]=value;
        setSudoku(code);
    }
   const set=()=>{
         let code = [];
         let fillTemp = [];
         for (let i = 0; i < 9; i++) {
           let arr = [];
           let arr2 = [];
           for (let j = 0; j < 9; j++) {
             arr.push("");
             arr2.push(false);
           }
           code.push(arr);
           fillTemp.push(arr2);
         }
         setSudoku(code);
         setpreFilled(fillTemp);
         
   }
   const reset=()=>{
    window.location.reload();
   }
    
    const solve=(vis)=>{
        let code=_.cloneDeep(sudoku);
        if(isValidSudoku(code)){
            solver(code,0,0,setValue,vis);
            if(!vis) setSudoku(code);
            
        }else{
            alert("Please write a valid sudoku")
        }
   }
  return (
    <div className="Container">
      <h1 className='head' style={{ textAlign: "center", color: "black" }}>
        Sudoku Solver !
      </h1>
      {sudoku.map((data, index) => {
        return (
          <div className="row">
            {data.map((value, idx) => {
              let classt = `x${index} y${idx}`;

              return (
                <Box
                  class={classt}
                  data={sudoku[index][idx]}
                  x={index}
                  y={idx}
                  set={setValue}
                  preFilled={preFilled[index][idx]}
                ></Box>
              );
            })}
          </div>
        );
      })}
      <div className="btns">
        <button className="primary" onClick={()=>{solve(false)}}>
          {" "}
          Solve!
        </button>
        <button className="primary" onClick={()=>{solve(true)}}>
          {" "}
          Visualise!
        </button>
        <button className="secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
