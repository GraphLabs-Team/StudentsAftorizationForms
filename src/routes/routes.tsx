import React from "react";
import {inputTypes, outputTypes} from "./routesTypes"

const baseUrl = "https://localhost:8080"

const authUserUrl = "/auth_user"
const checkResultsUrl = "/check_results"
const createUserUrl = "/create_user"
const getTasksFromTestUrl = "/get_tasks_from_test"
const getTestsUrl = "/get_tests"
const send_answers_url = "/send_answers"
const insertTask = "insert_task"
const insertTest = "insert_test"


class RoutesManager{

    public static authUser(requestBody: inputTypes.UserAuth, setter: (variable: outputTypes.UserToken) => void){
        
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};

        fetch(baseUrl + authUserUrl, requestOptions)
        .then(response => response.json())
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

    public static checkResults(setter: (variable: outputTypes.Results) => void){
        fetch(baseUrl + checkResultsUrl)
        .then(response => response.json())
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

    public static createUser(requestBody: inputTypes.UserReg, setter: (variable: outputTypes.UserToken) => void){
        
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};

        fetch(baseUrl + createUserUrl, requestOptions)
        .then(response => response.json())
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

    public static getTests(setter: (variable: outputTypes.Tests) => void){
        fetch(baseUrl + getTestsUrl)
        .then(response => response.json())
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

    public static getTasksFromTest(requestBody: inputTypes.TestID, setter: (variable: outputTypes.TasksFromTest) => void){
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};
        //console.log("Запрашиваем из Лабораторной", requestBody)
        fetch(baseUrl + getTasksFromTestUrl, requestOptions)
        .then(response => response.json())
        .then(response => {
            //console.log("Получаем Модули", response)
            return response
        })
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

    public static sendAnswers(requestBody: inputTypes.TestAnswer, setter: (variable: outputTypes.TestResult) => void){
        
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};
        //console.log("Запрашиваем ответ", requestBody)
        fetch(baseUrl + send_answers_url, requestOptions)
        .then(response => response.json())
        .then(response => {
            // console.log("Получаем ответ", response)
            return response
        })
        .then(response => setter(response))
        .catch(e => console.log(e))
    }
    
    public static insertTask(requestBody: inputTypes.Task, setter: (variable: outputTypes.TaskID) => void){
        console.log(requestBody)
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};
        fetch(baseUrl + insertTask, requestOptions)
        .then(response => response.json())
        .then(response => {
            return response
        })
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

    public static insertTest(requestBody: inputTypes.TestInfo, setter: (variable: outputTypes.TestID) => void){
    
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};
        fetch(baseUrl + insertTest, requestOptions)
        .then(response => response.json())
        .then(response => {
            return response
        })
        .then(response => setter(response))
        .catch(e => console.log(e))
    }

}

export {RoutesManager};