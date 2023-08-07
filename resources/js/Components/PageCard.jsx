export default function PageCard({ className = "", header, header_description, children }) {
    return (
        <div className="py-8">
            <div className=" max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section className={className}>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">{header}</h2>
                            <p className="mt-1 text-sm text-gray-600">{header_description}</p>
                        </header>

                        {children}
                    </section>
                </div>
            </div>
        </div>
    )
}
