const greet = (name: String) => `Welcome to Typescript, ${name}!`
let greeting = greet("phil")
console.log(greeting)

/**
 * Let's create a tool that enables the user
 * to map command utilities to a gui for ex. a gui for tar
 * 
 * the user will be able to define diferent actions by defining things
 * like name: "extract archive",
 *      command: "tar",
 *      args:["x","z","f"], 
 *      icon: "./assets/extract.svg"
 * and the tool will create a gui for that
 */
import { spawn } from 'child_process'

interface Action {
    command: string
    args?: string[]
}

const execute = (action: Action) => {
    let process = spawn(action.command, action.args)

    process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
    })

    process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
    })

    process.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    })
}

execute({
    command: "pwd",
})

execute({
    command: "ls",
    args: ["-h", "-a", "-l"]
})