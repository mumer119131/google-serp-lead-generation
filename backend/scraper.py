import requests
import json
import os
from dotenv import load_dotenv
import re
from datetime import datetime
from database import SupabaseEmailManager
import asyncio

load_dotenv()

class ScrapeDataFromGoogle:
    
    def __init__(self, number, pages, query):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
        self.number = number
        self.query = query
        self.GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        self.CSE_ID = os.getenv("CSE_ID")
        self.manager = SupabaseEmailManager()
        self.links = []
        self.pages = pages
        
    async def connect_to_database(self):
        """Connect to the database."""
        await self.manager.connect()
        self.links = await self.manager.get_links_list()
        print(self.links)
        
    def google_search(self, query, page):
        """Perform a Google search using the Custom Search JSON API."""
        url = f"https://www.googleapis.com/customsearch/v1?key={self.GOOGLE_API_KEY}&cx={self.CSE_ID}&q={query}&start={page+1}"
        response = requests.get(url)
        return response.json()

    def format_search_results(self, data):
        """Extract the relevant information from the search results."""
        results = []
        for item in data.get("items", []):
            email = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", item.get("snippet"))
            print(item.get("snippet"), email)
            if email:
                email = email[0]
                if email[len(email)-1] == ".": # Fix condition (should be == ".com")
                    email = email[:-1]
            else:
                print("Email not found in snippet.")
                continue
            
            result = {
                "title": item.get("title"),
                "link": item.get("link"),
                "snippet": item.get("snippet"),
                "email": email,
                "site_name": item.get("displayLink"),
                "site_desc": item.get("pagemap", {}).get("metatags", [{}])[0].get("og:description"),
                "query": self.query,
            }
            if result.get("link") not in self.links:  # Fix condition (should be in self.links)
                print (f"Link {result.get('link'), self.links} already exists in the database.")
                results.append(result)
        return results
    
    def store_json(self, data, filename):
        """Save data to a JSON file."""
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(data, file)

    async def save_data_to_supabase(self, data):
        """Save scraped data into the database."""
        await self.manager.insert_emails(data)  # ✅ Await this function properly

    async def main(self):
        """Main function to handle all async operations."""
        await self.connect_to_database()
        for page in range(self.pages):
            data = self.google_search(self.query, page)
            self.store_json(data, "google_search.json")
            formatted_data = self.format_search_results(data)
            self.store_json(formatted_data, "formatted_google_search.json")
            if formatted_data:
                await self.save_data_to_supabase(formatted_data)
        
        await self.manager.disconnect()  # Ensure disconnection only after saving

    def run(self):
        """Entry point for execution."""
        asyncio.run(self.main())  # ✅ Only one event loop is created

if __name__ == "__main__":
    ScrapeDataFromGoogle(10, 10, 'site:facebook.com "need a web developer" "@gmail.com"').run()
