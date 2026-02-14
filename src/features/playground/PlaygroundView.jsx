
import React, { useState } from 'react';
import { generateGeminiContent } from '../../core/services/ai.service';


export const PlaygroundView = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAskAI = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResponse('');
        try {
            // Assuming I update ai.service to export this, or I add a new method `askAI`
            const result = await generateGeminiContent(input);
            // const result = "AI Disabled for testing";
            setResponse(result || 'No response from AI.');
        } catch (error) {
            setResponse('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto text-slate-200">
            <h1 className="text-3xl font-bold mb-6 text-indigo-400">AI Playground</h1>

            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Ask Gemini anything:</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-32 bg-slate-800 text-white p-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        placeholder="Type your prompt here..."
                    />
                </div>

                <button
                    onClick={handleAskAI}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all ${loading
                        ? 'bg-indigo-600/50 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95'
                        }`}
                >
                    {loading ? 'Thinking...' : 'Ask AI'}
                </button>
            </div>

            {response && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold mb-3 text-slate-300">Result:</h2>
                    <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 leading-relaxed whitespace-pre-wrap">
                        {response}
                    </div>
                </div>
            )}
        </div>
    );
};
