import requests
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_KEY = os.getenv("SUPABASE_KEY")

url = f'https://{os.getenv("SUPABASE_URL")}/rest/v1/leads_emails'
headers = {
    "apikey": os.getenv("SUPABASE_KEY"),
    "Authorization": f'Bearer {SUPABASE_KEY}',
    "Content-Type": "application/json"
}
data = {
    "title": "Test Title",
    "email": "test@gmail.com",
    "link": "https://example.com",
    "snippet": "Test Snippet",
    "site_name": "example.com",
    "site_description": "Test description",
    "crawled_at": "2025-03-18T07:20:31.529140"
}
response = requests.post(url, json=data, headers=headers)
print(response.status_code, response.json())
