
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

    const { data, error } = await supabase
      .from('conversation_history')
      .insert({
        user_id: userId,
        query,
        response,
        thread_id: newThreadId,
        title: title || query.substring(0, 50) + '...' // Default title as truncated query
      })
      .select('thread_id');

    if (error) {
      console.error("Error saving conversation:", error);
      return null;
    }

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
    const { data, error } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('thread_id', threadId)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error("Error fetching conversation thread:", error);
      return [];
    }

    return data as ConversationHistoryItem[];
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

    // Get unique threads with the latest message from each
    const { data, error } = await supabase
      .from('conversation_history')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error("Error fetching user conversations:", error);
      return [];
    }

    // Group by thread_id and get the latest entry for each thread
    const threadMap = new Map<string, ConversationHistoryItem>();
    (data as ConversationHistoryItem[]).forEach(item => {
      if (!threadMap.has(item.thread_id)) {
        threadMap.set(item.thread_id, item);
      }
    });

    return Array.from(threadMap.values());
  } catch (err) {
    console.error("Error in getUserConversations:", err);
    return [];
  }
};

export const deleteConversationThread = async (threadId: string): Promise<boolean> => {
  try {
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
