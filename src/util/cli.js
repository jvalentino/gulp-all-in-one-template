const childProcess = require("child_process");
const spawn = childProcess.spawn;

async function execute(command, captureOutput=false, env = {}, directory = ".") {
    const commands = command.split(" ");
    const firstCommand = commands[0];
    const followingCommands = [];
    console.log("> " + command);

    for (let i = 1; i < commands.length; i++) {
        followingCommands.push(commands[i]);
    }

    for (const e in env) {
        process.env[e] = env[e];
    }

    return new Promise(function(resolve, reject) {
        const options = {
            cwd: directory
            
            
        };

        if (captureOutput == false) {
            options.shell = true;
            options.stdio = 'inherit';
        }

        // FIXME: This doesn't actually work
        if (env !== {}) {
            //options["env"] = env;
        }
        const cmd = spawn(firstCommand, followingCommands, options);

        let text = "";

        if (captureOutput) {
            cmd.stdout.on("data", function(data) {
                const output = `${data}`;
                console.log(output.trim());
                text += output;
            });

            cmd.stderr.on("data", function(data) {
                const output = `${data}`;
                console.log(output.trim());
                text += output;

            });
        }

        cmd.on("exit", function(code) {
            console.log("exit code: " + code);
            if (code !== 0) {
                reject(code);
            } else {
                resolve(text);
            }
        });

        cmd.on("error", e => {
            reject(e);
        });
    });
}

module.exports = {
    execute: execute,
};