function parseQuery(input) {
    const dbMatch = input.match(/database\s+(\w+)/i);
    const collectionMatch = input.match(/collection\s+(\w+)/i);
  
    if (!dbMatch) {
      return false; // Missing database name: No database specified.
    }
  
    if (!collectionMatch) {
      return false; // Missing collection name: No collection specified.
    }
  
    const conditions = [];
    const conditionRegex = /(\w+)\s*(==|!=|>=|<=|>|<|equals|less than|greater than)\s*["']?([^"'\s]+)["']?\s*(and|or)?/gi;
    let match;
  
    const operatorMapping = {
      equals: "==",
      "less than": "<",
      "greater than": ">",
      "greater than equals":">=",
      "less than equals":"<=",
      "not equals" : "!="
    };
  
    while ((match = conditionRegex.exec(input)) !== null) {
      const [_, field, operator, value, conjunction] = match;
      const normalizedOperator = operatorMapping[operator.toLowerCase()] || operator;
  
      conditions.push({
        field,
        operator: normalizedOperator,
        value,
        conjunction: conjunction || null, // Add conjunction if present
      });
    }
  
    if (conditions.length === 0) {
      return false; // Missing or invalid filtering conditions: No valid comparison operator or field.
    }
  
    // Remove the conjunction key for the last condition since it does not need one
    if (conditions.length > 0) {
      conditions[conditions.length - 1].conjunction = null;
    }
  
    return {
      database: dbMatch[1],
      collection: collectionMatch[1],
      filters: conditions,
    };
  }
  
  // Example Usage
  const input = 'Find entry in database scraph and collection colab where accountName equals "jenil" and age less than 18 or city equals "Delhi".';
  console.log(parseQuery(input));
  