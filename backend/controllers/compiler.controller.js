const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.runCode = async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({ success: false, message: "No code provided" });
        }

        // Ensure temp directory exists
        const tempDir = path.join(__dirname, "../temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Generate unique filename to avoid collisions
        const fileId = Date.now().toString();

        // Define file extension and execution command
        let fileName;
        let command;

        switch (language) {
            case "python":
                fileName = `${fileId}.py`;
                command = `python "${path.join(tempDir, fileName)}"`;
                break;
            case "javascript":
                fileName = `${fileId}.js`;
                command = `node "${path.join(tempDir, fileName)}"`;
                break;
            case "java":
                // Java requires class name to match file name. 
                // We'll replace 'public class Main' with 'public class Main<fileId>' or just use Main and accept collisions if we didn't use unique folders.
                // Better strategy for Java: Use a unique folder for each run to allow "Main" class.
                fileName = "Main.java";
                // Override path to be a subdir
                const javaDir = path.join(tempDir, fileId);
                if (!fs.existsSync(javaDir)) fs.mkdirSync(javaDir);
                // Write file to subdir
                fs.writeFileSync(path.join(javaDir, fileName), code);

                command = `javac "${path.join(javaDir, fileName)}" && java -cp "${javaDir}" Main`;

                // We handle writing specifically for Java here, so skip the general write
                break;
            case "cpp":
                fileName = `${fileId}.cpp`;
                const exeNameCpp = process.platform === 'win32' ? `${fileId}.exe` : `${fileId}.out`;
                command = `g++ "${path.join(tempDir, fileName)}" -o "${path.join(tempDir, exeNameCpp)}" && "${path.join(tempDir, exeNameCpp)}"`;
                break;
            case "c":
                fileName = `${fileId}.c`;
                const exeNameC = process.platform === 'win32' ? `${fileId}.exe` : `${fileId}.out`;
                command = `gcc "${path.join(tempDir, fileName)}" -o "${path.join(tempDir, exeNameC)}" && "${path.join(tempDir, exeNameC)}"`;
                break;
            case "go":
                fileName = `${fileId}.go`;
                command = `go run "${path.join(tempDir, fileName)}"`;
                break;
            case "bash":
                fileName = `${fileId}.sh`;
                command = `bash "${path.join(tempDir, fileName)}"`;
                break;
            default:
                return res.status(400).json({ success: false, message: "Unsupported language" });
        }

        // Write file for non-Java languages (Java logic handled above)
        if (language !== "java") {
            fs.writeFileSync(path.join(tempDir, fileName), code);
        }

        // Execute
        exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
            // Cleanup
            try {
                if (language === "java") {
                    const javaDir = path.join(tempDir, fileId);
                    fs.rmSync(javaDir, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(path.join(tempDir, fileName));
                    // Cleanup compiled binaries for C/C++
                    if (language === 'cpp' || language === 'c') {
                        const exePath = path.join(tempDir, process.platform === 'win32' ? `${fileId}.exe` : `${fileId}.out`);
                        if (fs.existsSync(exePath)) fs.unlinkSync(exePath);
                    }
                }
            } catch (e) {
                console.error("Cleanup error:", e);
            }

            if (error) {
                // Return stderr or error message. Note: Exec error includes stderr usually
                return res.status(200).json({
                    success: true,
                    output: stderr || error.message,
                    isError: true
                });
            }

            // Successful execution
            // If there is stderr but no error code (warnings), we append it
            const finalOutput = stdout + (stderr ? `\n\n[Stderr]:\n${stderr}` : "");

            res.status(200).json({
                success: true,
                output: finalOutput
            });
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
