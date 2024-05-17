import { assert } from 'console';
import React from 'react';
import {inputTypes, outputTypes} from "./routesTypes"
import { RoutesManager } from './routes';


test('authUser', () => {
    function setter(a: outputTypes.UserToken){}

	let regUserBody: inputTypes.UserAuth = {
		email: "string", 
        password: "string"
	}

    assert(RoutesManager.authUser(regUserBody, setter))
});

test('checkResults', () => {
    function setter(a: outputTypes.Results){}

    assert(RoutesManager.checkResults(setter))
});

test('createUser', () => {
    function setter(a: outputTypes.UserToken){}

	let regUserBody: inputTypes.UserReg = {
		email: "string", 
        firstName: "string", 
        lastName: "string", 
        password: "string"
	}

    assert(RoutesManager.createUser(regUserBody, setter))
});

test('createUser', () => {
    function setter(a: outputTypes.Tests){}

    assert(RoutesManager.getTests(setter))
});

test('getTasksFromTest', () => {
    function setter(a: outputTypes.TasksFromTest){}

	let regUserBody: inputTypes.TestID = {
        test_id: 12
	}

    assert(RoutesManager.getTasksFromTest(regUserBody, setter))
});

test('sendAnswers', () => {
    function setter(a: outputTypes.TestResult){}

	let regUserBody: inputTypes.TestAnswer = {
        answers: [
            {
                answer: "string", 
                taskID: 12
            },
            {
                answer: "string", 
                taskID: 13
            }
        ]
            
        , 
        testID: 2,
        token: "1232"
	}

    assert(RoutesManager.sendAnswers(regUserBody, setter))
});