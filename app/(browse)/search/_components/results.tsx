import { getSearch } from "@/lib/search-service";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard, ResultCardSkeleton } from "../_components/result-card";

interface ResultsProps {
    term?: string;
}

export const Results = async ({ term, } : ResultsProps) => {
    const data = await getSearch(term);
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for term &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text text-muted-foreground text-sm">
                    No results found. Try searching for something else.
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard key={result.id} data={result} />
                ))}
            </div>
        </div>
    );

};

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

// export async function Results({ term }: { term?: string }) {
// };

// export function ResultsSkeleton() {
// };