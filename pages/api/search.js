
  export default async function handler(req, res) {
    const { query } = req.query;
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=AIzaSyDyuFlBv2yN9xsQyeREM3wHJT0ZHDC6Npk&cx=c44573dd7294843bd`;
  
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
  
      if (!data.items || data.error) {
        console.error("Google API Error:", data);
        return res.status(500).json({ error: data.error?.message || "No insights found." });
      }
  
      const insight = data.items?.[0]?.snippet || "No insights found.";
      res.status(200).json({ insight });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Failed to fetch dream insights." });
    }
  }
  