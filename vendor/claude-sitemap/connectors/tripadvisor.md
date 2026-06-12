# Tripadvisor

This server provides tools to query the Tripadvisor hotels data, with functions to search for hotels in an area and to retrieve hotel details, photos, reviews, review ratings, availability, pricing, and nearby points of interest. It should be invoked for user queries involving hotel research, comparison, rating checks, or gathering contextual data about a hotel's surroundings (e.g., attractions, amenities). The tools operate on specific Tripadvisor location or hotel IDs; follow-up requests should re-use these identifiers to refine results accurately. The model must handle edge cases like ambiguous location names (e.g., "Springfield") by seeking clarification before executing a search. This tool's primary function is to ground accommodation planning in factual, real-time data along with opinions from other travelers.

You can use Tripadvisor to:

**Find a hotel:**  
"Find the highest-rated boutique hotels in Kyoto for under $250/night"

**Compare stays:**  
"Compare the top 3 family resorts in Maui based on traveler reviews"

**Dig into details:**  
"What do recent reviews say about breakfast and Wi-Fi at Hotel Artemide in Rome?"