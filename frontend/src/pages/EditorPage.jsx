
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = [
    { label: "Python", value: "python", monaco: "python" },
    { label: "JavaScript", value: "javascript", monaco: "javascript" },
    { label: "Java", value: "java", monaco: "java" },
    { label: "C++", value: "cpp", monaco: "cpp" },
    { label: "C", value: "c", monaco: "c" },
    { label: "Go", value: "go", monaco: "go" },
    { label: "Bash", value: "bash", monaco: "shell" },
];

const STARTER_CODE = {
    python: 'print("Hello, Future!")',
    javascript: 'console.log("Hello, Future!");',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Future!");\n    }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, Future!" << endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, Future!\\n");\n    return 0;\n}',
    go: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Future!")\n}',
    bash: 'echo "Hello, Future!"',
};

const EditorPage = () => {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null); // null means Scratchpad

    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(STARTER_CODE["javascript"]);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectLang, setNewProjectLang] = useState("javascript");

    const navigate = useNavigate();

    // Load User & Projects
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
            navigate("/login");
        } else {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                fetchProjects(token);
            } catch (err) {
                console.error("Corrupted user data in localStorage, clearing...", err);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    }, [navigate]);

    const fetchProjects = async (token) => {
        try {
            const response = await axios.post("http://localhost:3000/getProjects", { token });
            if (response.data.success) {
                setProjects(response.data.projects);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
            toast.error("Could not load projects");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    // --- Run Code ---
    const handleRun = async () => {
        setIsRunning(true);
        setOutput("Running...");
        try {
            const response = await axios.post("http://localhost:3000/run", {
                code,
                language,
            });
            if (response.data.success) {
                setOutput(response.data.output);
            } else {
                setOutput(response.data.message || "Error occurred");
            }
        } catch (error) {
            setOutput(error.response?.data?.output || error.message || "Execution failed");
        } finally {
            setIsRunning(false);
        }
    };

    // --- Projects ---
    const handleCreateProject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:3000/createProject", {
                name: newProjectName,
                projLanguage: newProjectLang,
                token,
                version: "1.0.0"
            });

            if (response.data.success) {
                toast.success("Project created!");
                setShowCreateModal(false);
                setNewProjectName("");
                fetchProjects(token); // Refresh list
                // Optionally switch to new project immediately:
                // loadProject(response.data.projectId); // Needs separate logic if we want this
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Failed to create project");
        }
    };

    const handleSaveProject = async () => {
        if (!currentProject) {
            toast.info("Create a project to save your work permanently.");
            setShowCreateModal(true);
            return;
        }

        setIsSaving(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:3000/saveProject", {
                projectId: currentProject._id,
                code,
                token
            });
            if (response.data.success) {
                toast.success("Project saved successfully!");
            }
        } catch {
            toast.error("Failed to save project");
        } finally {
            setIsSaving(false);
        }
    };

    const loadProject = async (projectId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:3000/getProject", {
                projectId,
                token
            });

            if (response.data.success) {
                const proj = response.data.project;
                setCurrentProject(proj);
                setCode(proj.code);
                setLanguage(proj.projectLanguage);
                setOutput(""); // Clear output on switch
            }
        } catch {
            toast.error("Failed to load project");
        }
    };

    const switchToScratchpad = () => {
        setCurrentProject(null);
        setCode(STARTER_CODE["javascript"]);
        setLanguage("javascript");
        setOutput("");
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        if (!currentProject) {
            // Only reset code if in scratchpad mode, or maybe user wants to convert?
            // For now, let's just reset to starter code if the user manually changes language
            // to avoid weird syntax errors in the new language.
            setCode(STARTER_CODE[lang] || "");
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col relative bg-[#030712] text-slate-100 font-sans overflow-hidden">
            <ToastContainer position="bottom-right" theme="dark" />

            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Navbar */}
            <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 h-16 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        AI
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">
                        Code<span className="text-blue-400">Gen</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Current Project Indicator */}
                    <div className={`px-4 py-1.5 rounded-full text-xs font-medium border ${currentProject ? 'border-purple-500/30 bg-purple-500/10 text-purple-300' : 'border-slate-500/30 bg-slate-500/10 text-slate-300'} `}>
                        {currentProject ? `Project: ${currentProject.name} ` : 'Scratchpad Mode'}
                    </div>

                    <span className="text-slate-300 text-sm font-medium hidden sm:block">
                        Hello, <span className="text-white relative neon-border px-2 py-1 rounded-md">{user.fullName}</span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Layout: Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden relative z-10">

                {/* Sidebar */}
                <aside className="w-64 glass border-r border-white/5 flex flex-col hidden md:flex">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-300">My Projects</h3>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="p-1.5 rounded-md hover:bg-blue-600/20 text-blue-400 transition-colors"
                            title="New Project"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        <button
                            onClick={switchToScratchpad}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!currentProject ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                } `}
                        >
                            ✨ Scratchpad
                        </button>

                        {projects.map((proj) => (
                            <button
                                key={proj._id}
                                onClick={() => loadProject(proj._id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${currentProject && currentProject._id === proj._id
                                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                    } `}
                            >
                                <span className="truncate">{proj.name}</span>
                                <span className="text-[10px] uppercase opacity-50 border border-slate-600 px-1 rounded bg-slate-800">
                                    {proj.projectLanguage?.slice(0, 2)}
                                </span>
                            </button>
                        ))}

                        {projects.length === 0 && (
                            <div className="text-center text-slate-600 text-xs py-10 italic">
                                No projects yet. <br /> Create one to start building!
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Work Area */}
                <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">

                    {/* Editor Column */}
                    <div className="flex flex-col gap-4 animate-fadeIn h-full">
                        {/* Toolbar */}
                        <div className="glass p-3 rounded-xl flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <select
                                    value={language}
                                    onChange={handleLanguageChange}
                                    disabled={currentProject !== null} // Lock language in project mode? Or allow changing? Let's lock it for consistency with backend model which has fixed lang
                                    className={`bg-slate-900 border border-slate-700 text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 text-sm min-w-[140px] ${currentProject ? 'opacity-50 cursor-not-allowed' : ''} `}
                                    title={currentProject ? "Language is set for this project" : "Select language"}
                                >
                                    {LANGUAGES.map((lang) => (
                                        <option key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>

                                {currentProject && (
                                    <button
                                        onClick={handleSaveProject}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        {isSaving ? (
                                            <span className="animate-pulse">Saving...</span>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                                Save
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className={`btn-primary flex items-center gap-2 text-sm ${isRunning ? 'opacity-70 cursor-wait' : ''} `}
                            >
                                {isRunning ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Executing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Run Code
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Monaco Editor */}
                        <div className="flex-1 glass rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            <Editor
                                height="100%"
                                language={LANGUAGES.find(l => l.value === language)?.monaco || "javascript"}
                                value={code}
                                onChange={(value) => setCode(value)}
                                theme="vs-dark"
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                                    fontLigatures: true,
                                    padding: { top: 20 },
                                    lineHeight: 24,
                                    automaticLayout: true,
                                }}
                            />
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="flex flex-col gap-4 animate-fadeIn h-full" style={{ animationDelay: '0.1s' }}>
                        <div className="glass p-4 rounded-xl flex items-center justify-between shrink-0">
                            <h2 className="font-semibold text-slate-200 flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Terminal
                            </h2>
                            <button
                                onClick={() => setOutput("")}
                                className="text-xs text-slate-400 hover:text-white transition-colors border border-slate-700 px-3 py-1 rounded hover:bg-slate-700"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="flex-1 glass rounded-xl overflow-hidden border border-slate-700/50 p-6 font-mono text-sm relative flex flex-col">
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="relative z-10 h-full overflow-auto custom-scrollbar">
                                {output ? (
                                    <pre className="whitespace-pre-wrap leading-relaxed text-green-400">
                                        {output}
                                    </pre>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-600 select-none">
                                        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                        </svg>
                                        <p>Ready to compile...</p>
                                        <p className="text-xs mt-2 opacity-50">Press "Run Code" to execute</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </main>
            </div>

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="glass p-8 rounded-2xl w-full max-w-md border border-slate-600 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-white">New Project</h2>
                        <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Project Name</label>
                                <input
                                    type="text"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    className="input-futuristic"
                                    placeholder="e.g. My Algorithm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Language</label>
                                <select
                                    value={newProjectLang}
                                    onChange={(e) => setNewProjectLang(e.target.value)}
                                    className="input-futuristic"
                                >
                                    {LANGUAGES.map((lang) => (
                                        <option key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EditorPage;
