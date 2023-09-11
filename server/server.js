// Create a server side for ontoGPT mode to allow running child_process node
// Developed by Nannaphat Keamanuchet
// Please activate node server.js in the file directory before starting WebVOWL in a separate terminal page.
const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/execute-command", (req, res) => {
    const command = req.query.command;
    const param1 = req.query.param1;
    const param2 = req.query.param2;
    const param3 = req.query.param3;
    const param4 = req.query.param4;
    const param5 = req.query.param5;
    const param6 = req.query.param6;
    const param7 = req.query.param7;
    const fileparts = param5.split("/");
    const filename = fileparts[fileparts.length - 1];
    // Execute the command using child_process
    const child = spawn(
        command,
        [param1, param2, param3, param4, param5, param6, param7],
        { shell: true }
    );

    let error = "";

    child.stderr.on("data", (data) => {
        error += data.toString();
    });

    child.on("close", (code) => {
        if (code === 0) {
            res.attachment(filename);
            child.stdout.pipe(res);
        } else {
            console.error("Command execution error:", error);
            res.status(500).json({ error: "Command execution failed" });
        }
    });

    child.on("error", (err) => {
        console.error("Child process error:", err);
        res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
