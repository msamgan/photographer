import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import {Head, useForm} from "@inertiajs/react"
import ListingTable from "@/Components/ListingTable.jsx"
import PageCard from "@/Components/PageCard.jsx"
import {useEffect, useRef, useState} from "react"
import DeleteLinkIcon from "@/Components/DeleteLinkIcon.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TransactionNotification from "@/Components/TransactionNotification.jsx";

export default function PackageListing({auth, jobTypes}) {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const nameInput = useRef()
    const {data, setData, errors, post, reset, processing, recentlySuccessful} = useForm({
        name: "",
    })

    useEffect(() => {
        setLoading(true)
        setListings(jobTypes)
        setLoading(false)
    }, [])


    const submit = (e) => {
        e.preventDefault()
        post(route("job-type.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset()

                setTimeout(() => {
                    window.location.reload()
                }, 800)
            },
            onError: (errors) => {
                if (errors.name) {
                    reset("name")
                    nameInput.current.focus()
                }
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Listing Job Types</h2>}
        >
            <Head title="Job Types"/>

            <PageCard
                header={"Create Job Type"}
                header_description={"Create a new Job Type."}
            >
                <form onSubmit={submit} method="POST" action={route("job-type.store")}>
                    <div className={"mt-3"}>
                        <InputLabel htmlFor="name" value="Job Type Name" isRequired={true}/>
                        <TextInput
                            id="name"
                            ref={nameInput}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            type="text"
                            className="mt-1 w-1/2"
                            autoComplete="name"
                        />
                        <InputError message={errors.name} className="mt-2"/>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <TransactionNotification recentlySuccessful={recentlySuccessful}/>
                    </div>
                </form>
            </PageCard>

            <PageCard
                header={"Listing Job Types"}
                header_description={
                    "All your available Job Types. You have total of " + listings.length + " Job Types."
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
                                        <DeleteLinkIcon link={route("job-type.destroy", listing.uuid)}
                                                        label={"Delete"}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </ListingTable>
                )
                }
            </PageCard>
        </AuthenticatedLayout>
    )
}
