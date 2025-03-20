import { DEFAULT_RESULTS_PER_PAGE } from "@/data/variables";


export const paginationFormat = <T>(results: T[], page: number = 1, resultsPerPage: number = DEFAULT_RESULTS_PER_PAGE): T[] => {
    const start = (page - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    return results.slice(start, end);
};