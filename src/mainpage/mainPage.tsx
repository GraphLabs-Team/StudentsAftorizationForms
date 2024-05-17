import React, {Component, useState} from 'react';
import "./mainPage.css"

import {RoutesManager} from "../routes/routes";
import {outputTypes, TaskResult} from "../routes/routesTypes";
//import Module from "./components/module";
type Props = {};
type State = {
  content: string,
  info: outputTypes.Results
}


export {};

declare global {//для просмотра модулей только одной работы
    var glOpen: boolean;
}

export function MModule({name = "",grade = 0,maxgrade = 0}){//отрисовка информации об одном модуле
    
    return(
            <div className={"module"}>
                <p className={"module_name"}>{name}</p>
                <p className="grade">{grade}/{maxgrade}</p>
  
        </div>
    )
}

export function Modules({modules = [{//отрисовка всех модулей
    taskId: 0,
    taskGrade: 0,
    maxTaskGrade: 0,
    taskName: ""
}]}) {
    const arr = [];
    for(let i = 0; i < modules.length; i++) {
        arr.push(
        <MModule 
            name={modules[i].taskName}
            grade={modules[i].taskGrade}
            maxgrade={modules[i].maxTaskGrade}
        />)
    }
    return arr;
  }

export function LLab({grade = 0,modules = [{//отрисовка информации об одной лабораторной работе
    taskId: 0,
    taskGrade: 0,
    maxTaskGrade: 0,
    taskName: ""

}]}){
    const [isOpen, setOpen] = useState(false);
    return(
      <div>
              <div className={"module_info"}>
              <p className={"module_name"}>Лабораторная работа</p>
              <p className={"status"}> { grade > 60 ? "Пройдено": "Не пройдено"}</p>
              <button className={"module_button"} onClick={() => {
                if(!global.glOpen) {
                    setOpen(!isOpen);
                    global.glOpen = !global.glOpen
                }else{
                    if (isOpen) {
                        setOpen(!isOpen);
                        global.glOpen = !global.glOpen
                    }
                }
                
                }}>Модули</button>
              </div>
              <div>
                <nav className={`menu ${isOpen ? "active" : ""}`}>
                <>{Modules({modules})}</>
                </nav>   
              </div>
            </div>
    );
  }

  

function GGetInfo(){//получение информации из бд
    let StudentID = 0//!!!!!!!!!!!!!!!!!!!!!!!!НУЖНО СДЕЛАТЬ ОПРЕДЕЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ТОКЕНУ
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ИЛИ СДЕЛАТЬ НОРМАЛЬНЫЙ ЗАПРОС В БД ПО ТОКЕНУ ПОЛЬЗОВАТЕЛЯ
    let Res: outputTypes.Results = {
        results: [
            {
              end: "",
              grade: 0,
              id: -1,
              start: "",
              studentID: 0,
              testID: 0,
              modules: []
            }
        ]
    }
    const [Ress, setRess] = useState<outputTypes.Results>(Res)

    Res.results.pop()
    RoutesManager.checkResults(setRess)

    
    

    for(let i = 0; i < Ress.results.length; i++) {//отсеивание лишних пользователей
        if (Ress.results[i].studentID != StudentID) {
            continue
        }else{
            Res.results.push(Ress.results[i])
        }

    }

    return Res
    
    
}


export default class  MainPage extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
          this.Getinfo()
      }

    Getinfo(){/////передалать под запрос работ для конкретного пользователя
        /*
        GGetInfo*/

        let TaskResult1:TaskResult  = {
            taskId: 1,
            taskGrade: 43,
            maxTaskGrade: 60,
            taskName: "first module"

        }
        let TaskResult2:TaskResult = {
            taskId: 2,
            taskGrade: 15,
            maxTaskGrade: 20,
            taskName: "second module"

        }
        let TaskResult3:TaskResult = {
            taskId: 3,
            taskGrade: 4,
            maxTaskGrade: 7,
            taskName: "third module"

        }
        let Results: outputTypes.Results = {
            results: [
                {
                  end: "string",
                  grade: 25,
                  id: 0,
                  start: "string",
                  studentID: 0,
                  testID: 0,
                  modules: [TaskResult1,TaskResult2,TaskResult3]
                }
            ]
        }
        Results.results.push(
        {
            end: "string",
            grade: 75,
            id: 0,
            start: "string",
            studentID: 0,
            testID: 0,
            modules: [TaskResult2,TaskResult3]
        })
        Results.results.push(
            {
                end: "string",
                grade: 75,
                id: 0,
                start: "string",
                studentID: 0,
                testID: 0,
                modules: [TaskResult2,TaskResult3]
            })
        this.state = {
            content: "null",
            info: Results
        };
        global.glOpen = false;
/*
        function setter(a: outputTypes.UserToken){}
    
        let testRequestBody = {
            test: {
                end: taskInfo.deadline_end,
                id: 0,
                description: taskInfo.execution_time.toString(),
                name: taskInfo.task_name,
                start: taskInfo.deadline_start
            }
        }


        RoutesManager.insertTest(testRequestBody, setTestId)*/
    }
    
    
    
    
    Labs(n:number) {//отрисовка всех лабораторных работ
        const arr = [];
        for(let i = 0; i < n; i++) {
            arr.push(
            <LLab 
                grade={this.state.info.results[i].grade}
                modules={this.state.info.results[i].modules}
            />)
        }
        return arr;
      }
    render(){
    return (
        

        <body className={"body"}>
            <div>  
                <h1>Результаты прохождения лабораторных работ</h1>
            </div>
            <div className={"main_info"}>
                <>{this.Labs(this.state.info.results.length)}</>
                
                
             
            <button className={"back_button"}>{/*добавить переход на главную*/}
                Главная страница
            </button>
            </div>
        </body>
        
        );
    }
}

