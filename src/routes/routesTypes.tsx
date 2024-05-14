import React from "react";

type TaskAnswer = {
    answer: string, 
    taskID: number
}

export namespace inputTypes{
    export type UserAuth = {
        email: string, 
        password: string
    }

    export type UserReg = {
        email: string, 
        firstName: string, 
        lastName: string, 
        password: string
    }

    export type TestID = {
        test_id: number
    }

    export type TestAnswer = {
        answers: TaskAnswer[], 
        testID: number
    }
}

export namespace outputTypes{
    export type UserToken = {
        token: string
    }
    
    export type Results = {
        results: [
            {
              end: string,
              grade: number,
              id: number,
              start: string,
              studentID: number,
              testID: number
            }
        ]
    }
    
    export type TasksFromTest = {
        tasks: [
            {
              answer: string,
              data: string,
              id: number,
              maxGrade: number,
              name: string
            }
        ]
    }
    
    export type Tests = {
        tests: [
            {
              end: string,
              id: number,
              interval: string,
              name: string,
              start: string
            }
        ]
    }
    
    export type TestResult = {
        "result": {
            end: string,
            grade: number,
            id: number,
            start: string,
            studentID: number,
            testID: number
        }
    }
}



