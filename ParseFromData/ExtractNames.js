function extractDbAndCollection(input) {
    // Extract database and collection names using more specific regex
    const dbMatch = input.match(/database\s+(\w+)/i);  // Matches "database" followed by the name
    const collectionMatch = input.match(/collection\s+(\w+)/i);  // Matches "collection" followed by the name
  
    if (!dbMatch) {
      return { error: "Missing database name: No database specified." };
    }
  
    if (!collectionMatch) {
      return { error: "Missing collection name: No collection specified." };
    }
  
    return {
      database: dbMatch[1],
      collection: collectionMatch[1],
    };
  }
  
  // Example Usage
  const input = 'Find entry in database  scraph and collection  colab where accountName == "jenil"';
  const result = extractDbAndCollection(input);
  console.log(result);
  