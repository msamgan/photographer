import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import {Head, useForm} from "@inertiajs/react"
import PageCard from "@/Components/PageCard.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import {useRef} from "react"
import TransactionNotification from "@/Components/TransactionNotification.jsx"
import Form from "@/Pages/Client/Form.jsx"

export default function PackageCreate({auth}) {
    const nameInput = useRef()
    const fullAddressInput = useRef()
    const emailInput = useRef()
    const phoneInput = useRef()

    const {data, setData, errors, post, reset, processing, recentlySuccessful} = useForm({
        name: "",
        spouse_name: "",
        full_address: "",
        email: "",
        phone: "",
    })

    const submit = (e) => {
        e.preventDefault()
        post(route("client.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Client</h2>}
        >
            <Head title="Create Client"/>

            <PageCard header={"Create Client"} header_description={"Create a new client."}>
                <form onSubmit={submit} method={"post"} className="mt-6 space-y-6">
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        refs={
                            {
                                nameInput,
                                fullAddressInput,
                                emailInput,
                                phoneInput
                            }
                        }
                    ></Form>
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <TransactionNotification recentlySuccessful={recentlySuccessful}/>
                    </div>
                </form>
            </PageCard>
        </AuthenticatedLayout>
    )
}
