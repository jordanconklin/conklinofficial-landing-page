'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link'
export default function Chatbot() {

    const [message, setMessage] = useState('');

    // this is the function that will be called when the user submits a message, for now it just logs the message to the console
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log('Submitted message:', message);
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 text-gray-800 font-sans">        
        <header className="container mx-auto py-6 px-4">
            <nav className="flex justify-between items-center">
            <Link href="/" className="text-4xl font-extrabold tracking-tight text-gray-800">
                ConklinOfficial
            </Link>
            <Link href="/" className="text-lg hover:text-gray-600 transition-colors">
                Back to Home
            </Link>
            </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold mb-12 text-center">Chat with TekkAI</h1>
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-96 bg-gray-100 p-6 overflow-y-auto" id="chat-messages">
                {/* Chat messages will be displayed here */}
            </div>
                <div className="p-4 bg-gray-200">
                    <form className="flex" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
                        aria-label="Chat message input"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-500 text-white px-6 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors font-semibold"
                        aria-label="Send message"
                    >
                        Send
                    </button>
                    </form>
                </div>
            </div>
        </main>
        </div>
    )
}