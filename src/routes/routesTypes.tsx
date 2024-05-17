import React from "react";

export type TaskAnswer = {
    answer: string,
    taskID: number
}

export type IUser = {
    id?: any | null,
    firstName?: string, 
    lastName?: string, 
    email?: string,
    password?: string,
    roles?: Array<string>,
    token: string
  }

export  type TaskResult = {
    taskId: number,
    taskGrade: number,
    maxTaskGrade: number,
    taskName: string
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
        token: string
    }

    export type Task = {
        task: {
            answer: string,
            data: string,
            description: string,
            id: number,
            maxGrade: number,
            name: string,
            testID: number
        }
        
    }

    type Test = {
        end: string,
        id: number,
        description: string,
        name: string,
        start: string
    }

    export type TestInfo = {
        test: Test
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
              testID: number,
              modules: TaskResult[]
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

    export type TestID = {
        test_id: number
    }

    export type Test = {
        end: string,
        id: number,
        interval: string,
        name: string,
        start: string
    }
    
    export type Tests = {
        tests: Test[]
    }
    
    export type TestResult = {
        result: {
            end: string,
            grade: number,
            id: number,
            start: string,
            studentID: number,
            testID: number,
            modules: TaskResult[]
        }
    }

    export type TaskID = {
        task_id: number
    }
}



