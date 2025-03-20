import { Lead, RawLead } from "@/types/leads";
import axios from "axios";
import { getOnlyEmails, insertEmails } from "../db/leads";

interface SearchResult {
  title?: string;
  link?: string;
  snippet?: string;
  userId?: string;
  email?: string;
  site_name?: string;
  site_desc?: string;
  query: string;
}

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
const CSE_ID = process.env.CSE_ID || "";



// Perform a Google search
const googleSearch = async (query: string, page: number): Promise<RawLead> => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${CSE_ID}&q=${query}&start=${page + 1}`;
  const response = await axios(url);
  return response.data;
};

// Extract and format search results
const formatSearchResults = (data: RawLead, query: string, links: string[], userId: string): Lead[] => {
  const results: SearchResult[] = [];

  for (const item of data.items || []) {
    const emails = item.snippet.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g);
    let email = emails ? emails[0] : "";

    if (email.endsWith(".")) {
      email = email.slice(0, -1);
    }

    if (!email) {
      console.log("Email not found in snippet.");
      continue;
    }

    const result: SearchResult = {
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      userId,
      email,
      site_name: item.displayLink,
      site_desc: item.pagemap?.metatags?.[0]?.["og:description"],
      query,
    };

    if (!links.includes(result.link || "")) {
      console.log(`Link ${result.link} already exists in the database.`);
      results.push(result);
    }
  }
  return results as Lead[];
};


async function saveDataToDatabase(data: Lead[]): Promise<void> {
    if(data.length === 0) {
        console.log("No data to save.");
        return;
    }
    insertEmails(data);
}

// Main function
export const scrape = async (number: number, pages: number, query: string, userId: string): Promise<void> => {
  const links = await getOnlyEmails();

  for (let page = 0; page < pages; page++) {
    const data = await googleSearch(query, page);

    const formattedData = formatSearchResults(data, query, links, userId);

    if (formattedData.length > 0) {
      await saveDataToDatabase(formattedData);
    }
  }
};

// // Run the script
// (async () => {
//   await main(10, 10, 'site:facebook.com "need a web developer" "@gmail.com"');
// })();
