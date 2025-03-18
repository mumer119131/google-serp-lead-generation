from supabase import create_client, Client
from typing import List, Dict
import os
from dotenv import load_dotenv

class SupabaseEmailManager:
    def __init__(self, table_name: str = "emails"):
        load_dotenv()
        self.url = os.getenv("SUPABASE_URL")
        self.key = os.getenv("SUPABASE_KEY")
        print(self.url)
        print(self.key)
        """Initialize Supabase client and table name."""
        self.supabase: Client = create_client(self.url, self.key)
        self.table_name = table_name

    def insert_emails(self, data: List[Dict]):
        """Insert multiple email records into Supabase."""
        response = self.supabase.table(self.table_name).insert(data).execute()
        return response

    def create_table_if_not_exists(self):
        sql_query = """
        CREATE TABLE IF NOT EXISTS emails (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            email TEXT NOT NULL,
            link TEXT,
            snippet TEXT,
            site_name TEXT,
            site_description TEXT,
            crawled_at TIMESTAMP DEFAULT now()
        );
        """

        response = self.supabase.rpc("execute_sql", {"sql": sql_query}).execute()

        if response.data:
            print("✅ Table created or already exists!")
        else:
            print(f"❌ Error creating table: {response}")
        
        def get_all_emails(self):
            """Retrieve all stored email records."""
            response = self.supabase.table(self.table_name).select("*").execute()
            return response

    def search_by_email(self, email: str):
        """Search records by email."""
        response = self.supabase.table(self.table_name).select("*").eq("email", email).execute()
        return response

    def filter_by_site(self, site_name: str):
        """Filter email records by site name."""
        response = self.supabase.table(self.table_name).select("*").eq("site_name", site_name).execute()
        return response

    def delete_email(self, email: str):
        """Delete records by email."""
        response = self.supabase.table(self.table_name).delete().eq("email", email).execute()
        return response

# Example Usage
if __name__ == "__main__":
    
    manager = SupabaseEmailManager()
    manager.create_table_if_not_exists()
    sample_data = [
        {
            "title": "Charlie Puth - email me at charlieputhbusiness@gmail.com ...",
            "link": "https://www.facebook.com/charlieputh/posts/email-me-at-charlieputhbusiness@gmail.com-if-you-want-me-to-write-you-a-song/10151556980064433/",
            "snippet": "10 de abr. de 2013 ... email me at charlieputhbusiness@gmail.com if you want me to write you a song.",
            "email": "charlieputhbusiness@gmail.com",
            "site_name": "www.facebook.com",
            "site_description": "email me at charlieputhbusiness@gmail.com if you want me to write you a song",
            "crawled_at": "2025-03-18T07:20:31.529140"
        },
        {
            "title": "Kristin Chenoweth - Congrats! Please email my team at ...",
            "link": "https://www.facebook.com/photo.php?fbid=10152565423116360&id=61583196359&set=a.10150103506226360",
            "snippet": "7 de fev. de 2015 ... Congrats! Please email my team at officialkristinchenoweth@gmail.com if you're one of these peeps :)",
            "email": "officialkristinchenoweth@gmail.com",
            "site_name": "www.facebook.com",
            "site_description": "Congrats! Please email my team at officialkristinchenoweth@gmail.com if you're one of these peeps :)",
            "crawled_at": "2025-03-18T07:20:31.529170"
        }
    ]
    
    response = manager.insert_emails(sample_data)
    print(response)
    
