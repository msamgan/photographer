import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head, Link } from "@inertiajs/react"
import AddLinkButton from "@/Components/AddLinkButton.jsx"
import ListingTable from "@/Components/ListingTable.jsx"
import PageCard from "@/Components/PageCard.jsx"
import { useEffect, useState } from "react"
import EditLinkIcon from "@/Components/EditLinkIcon.jsx"
import DeleteLinkIcon from "@/Components/DeleteLinkIcon.jsx"
import Swal from "sweetalert2"

export default function PackageListing({ auth, packagesData }) {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setListings(packagesData)
        setLoading(false)
    }, [])

    const replicatePackage = (uuid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to replicate this package?",
            showCancelButton: true,
            confirmButtonText: "Yes, replicate it!",
            cancelButtonText: "No, cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = route("package.replicate", uuid)
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Listing Packages</h2>}
        >
            <Head title="Packages" />

            <AddLinkButton link={route("package.create")} label="Add Pakage" />

            <PageCard
                header={"Listing Packages"}
                header_description={
                    "All your available packages. You have total of " + listings.length + " packages."
                }
            >
                {loading && <div className={"py-3"}>Loading...</div>}
                {listings.length === 0 && <div className={"py-3"}>No records found.</div>}
                {!loading && listings.length > 0 && (
                    <ListingTable>
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Charges
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Service Count
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
                                    <td className="px-6 py-4">
                                        {listing.charges} {"USD"}
                                    </td>
                                    <td className="px-6 py-4">{listing.description}</td>
                                    <td className="px-6 py-4">
                                        <span className={"has-tooltip"}>
                                            <span
                                                className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                                                <ul>
                                                    {listing.services.map((service, index) => {
                                                            return <li key={index}>{service.name}</li>
                                                        }
                                                    )}
                                                </ul>
                                            </span>
                                            <span
                                                className={"text-blue-800 text-lg cursor-pointer"}>{listing.services_count}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <EditLinkIcon
                                            link={route("package.edit", listing.uuid)}
                                            lable={" Edit"}
                                        />

                                        <Link href={route("package.services", listing.uuid)}>
                                            <span className={"has-tooltip"}>
                                                <span
                                                    className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                                                    Add services
                                                </span>
                                                <button className={"mr-3"} onClick={(e) => {
                                                }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Link>

                                        <span className={"has-tooltip"}>
                                            <span
                                                className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                                                Replicate
                                            </span>
                                            <button
                                                className={"mr-3"}
                                                onClick={(e) => {
                                                    replicatePackage(listing.uuid)
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                                                    />
                                                </svg>
                                            </button>
                                        </span>

                                        <DeleteLinkIcon
                                            link={route("package.destroy", listing.uuid)}
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
