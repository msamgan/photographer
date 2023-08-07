export default function ListingTable({ children, ...props }) {
    return (
        <div className="relative pt-6">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">{children}</table>
        </div>
    )
}
