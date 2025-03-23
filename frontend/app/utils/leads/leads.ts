import { LeadsResponse } from "@/types/leads";

// CSV Export Function
export const exportCSV = (leads: LeadsResponse) => {
    if (leads.results.length === 0) {
        return alert('No leads to export.');
    }

    const csvContent = [
        ['Query', 'ID', 'Title', 'Email', 'Link', 'Snippet', 'Site Name', 'Site Description', 'Status', 'Crawled At', 'Updated At'], // CSV Headers
        ...leads.results.map((lead) => [
            lead.query || '',                      // Handle null values gracefully
            lead.id,
            lead.title.replaceAll(',', '').replaceAll('\n', ' '), // Remove commas from the title
            lead.email,
            lead.link || '',
            lead.snippet?.replaceAll(',', '').replaceAll('\n', ' ') || '',
            lead.site_name || '',
            lead.site_desc?.replaceAll(',', '').replaceAll('\n', ' ') || '',
            lead.status,
            lead.crawled_at ? new Date(lead.crawled_at).toISOString() : '',
            lead.updated_at ? new Date(lead.updated_at).toISOString() : ''
        ])
    ]
        .map((row) => row.join(',')) // Convert each array (row) into a comma-separated string
        .join('\n'); // Join all rows with newlines

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leads.csv'); // Set the file name for download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up by removing the temporary element
};


export const deleteLeads = async (checkedLeads: string[]) => {
    const res = await fetch('/api/leads/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ leads: checkedLeads }),
        credentials: 'include'
    })
    if (res.ok) {
        const data = await res.json()
        console.log(data)
    }
    
}