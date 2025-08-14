import { useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowUpIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

export default function InputForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [weeks, setWeeks] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 10)
      {
      toast.error('The minimum word limit is 10 words.');
      return;
    }
    onSubmit(text.trim(), weeks);
  };

  return (
    <form className="w-full max-w-2xl mx-auto flex flex-col items-center" onSubmit={handleSubmit}>
      {/* Title */}
      <h1 className="text-4xl font-semibold text-blue-500 mb-8">
        What’s the idea <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#34a853] via-[#facc15] to-[#ef4444]">Genius</span>?
      </h1>
      {/* Input box container */}
      <div className="relative w-full">
        {/* Main input box */}
        <div className="bg-gray-50 border border-blue-300 rounded-2xl shadow-lg flex items-center px-6 py-4 w-full min-h-[70px]">
          {/* Weeks selector - inside the box, left aligned */}
          <div className="flex items-center bg-blue-500 px-3 py-1 rounded-full mr-4">
            <label className="text-base font-medium text-white mr-2">Weeks:</label>
            <div className="flex items-center bg-white rounded-lg px-2 py-1">
              <span className="text-base font-medium text-black mr-1">{weeks}</span>
              <div className="flex flex-col ml-1">
                <button
                  type="button"
                  onClick={() => setWeeks((w) => Math.min(w + 1, 15))}
                  className="flex items-center justify-center"
                  aria-label="Increment weeks"
                >
                  <ChevronUpIcon className="h-3 w-3 text-blue-500" />
                </button>
                <button
                  type="button"
                  onClick={() => setWeeks((w) => Math.max(w - 1, 1))}
                  className="flex items-center justify-center"
                  aria-label="Decrement weeks"
                >
                  <ChevronDownIcon className="h-3 w-3 text-blue-500" />
                </button>
              </div>
            </div>
          </div>
          {/* Input */}
          <input
            type="text"
            placeholder="Enter your project idea..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-transparent text-lg outline-none border-none"
          />
          {/* Button */}
          <button
            type="submit"
            className="ml-4 bg-blue-500 p-4 rounded-full hover:bg-blue-600 flex items-center justify-center"
          >
            <ArrowUpIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      
    </form>
  );
}
