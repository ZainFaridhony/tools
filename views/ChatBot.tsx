import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';
import { Button } from '../components/Button';
import { Chat, GenerateContentResponse } from '@google/genai';

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
      // Add initial greeting
      setMessages([{
        id: 'init',
        role: 'model',
        text: 'SYSTEM ONLINE. Greetings, User. How can I assist you in this digital realm?',
        timestamp: Date.now()
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
      
      let fullResponse = "";
      const modelMsgId = (Date.now() + 1).toString();
      
      // Add placeholder for model response
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }]);

      for await (const chunk of result) {
        const responseChunk = chunk as GenerateContentResponse;
        const text = responseChunk.text;
        if (text) {
            fullResponse += text;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg
            ));
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'ERROR: CONNECTION_INTERRUPTED. PLEASE RETRY.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white border-2 border-black mb-4 shadow-inner bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] border-2 border-black p-3 shadow-hard-sm font-mono text-sm md:text-base
                ${msg.role === 'user' 
                  ? 'bg-retro-pink text-black rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                  : 'bg-retro-yellow text-black rounded-tl-lg rounded-tr-lg rounded-br-lg'
                }`}
            >
              <div className="font-bold text-xs mb-1 uppercase border-b border-black/20 pb-1">
                {msg.role === 'user' ? 'YOU' : 'SYSTEM'}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isTyping && (
            <div className="flex justify-start">
                <div className="bg-black text-retro-neonGreen border-2 border-retro-neonGreen p-2 font-mono animate-pulse">
                    PROCESSING...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command..."
          className="flex-1 border-2 border-black p-3 font-mono focus:outline-none focus:bg-retro-purple transition-colors"
        />
        <Button type="submit" disabled={isTyping} isLoading={isTyping}>SEND</Button>
      </form>
    </div>
  );
};