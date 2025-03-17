
interface SearchResponse {
  response: string | Record<string, string>;
  error?: string;
  thread_id?: string;
  status?: string;
  classified_type?: string;
}

export const searchHuggingFace = async (query: string, userId?: string, threadId?: string): Promise<SearchResponse> => {
  try {
    console.log("Preparing request to search API with query:", query);
    
    // Ensure we have a valid user ID (use a placeholder if not authenticated)
    const user_id = userId || "00000000-0000-0000-0000-000000000000";
    
    const requestBody = {
      query,
      user_id,
      thread_id: threadId || "", // Convert null to empty string to avoid API validation error
      context: "You are a cybersecurity expert providing detailed information based on the query."
    };
    
    console.log("Request payload:", requestBody);
    
    const response = await fetch("https://rajrakeshdr-intelliSOC.hf.space/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error details:", errorText);
      throw new Error(`API response status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    
    return {
      status: data.status,
      response: data.response["Use Clear Language: Avoid ambiguity and complex wording"] || data.response,
      thread_id: data.thread_id,
      classified_type: data.classified_type
    };
  } catch (error) {
    console.error("Search API error:", error);
    return {
      response: "",
      error: error instanceof Error ? error.message : "Failed to fetch search results"
    };
  }
};
