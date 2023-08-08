import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head } from "@inertiajs/react"
import AddLinkButton from "@/Components/AddLinkButton.jsx"
import ListingTable from "@/Components/ListingTable.jsx"
import PageCard from "@/Components/PageCard.jsx"
import { useEffect, useState } from "react"
import EditLinkIcon from "@/Components/EditLinkIcon.jsx"
import DeleteLinkIcon from "@/Components/DeleteLinkIcon.jsx"

export default function PackageListing({ auth, clients }) {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setListings(clients)
        setLoading(false)
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Listing Clients</h2>}
        >
            <Head title="Clients" />

            <AddLinkButton link={route("client.create")} label="Add Client" />

            <PageCard
                header={"Listing Clients"}
                header_description={
                    "All your available clients. You have total of " + listings.length + " clients."
                }
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
                                    Spouse Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
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
                                        <td className="px-6 py-4">{listing.spouse_name}</td>
                                        <td className="px-6 py-4 sm:max-w-sm">{listing.full_address}</td>
                                        <td className="px-6 py-4">{listing.email}</td>
                                        <td className="px-6 py-4">{listing.phone}</td>
                                        <td className="px-6 py-4">
                                            <EditLinkIcon
                                                link={route("client.edit", listing.uuid)}
                                                lable={" Edit"}
                                            />
                                            <DeleteLinkIcon
                                                link={route("client.destroy", listing.uuid)}
                                                label={"Delete"}
                                            />
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
