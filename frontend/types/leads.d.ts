export interface Lead {
    query: string | null;
    id: string;
    title: string;
    email: string;
    link: string | null;
    snippet: string | null;
    site_name: string | null;
    site_desc: string | null;
    status: string;
    userId: string;
    crawled_at: Date;
    updated_at: Date;
}

interface Email {
    id: number;
    email: string;
    name: string;
    created_at: string;
}

export interface LeadsResponse {
    metadata: {
        page: number;
        total: number;
        resultsPerPage: number;
    };
    results: Lead[];
}
export interface RawLead {
    kind: string;
    url: {
        type: string;
        template: string;
    };
    queries: {
        previousPage?: Array<{
            title: string;
            totalResults: string;
            searchTerms: string;
            count: number;
            inputEncoding: string;
            outputEncoding: string;
            safe: string;
            cx: string;
        }>;
        request: Array<{
            title: string;
            totalResults: string;
            searchTerms: string;
            count: number;
            startIndex: number;
            inputEncoding: string;
            outputEncoding: string;
            safe: string;
            cx: string;
        }>;
        nextPage?: Array<{
            title: string;
            totalResults: string;
            searchTerms: string;
            count: number;
            startIndex: number;
            inputEncoding: string;
            outputEncoding: string;
            safe: string;
            cx: string;
        }>;
    };
    context: {
        title: string;
    };
    searchInformation: {
        searchTime: number;
        formattedSearchTime: string;
        totalResults: string;
        formattedTotalResults: string;
    };
    items: Array<{
        kind: string;
        title: string;
        htmlTitle: string;
        link: string;
        displayLink: string;
        snippet: string;
        htmlSnippet: string;
        formattedUrl: string;
        htmlFormattedUrl: string;
        pagemap: {
            cse_thumbnail?: Array<{
                src: string;
                width: string;
                height: string;
            }>;
            metatags?: Array<{
                [key: string]: string;
            }>;
            cse_image?: Array<{
                src: string;
            }>;
        };
    }>;
}