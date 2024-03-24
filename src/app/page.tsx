"use client"

import { useState } from 'react';

export default function Home() {
  const [contractInput, setContractInput] = useState('');
  const [messages, setMessages] = useState([]);

  const predictAContract = async () => {
    // Send the query to the API endpoint
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: contractInput }),
    });

    // Parse the response
    const data = await response.json();
    const standardMessage = data.response;

    // Update the message history
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'User', text: contractInput },
      { sender: 'Assistant', text: standardMessage },
    ]);

    // Clear the input field
    setContractInput('');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Conversation history */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            {messages.map((message, index) => (
              <p key={index} className="text-gray-700">
                {message.sender}: {message.text}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col space-y-4">
          {/* Textarea */}
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your contract terms here..."
            value={contractInput}
            onChange={(e) => setContractInput(e.target.value)}
          ></textarea>
          {/* Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={predictAContract}
          >
            Help me optimize my contract terms?
          </button>
        </div>
      </div>
    </div>
  );
}