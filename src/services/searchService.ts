
interface SearchResponse {
  response: string;
  error?: string;
}

export const searchHuggingFace = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await fetch("https://rajrakeshdr-intelliSOC.hf.space/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search API error:", error);
    return {
      response: "",
      error: error instanceof Error ? error.message : "Failed to fetch search results"
    };
  }
};
