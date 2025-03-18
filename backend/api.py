import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

class ScrapeDataFromGoogle:
    
    def __init__(self, number, query):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
        self.number = number
        self.query = query
        self.GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        self.CSE_ID = os.getenv("CSE_ID")
        
    def google_search(self, query):
        """
        Perform a Google search using the Custom Search JSON API.
        Args:
            query (str): The search query string.
        Returns:
            dict: The JSON response from the Google Custom Search API.
        """
        
        url = f"https://www.googleapis.com/customsearch/v1?key={self.GOOGLE_API_KEY}&cx={self.CSE_ID}&q={query}"
        response = requests.get(url)
        return response.json()

    def store_json(self, data, filename):
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(data, file)

    def run(self):
        data = self.google_search("python")
        self.store_json(data, "google_search.json")
        
if __name__ == "__main__":
    ScrapeDataFromGoogle(10, "python").run()