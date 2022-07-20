import React,{useState,useEffect} from 'react'
import Box from './../Components/Box';
import "../Css/SS.css"
import { isValidSudoku, solver } from './../Functions';
export default function SudokuSolver() { 
    const [sudoku,setSudoku]=useState([]);
    useEffect(()=>{
        let code=[];
        for(let i=0;i<9;i++){
            let arr=[];
            for(let j=0;j<9;j++){
               arr.push("");
            }
            code.push(arr);
        }
       setSudoku(code); 

    },[])
    const setValue=(x,y,value)=>{
        let code=[...sudoku];
        code[x][y]=value;
        setSudoku(code);

    }
   const reset=()=>{
        let code=[];
        for (let i = 0; i < 9; i++) {
          let arr = [];
          for (let j = 0; j < 9; j++) {
            arr.push("");
          }
          code.push(arr);
        }
        setSudoku(code);
   }
   
    
    const solve=()=>{
        let code=[...sudoku];
        if(isValidSudoku(code)){
            solver(code,0,0);
            setSudoku(code)
        }else{
            alert("Please write a valid sudoku")
        }
   }
  return (
    <div className="Container">
      <h1 style={{ textAlign: "center", color: "black" }}>
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
                ></Box>
              );
            })}
          </div>
        );
      })}
      <div className="btns">
        <button className="primary" onClick={solve}>
          {" "}
          Solve!
        </button>
        <button className="secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
