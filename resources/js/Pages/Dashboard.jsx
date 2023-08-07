import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {Head, Link} from "@inertiajs/react"

export default function Dashboard({auth, packageCount}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg mx-8 my-8 py-2">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Packages</div>
                            <p className="text-gray-700 text-base">
                                You have a total
                                of {packageCount} packages, {packageCount > 0 ? 'click the button below to view them' : 'click the button below to create one'}.

                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <Link href={packageCount === 0 ? route('package.create') : route('package.index')}
                                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {packageCount === 0 ? 'Create a package' : 'View packages'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
