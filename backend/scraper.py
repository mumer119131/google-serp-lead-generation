import requests
import json
import os
from dotenv import load_dotenv
import re
from datetime import datetime
from database import SupabaseEmailManager

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

    def format_search_results(self, data):
        """
        Extract the relevant information from the search results.
        Args:
            data (dict): The JSON response from the Google Custom Search API.
        Returns:
            list: A list of dictionaries containing the search results.
        """
        
        results = []
        for item in data.get("items", []):
            email = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", item.get("snippet"))
            if email:
                email = email[0]
            else:
                print("Email not found in snippet.")
                continue
            result = {
                "title": item.get("title"),
                "link": item.get("link"),
                "snippet": item.get("snippet"),
                "email": email,
                "site_name": item.get("displayLink"),
                "site_description": item.get("pagemap", {}).get("metatags", [{}])[0].get("og:description"),
                "query": self.query,
                "crawled_at": datetime.now().isoformat()
            }
            results.append(result)
        return results
    
    def store_json(self, data, filename):
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(data, file)

    def save_data_to_supabase(self, data):
        manager = SupabaseEmailManager()
        response = manager.insert_emails(data)
        return response
    
    def run(self):
        data = self.google_search(self.query)
        self.store_json(data, "google_search.json")
        formatted_data = self.format_search_results(data)
        self.store_json(formatted_data, "formatted_google_search.json")
        response = self.save_data_to_supabase(formatted_data)
        print(response)
        
if __name__ == "__main__":
    ScrapeDataFromGoogle(10, 'site:facebook.com "@gmail.com"' ).run()