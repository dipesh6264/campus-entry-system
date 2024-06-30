const Code = require('../models/Code');
const compilex = require('compilex');
const os = require('os');

const options = { stats: true };
compilex.init(options);

exports.getIndex = (req, res) => {
    res.render('index');
};

exports.runCode = async (req, res) => {
    const { language, code, input } = req.body;
    let envData;

    if (os.platform() === 'win32') {
        envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // For Windows
    } else {
        envData = { OS: "linux", cmd: "gcc", options: { timeout: 10000 } }; // For Linux/Unix
    }

    try {
        if (language === "C" || language === "C++") {
            if (input) {
                compilex.compileCPPWithInput(envData, code, input, (data) => {
                    handleCompileResponse(res, code, language, input, data);
                });
            } else {
                compilex.compileCPP(envData, code, (data) => {
                    handleCompileResponse(res, code, language, null, data);
                });
            }
        } else if (language === "Java") {
            if (input) {
                compilex.compileJavaWithInput(envData, code, input, (data) => {
                    handleCompileResponse(res, code, language, input, data);
                });
            } else {
                compilex.compileJava(envData, code, (data) => {
                    handleCompileResponse(res, code, language, null, data);
                });
            }
        } else if (language === "Python") {
            if (input) {
                compilex.compilePythonWithInput(envData, code, input, (data) => {
                    handleCompileResponse(res, code, language, input, data);
                });
            } else {
                compilex.compilePython(envData, code, (data) => {
                    handleCompileResponse(res, code, language, null, data);
                });
            }
        } else {
            res.status(400).send("Unsupported language");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const handleCompileResponse = async (res, code, language, input, data) => {
    let result;
    if (data.error) {
        result = data.error;
    } else {
        result = data.output;
    }
    const newCode = new Code({ code, language, input, result });
    await newCode.save();
    // res.render('index', { result });
    res.send(result);
};
