'use client';

// Conversation Input Component
// Handles text and voice input from the user

import { useState, useEffect, useRef } from 'react';

interface ConversationInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export default function ConversationInput({ onSubmit, isLoading }: ConversationInputProps) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [browserSupportsVoice, setBrowserSupportsVoice] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setBrowserSupportsVoice(false);
        return;
      }

      // Initialize speech recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage('');
    }
  };

  // Handle voice input using Web Speech API
  const handleVoiceInput = () => {
    if (!browserSupportsVoice) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (!recognitionRef.current) {
      alert('Voice recognition not initialized. Please refresh the page.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your dream road trip... (e.g., 'Plan a 10-day trip starting from New York in August with a $3000 budget')"
            className="w-full min-h-[120px] p-4 pr-16 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-lg"
            disabled={isLoading || isListening}
          />

          {/* Voice input button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isLoading || isListening}
            className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-200 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Voice input"
          >
            {isListening ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Submit button */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {isListening ? 'Listening... (speak now)' :
             browserSupportsVoice ? 'Type or use voice input to describe your trip' :
             'Type to describe your trip (voice not supported in this browser)'}
          </p>

          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Planning...
              </span>
            ) : (
              'Plan My Trip'
            )}
          </button>
        </div>
      </form>

      {/* Example prompts */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Plan me a 10-day trip in August",
            "I'm starting from New York with $2500 budget",
            "I want to see Wrigley Field and Fenway Park",
            "Add golf courses along the way",
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setMessage(example)}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
