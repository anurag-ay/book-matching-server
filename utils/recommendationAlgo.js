function cosineSimilarity(vectorA, vectorB) {
  // Initialize variables
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  // Loop through the elements of the vectors
  for (let i = 0; i < vectorA.length; i++) {
    // Add the product of the corresponding elements to the dot product
    dotProduct += vectorA[i] * vectorB[i];
    // Add the square of each element to the magnitudes
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  // Calculate the square roots of the magnitudes
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  // Return the cosine similarity as the quotient of the dot product and the product of the magnitudes
  return dotProduct / (magnitudeA * magnitudeB);
}

function mostSimilarVector(user, items) {
  // Initialize an array to store the similarity scores
  let scores = [];
  // let vectorA = makeUserVector(user);

  // Loop through the list of vectors
  for (let item of items) {
    item = item.toObject();
    // let vectorB = makeItemVector(item);
    let similarity = cosineSimilarity(user, item.vector);
    scores.push({ similarity, ...item });
  }

  // Return the most similar vector
  scores.sort((a, b) => b.similarity - a.similarity);
  scores = scores.slice(0, 9);
  return scores;
}

module.exports = mostSimilarVector;
