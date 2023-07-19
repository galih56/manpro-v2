import { ArchiveBoxIcon } from "@heroicons/react/24/outline"

export const NoEntriesFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
            <ArchiveBoxIcon className="w-16 h-16" />
            <h4>No Entries Found</h4>
        </div>
    )
}