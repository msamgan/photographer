import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head } from "@inertiajs/react"
import AddLinkButton from "@/Components/AddLinkButton.jsx"
import ListingTable from "@/Components/ListingTable.jsx"
import PageCard from "@/Components/PageCard.jsx"
import { useEffect, useState } from "react"

export default function PackageListing({ auth, jobs }) {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setListings(jobs)
        setLoading(false)
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Listing Jobs</h2>}
        >
            <Head title="Jobs" />

            <AddLinkButton link={route("job.create")} label="Add Job" />

            <PageCard
                header={"Listing Jobs"}
                header_description={"All your available jobs. You have total of " + listings.length + " jobs."}
            >
                {loading && <div className={"py-3"}>Loading...</div>}
                {listings.length === 0 && <div className={"py-3"}>No records found.</div>}
                {!loading && listings.length > 0 && (
                    <ListingTable>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Events
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Registration Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((listing, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4" scope="row">
                                            {listing.name}
                                        </td>
                                        <td className="px-6 py-4">{listing.type}</td>
                                        <td className="px-6 py-4">{listing.total_events}</td>
                                        <td className="px-6 py-4">{listing.cerated_at}</td>
                                        <td className="px-6 py-4">{listing.status}</td>
                                        <td className="px-6 py-4">
                                            {/* <EditLinkIcon link={route("job.edit", listing.uuid)}
                                                      lable={" Edit"}/>
                                        <DeleteLinkIcon link={route("job.destroy", listing.uuid)}
                                                        label={"Delete"}/>*/}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </ListingTable>
                )}
            </PageCard>
        </AuthenticatedLayout>
    )
}
