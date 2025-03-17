
interface SearchResponse {
  response: string;
  error?: string;
}

export const searchHuggingFace = async (query: string): Promise<SearchResponse> => {
  try {
    console.log("Sending request to HuggingFace API with query:", query);
    
    const response = await fetch("https://rajrakeshdr-intelliSOC.hf.space/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error details:", errorText);
      throw new Error(`API response status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("Search API error:", error);
    return {
      response: "",
      error: error instanceof Error ? error.message : "Failed to fetch search results"
    };
  }
};
