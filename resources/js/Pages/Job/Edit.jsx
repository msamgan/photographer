import { useEffect, useRef } from "react"
import { Head, useForm } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import PageCard from "@/Components/PageCard.jsx"
import Form from "@/Pages/Client/Form.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import TransactionNotification from "@/Components/TransactionNotification.jsx"

export default function PackageEdit({ auth, client }) {
    const nameInput = useRef()
    const fullAddressInput = useRef()
    const emailInput = useRef()
    const phoneInput = useRef()

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: "",
        spouse_name: "",
        full_address: "",
        email: "",
        phone: ""
    })

    useEffect(() => {
        setData({
            name: client.name,
            spouse_name: client.spouse_name,
            full_address: client.full_address,
            email: client.email,
            phone: client.phone
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        post(route("client.update", client.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                //
            },
            onError: (errors) => {
                if (errors.name) {
                    reset("name")
                    nameInput.current.focus()
                }

                if (errors.full_address) {
                    reset("full_address")
                    if (!errors.name) {
                        fullAddressInput.current.focus()
                    }
                }

                if (errors.email) {
                    reset("email")
                    if (!errors.email) {
                        emailInput.current.focus()
                    }
                }

                if (errors.phone) {
                    reset("phone")
                    if (!errors.phone) {
                        phoneInput.current.focus()
                    }
                }
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Client | {client.name}
                </h2>
            }
        >
            <Head title={"Edit Client | " + client.name} />

            <PageCard
                header={"Edit " + client.name + " Client"}
                header_description={"Edit client details for " + client.name + "."}
            >
                <form onSubmit={submit} method={"post"} className="mt-6 space-y-6">
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        refs={{
                            nameInput,
                            fullAddressInput,
                            emailInput,
                            phoneInput
                        }}
                    ></Form>
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <TransactionNotification recentlySuccessful={recentlySuccessful} />
                    </div>
                </form>
            </PageCard>
        </AuthenticatedLayout>
    )
}
