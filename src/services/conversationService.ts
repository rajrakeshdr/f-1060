
import { supabase } from '@/integrations/supabase/client';
import { ConversationHistoryItem } from '@/types/darkWebSearch';

export const saveConversation = async (
  query: string,
  response: string,
  threadId?: string,
  title?: string
): Promise<string | null> => {
  try {
    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.error("User not authenticated");
      return null;
    }

    const userId = session.user.id;
    const newThreadId = threadId || crypto.randomUUID();
    
    console.log("Saving conversation with:", {
      userId,
      query: query.substring(0, 50) + "...",
      responseLength: response.length,
      threadId: newThreadId,
      title: title || (query.substring(0, 50) + "...")
    });

    // We'll use our backend API to save the conversation
    // This function is kept for compatibility but actual saving is done by the API
    console.log("Note: The backend API is handling conversation saving");

    return newThreadId;
  } catch (err) {
    console.error("Error in saveConversation:", err);
    return null;
  }
};

export const getConversationsByThread = async (
  threadId: string
): Promise<ConversationHistoryItem[]> => {
  try {
    // Get current user session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.error("User not authenticated");
      return [];
    }

    const userId = session.user.id;
    const response = await fetch(`https://rajrakeshdr-intelliSOC.hf.space/history/${userId}?thread_id=${threadId}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error details:", errorText);
      throw new Error(`API response status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }

    const data = await response.json();
    
    if (data.status === "success" && Array.isArray(data.history)) {
      return data.history.map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        query: item.query,
        response: typeof item.response === 'string' ? item.response : JSON.stringify(item.response),
        timestamp: new Date(item.timestamp).toISOString(),
        thread_id: item.thread_id,
        title: item.title
      }));
    }
    
    return [];
  } catch (err) {
    console.error("Error in getConversationsByThread:", err);
    return [];
  }
};

export const getUserConversations = async (): Promise<ConversationHistoryItem[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.error("User not authenticated");
      return [];
    }

    const userId = session.user.id;
    const response = await fetch(`https://rajrakeshdr-intelliSOC.hf.space/threads/${userId}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error details:", errorText);
      throw new Error(`API response status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }

    const data = await response.json();
    
    if (data.status === "success" && Array.isArray(data.threads)) {
      // Return the thread list from the API
      return data.threads.map((thread: any) => ({
        id: crypto.randomUUID(), // Generate an id for the component
        thread_id: thread.thread_id,
        title: thread.title,
        timestamp: new Date().toISOString() // The API doesn't provide a timestamp for threads
      }));
    }
    
    return [];
  } catch (err) {
    console.error("Error in getUserConversations:", err);
    return [];
  }
};

export const deleteConversationThread = async (threadId: string): Promise<boolean> => {
  try {
    // Note: Your API doesn't have a delete endpoint, so we'll use Supabase directly
    const { error } = await supabase
      .from('conversation_history')
      .delete()
      .eq('thread_id', threadId);

    if (error) {
      console.error("Error deleting conversation thread:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error in deleteConversationThread:", err);
    return false;
  }
};
