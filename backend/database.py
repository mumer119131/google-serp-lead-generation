import asyncio
from prisma import Prisma
from datetime import datetime

class SupabaseEmailManager:
    def __init__(self):
        """Initialize Prisma client."""
        self.db = Prisma()

    async def connect(self):
        """Connect to the database."""
        await self.db.connect()

    async def disconnect(self):
        """Disconnect from the database."""
        await self.db.disconnect()

    async def insert_emails(self, data):
        """Insert multiple email records into Prisma."""
        created_emails = [await self.db.emailleads.create(data=record) for record in data]
        return created_emails
    
    async def get_emails(self):
        """Retrieve all email records from Prisma."""
        emails = await self.db.emailleads.find_many()
        return emails
    
    async def get_links_list(self):
        """Retrieve all email records from Prisma as a list."""
        emails_leads = await self.db.emailleads.find_many()
        links = []
        for email_lead in emails_leads:
            links.append(email_lead.link)
        return links

# Example Usage
# async def main():
    # manager = SupabaseEmailManager()
    # await manager.connect()

#     sample_data = [
#     {
#         "title": "Charlie Puth - email me at charlieputhbusiness@gmail.com ...",
#         "link": "https://www.facebook.com/charlieputh/posts/email-me-at-charlieputhbusiness@gmail.com-if-you-want-me-to-write-you-a-song/10151556980064433/",
#         "snippet": "10 de abr. de 2013 ... email me at charlieputhbusiness@gmail.com if you want me to write you a song.",
#         "email": "charlieputhbusiness@gmail.com",
#         "site_name": "www.facebook.com",
#         "site_desc": "email me at charlieputhbusiness@gmail.com if you want me to write you a song",
#         "query": "site:facebook.com \"@gmail.com\"",
#         "crawled_at": datetime.strptime("2025-03-18T07:20:31.529140", "%Y-%m-%dT%H:%M:%S.%f")  # ✅ Convert to DateTime
#     }
# ]

#     response = await manager.insert_emails(sample_data)
#     print(response)

    # response = await manager.get_links_list()
    # print(response)

    # await manager.disconnect()

# Run the async function
# asyncio.run(main())
