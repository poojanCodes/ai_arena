import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MOCK_DATA = {
  problem: "Explain me what is JSONwebToken",
  solutions: [
    {
      id: "solution_1",
      name: "Solution 1",
      content: "### **What is JSON Web Token (JWT)?**\n**JSON Web Token (JWT)** is a compact, URL-safe way to securely transmit information between parties as a **JSON object**. It is commonly used for **authentication** and **authorization** in web applications.\n\n---\n\n### **Structure of a JWT**\nA JWT consists of **three parts**, separated by dots (`.`):\n1. **Header** – Contains metadata about the token (e.g., algorithm & token type).\n2. **Payload** – Contains claims (user data, expiration time, etc.).\n3. **Signature** – Ensures the token hasn’t been tampered with.\n\n```\nxxxxxx.yyyyyy.zzzzzz\n```"
    },
    {
      id: "solution_2",
      name: "Solution 2",
      content: "### **What is JSON Web Token (JWT)?**\n**JSON Web Token (JWT)** is a compact, URL-safe way to securely transmit information between parties as a **JSON object**. It is commonly used for **authentication** and **authorization** in web applications.\n\n---\n\n### **Why Use JWT?**\n✅ **Stateless** – No need for server-side session storage.\n✅ **Compact** – Can be sent via URL, POST, or HTTP header.\n✅ **Secure** – Signed to prevent tampering.\n✅ **Flexible** – Can store custom claims (e.g., user roles).\n\n---\n\n### **Common Use Cases**\n- **Authentication** (e.g., after login, the server issues a JWT).\n- **API Authorization** (e.g., sending JWT in `Authorization: Bearer <token>`).\n- **Secure Data Exchange** (e.g., between microservices)."
    }
  ],
  judge: {
    scores: {
      solution_1: 10,
      solution_2: 10
    },
    reasoning: {
      solution_1: "The explanation is comprehensive, accurate, and well-structured. It covers the definition, internal structure (header, payload, signature), the authentication flow, a concrete example, benefits (statelessness), and critical security warnings. The formatting makes it very easy to read and understand.",
      solution_2: "This solution is identical to Solution 1. It provides an excellent, detailed overview of JWTs, including their structure, how they work in a client-server environment, and important security considerations like not storing sensitive data in the payload. It is perfectly formatted and logically sound."
    },
    recommended_solution: "solution_1"
  }
};

const PAST_CHATS = [
  { id: 1, title: "What is JSON Web Token?" },
  { id: 2, title: "Implement Binary Search in Python" },
  { id: 3, title: "Rust Concurrent Hash Map" },
  { id: 4, title: "Next.js App Router Architecture" }
];

const MarkdownComponents = {
  p: ({node, ...props}) => <p className="mb-4 text-on-surface-variant text-sm leading-relaxed" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-md font-bold text-on-surface mt-6 mb-3" {...props} />,
  li: ({node, ...props}) => <li className="text-on-surface-variant text-sm leading-relaxed ml-4 list-disc" {...props} />,
  code: ({node, inline, className, children, ...props}) => {
    return !inline ? (
      <pre className="font-mono text-sm leading-relaxed text-on-surface bg-surface-container-low/50 p-4 rounded-lg overflow-x-auto border border-outline-variant/10 mb-4">
        <code {...props}>{children}</code>
      </pre>
    ) : (
      <code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary font-mono text-[13px]" {...props}>
        {children}
      </code>
    );
  },
  em: ({node, ...props}) => <em className="text-on-surface-variant italic" {...props} />,
  strong: ({node, ...props}) => <strong className="font-bold text-on-surface" {...props} />,
  hr: ({node, ...props}) => <hr className="my-6 border-t border-outline-variant/20" {...props} />
};

const App = () => {
  const [query, setQuery] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasSubmitted(true);
    }, 1000);
  };

  const handleNewChat = () => {
    setQuery('');
    setHasSubmitted(false);
    setIsLoading(false);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <nav className="h-16 border-b border-outline-variant/10 flex items-center justify-between px-6 bg-surface-container-lowest z-30 shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-surface-container-low rounded-md transition-colors text-on-surface-variant"
            title="Toggle Sidebar"
          >
            <span className="material-symbols-outlined leading-none">menu</span>
          </button>
          <div className="font-bold text-lg tracking-tight text-primary">AI Arena</div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleNewChat} 
            className="flex items-center gap-2 hover:bg-surface-container-low px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Arena</span>
          </button>
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="flex items-center gap-2 hover:bg-surface-container-low px-4 py-2 rounded-lg text-sm transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span className="hidden sm:inline text-sm font-semibold">History</span>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`${isSidebarOpen ? 'w-64 border-r border-outline-variant/10' : 'w-0'} 
            hidden md:flex flex-col bg-surface-container-lowest/80 backdrop-blur transition-all duration-300 ease-in-out shrink-0 overflow-hidden`}
        >
          <div className="p-4">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center gap-2 bg-surface hover:bg-surface-container px-3 py-2.5 rounded-lg text-sm font-medium border border-outline-variant/20 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              New Battle
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <div className="px-3 pt-6 pb-2 text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
              Previous Battles
            </div>
            <div className="space-y-1">
              {PAST_CHATS.map(chat => (
                <button 
                  key={chat.id} 
                  className="w-full text-left px-3 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-md truncate transition-colors flex items-center gap-3 group"
                >
                  <span className="material-symbols-outlined text-[16px] opacity-70 group-hover:opacity-100">chat_bubble</span>
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative overflow-y-auto bg-surface">
          <div className="w-full max-w-[1240px] mx-auto px-6 py-12 pb-32">
            
            {/* Input Section (Centered when new, top when submitted) */}
            <section className={`flex justify-center transition-all duration-700 ease-in-out ${hasSubmitted ? 'mb-16' : 'mt-[25vh]'}`}>
              <div className="w-full max-w-3xl">
                {!hasSubmitted && (
                  <h1 className="text-4xl font-extrabold tracking-tight text-center mb-10 opacity-90">What do you want to test today?</h1>
                )}
                <form onSubmit={handleSubmit} className="relative group">
                  <div className={`flex items-center bg-surface-container-lowest shadow-[0_4px_20px_rgba(45,52,53,0.06)] rounded-2xl overflow-hidden border border-outline-variant/10 focus-within:shadow-[0_8px_40px_rgba(45,52,53,0.12)] focus-within:border-primary/30 transition-all duration-300 ${hasSubmitted ? 'p-1' : 'p-2'}`}>
                    <div className="pl-4 text-on-surface-variant/40">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <input 
                      className={`w-full bg-transparent border-none focus:ring-0 outline-none text-on-surface font-['Inter'] placeholder-on-surface-variant/40 ${hasSubmitted ? 'px-4 py-3 text-sm' : 'px-4 py-4 text-lg'}`}
                      placeholder="Ask anything or provide a coding problem..." 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={isLoading}
                    />
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-on-surface hover:bg-primary-dim text-surface font-bold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span className={`${hasSubmitted ? 'text-sm' : ''}`}>{isLoading ? '...' : 'Submit'}</span>
                      {!isLoading && <span className="material-symbols-outlined text-sm">arrow_upward</span>}
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Arena View - Appears after submission */}
            {hasSubmitted && !isLoading && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <section className="mb-10 text-center">
                   <h2 className="text-2xl font-bold tracking-tight">{query || MOCK_DATA.problem}</h2>
                </section>

                {/* Solution Grid (2 Columns) */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {MOCK_DATA.solutions.map((solution, index) => (
                    <div key={solution.id} className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Solution {index + 1}</span>
                        <span className="h-px flex-1 bg-outline-variant/20"></span>
                      </div>
                      <div className="bg-surface-container-lowest p-6 pt-2 rounded-2xl shadow-sm border border-outline-variant/10 h-full relative group">
                        {MOCK_DATA.judge.recommended_solution === solution.id && (
                          <div className="absolute top-0 right-6 -translate-y-1/2">
                            <span className="bg-green-100 text-green-800 border border-green-200 text-[9px] font-black tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1 uppercase">
                              <span className="material-symbols-outlined text-[10px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                              Recommended
                            </span>
                          </div>
                        )}
                        <div className="overflow-y-auto max-h-[60vh] custom-scroll pt-6">
                            <ReactMarkdown components={MarkdownComponents}>
                              {solution.content}
                            </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Judge Panel */}
                <section className="w-full">
                  <div className="bg-surface-container-low/60 rounded-[2rem] p-8 md:p-12 relative border border-outline-variant/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-outline-variant/10 pb-8">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                             <span className="material-symbols-outlined text-on-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>gavel</span>
                          </div>
                          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Judge Assessment</h2>
                        </div>
                        <p className="text-on-surface-variant text-sm ml-11">Evaluated based on correctness, clarity, and security best practices.</p>
                      </div>
                      
                      {/* Scores */}
                      <div className="flex items-center gap-6 md:pr-10">
                        <div className="text-center">
                          <div className="text-4xl font-black text-on-surface-variant/60">{MOCK_DATA.judge.scores.solution_1}<span className="text-lg text-on-surface-variant/40">/10</span></div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-2 border-t border-outline-variant/20 pt-2">Sol 1</div>
                        </div>
                        <div className="h-12 w-px bg-outline-variant/30"></div>
                        <div className="text-center">
                          <div className="text-4xl font-black text-on-surface">{MOCK_DATA.judge.scores.solution_2}<span className="text-lg text-on-surface-variant/40">/10</span></div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface mt-2 border-t border-outline-variant/20 pt-2 text-primary">Sol 2</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Reasoning Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm">comment</span>
                           Solution 1 Feedback
                        </h3>
                        <p className="text-md text-on-surface-variant leading-relaxed">
                          {MOCK_DATA.judge.reasoning.solution_1}
                        </p>
                      </div>
                      <div>
                         <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm">comment</span>
                           Solution 2 Feedback
                        </h3>
                        <p className="text-md text-on-surface-variant leading-relaxed">
                          {MOCK_DATA.judge.reasoning.solution_2}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>

    </div>
  );
};

export default App;