
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

    // Try to save using direct Supabase access
    try {
      const { error } = await supabase
        .from('conversation_history')
        .insert({
          user_id: userId,
          query,
          response,
          thread_id: newThreadId,
          title: title || query.substring(0, 50) + "..."
        });

      if (error) {
        if (error.message?.includes("row-level security policy")) {
          console.warn("RLS policy prevented saving conversation. This is expected if your API handles saving instead.");
        } else {
          console.error("Supabase error:", error);
        }
      }
    } catch (err) {
      console.warn("Error saving to Supabase directly, but this may be expected if the API handles it:", err);
    }

    // Note: The backend API is also handling conversation saving
    console.log("Note: The backend API may also be handling conversation saving");

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
    
    try {
      const response = await fetch(`https://rajrakeshdr-intelliSOC.hf.space/history/${userId}?thread_id=${threadId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error details:", errorText);
        
        // Try fallback to direct Supabase query if API fails
        console.log("Falling back to direct Supabase query");
        const { data, error } = await supabase
          .from('conversation_history')
          .select('*')
          .eq('thread_id', threadId)
          .eq('user_id', userId)
          .order('timestamp', { ascending: true });
          
        if (error) {
          console.error("Supabase fallback error:", error);
          throw new Error(error.message);
        }
        
        return data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          query: item.query,
          response: typeof item.response === 'string' ? item.response : JSON.stringify(item.response),
          timestamp: new Date(item.timestamp).toISOString(),
          thread_id: item.thread_id,
          title: item.title
        }));
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
      console.error("API request failed, using Supabase fallback:", err);
      // Continue with the Supabase fallback below
    }
    
    // Fallback to direct Supabase query
    const { data, error } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('thread_id', threadId)
      .eq('user_id', userId)
      .order('timestamp', { ascending: true });
      
    if (error) {
      console.error("Supabase fallback error:", error);
      throw new Error(error.message);
    }
    
    return data.map(item => ({
      id: item.id,
      user_id: item.user_id,
      query: item.query,
      response: typeof item.response === 'string' ? item.response : JSON.stringify(item.response),
      timestamp: new Date(item.timestamp).toISOString(),
      thread_id: item.thread_id,
      title: item.title
    }));
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
    
    try {
      const response = await fetch(`https://rajrakeshdr-intelliSOC.hf.space/threads/${userId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error details:", errorText);
        
        // Try fallback to direct Supabase query if API fails
        console.log("Falling back to direct Supabase query for threads");
        const { data, error } = await supabase
          .from('conversation_history')
          .select('thread_id, title, timestamp')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false });
          
        if (error) {
          console.error("Supabase fallback error:", error);
          throw new Error(error.message);
        }
        
        // Deduplicate threads
        const threadMap = new Map();
        data.forEach(item => {
          if (!threadMap.has(item.thread_id)) {
            threadMap.set(item.thread_id, {
              thread_id: item.thread_id,
              title: item.title
            });
          }
        });
        
        return Array.from(threadMap.values()).map(thread => ({
          id: crypto.randomUUID(),
          thread_id: thread.thread_id,
          title: thread.title,
          timestamp: new Date().toISOString()
        }));
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
      console.error("API request failed, using Supabase fallback for threads:", err);
      // Continue with the Supabase fallback below
    }
    
    // Fallback to direct Supabase query
    const { data, error } = await supabase
      .from('conversation_history')
      .select('thread_id, title, timestamp')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });
      
    if (error) {
      console.error("Supabase fallback error:", error);
      throw new Error(error.message);
    }
    
    // Deduplicate threads
    const threadMap = new Map();
    data.forEach(item => {
      if (!threadMap.has(item.thread_id)) {
        threadMap.set(item.thread_id, {
          thread_id: item.thread_id,
          title: item.title
        });
      }
    });
    
    return Array.from(threadMap.values()).map(thread => ({
      id: crypto.randomUUID(),
      thread_id: thread.thread_id,
      title: thread.title,
      timestamp: new Date().toISOString()
    }));
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
