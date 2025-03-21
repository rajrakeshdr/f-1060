
export interface UserProfile {
  email?: string;
  phone?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  address?: string;
}

export interface SearchResult {
  source: string;
  breachDate: string;
  description: string;
  severity: string;
}

export interface SearchHistoryItem {
  query: string;
  type: string;
  timestamp: string;
  results: SearchResult[];
}

export interface ConversationHistoryItem {
  id: string;
  user_id: string;
  query: string;
  response: string;
  timestamp: string;
  thread_id: string;
  title?: string;
}
