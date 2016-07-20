Exploring VS Code and Typescript together.

### Start a new Typescript Project

#### Prerequisites
- Node (I like to use nvm)
- Typescript (`npm i -g typescript`)
- VS Code

#### Use the Transpiler

Lets create a file with `touch app.ts` and get started with writing a little greeter.
```
const greet = name => `Welcome to Typescript, ${name}!`
let greeting = greet("Phil")
console.log(greeting)

// Welcome to Typescript, Phil!

```
If we transpile this with `tsc app.ts` we'll find a newly created *app.js* file in the same directory which contains a slightly different code without `const` or arrow function. This happened because the target default configuration for TS is a ES3 output.
With invoking `tsc --target 'ES2015'` though we stay with the exact same code and automatically added semicolons.

This is because Typescript is a superset of Javascript so we can write any arbitrary JS code and transpile it.

#### Types

Lets add some TS features!
The Function `greet` should only take Strings so lets change the signature to
```
const greet = (name: String) => `Welcome to Typescript, ${name}!`
```
notice how the transpiler throws an error if we change the greet invocation to `let greeting = greet(2)`.
```
app.ts(2,22): error TS2345: Argument of type 'number' is not assignable to parameter of type 'String'.
```

Great! We can use types now! If you don't like types yet, keep track of the reason for your Javascript mistakes from now on and count how many of them are related to types.

#### VS Code Workflow
Obviously we don't want to run `tsc app.ts` from the command line every time. This is why we create a build task. Let's open the *Command Palette* with `ctrl` + `shift` + `p` and select *Tasks: Configure Task Runner*. As Language we select *Typescript - tsconfig.json*. This will create the file *.vscode/tasks.json* with a predefined task *tsc*. In order to build/transpile from within our editor though we still need to add a *tsconfig.json* file to the root directory.
>  a TypeScript project is defined via a tsconfig.json file. The presence of such a file in a directory indicates that the directory is the root of a TypeScript project.

*https://code.visualstudio.com/Docs/languages/typescript*

Luckily VSCode provides a `compilerOptions` snippet to fill the file with settings.

![compilerOptions](https://code.visualstudio.com/images/typescript_jsconfigintellisense.png)

Additionally we're going to tell `tsc` it should transpile to ES6 and use sourcemaps (so that we know which lines of TS code turn into which lines of JS).
We'll make our *tsconfig.json* look like this
```
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true
    }
}
```

Awesome! Now we can build the project using `ctrl` + `shift` + `b`. Transpiling to es3 and bundling without the need of *babel* or *webpack* isn't that cool?

And it's only gonna get cooler, personally, debugging node without a browser has never been a joy for me. VSCode though let's you debug inside the editor with all the stepping, watches, call stack and so on how you might know it from Visual Studio or any other IDE/Devtools.

For that to happen we have to tell VSCode how to run our code first. We'll define this by clicking the cogwheel in the debug tab and choosing *Node.js*. In the generated *launch.json* file make sure to change the name of `program` if you didn't name the file `app.ts`. Also we want to set the `preLaunchTask` to `"tsc"` and set `sourceMaps` to `true` so whenever we want to debug the TS gets transpiled and the Breakpoints set in app.ts get set to the according places in the generated app.js.

If we now set a breakpoint within the TS code and hit `F5` the editor should stop the scripts execution at the desired position.

### Snippets
`/usr/share/code/resources/app/extensions/javascript/snippets/javascript.json`


### Most used Hotkeys
Shortcut|Key Strokes
--------|-----------
Delete line|`Ctrl` + `Shift` + `k`
Select Language Mode|`Ctrl` + `k`, `m`
Switch focus to other tab|`ctrl` + `0-9` (0 for SideBar) </br> `ctrl` + `shift` + `alt` + `left or right`
Show output console | `ctrl` + `shift` + `h`
Autoindent | `ctrl` + `i`
Duplicate line | `ctrl` + `shift` + `alt` + `up or down`

### FAQ
What do I need to write Typescript?
> a TypeScript project is defined via a tsconfig.json file. The presence of such a file in a directory indicates that the directory is the root of a TypeScript project.


### Discoveries I liked about VSCode and TypeScript
I definetly discovered some features that I was missing in Atom and Sublime. Which I really like because it's not just about putting yet another Editor out there with some Microsoft branding but really filling a niche.

Coming from a C# and JS background, lets me definitely write TypeScript very intuitively.

I export multiples expressions in *config.ts*:
```
export let font = {
    fontType:"comic-sans",
    fontSize: 16
}

export let paths = {
    home: "/home/phil"
}
```
Importing these from within another file *app.ts* displays a choice different exports within that module.
