export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string; // Material icon name
  color: string; // Tailwind color class for background
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}