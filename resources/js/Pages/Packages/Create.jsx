import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head, useForm } from "@inertiajs/react"
import PageCard from "@/Components/PageCard.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { useRef } from "react"
import TransactionNotification from "@/Components/TransactionNotification.jsx"
import Form from "@/Pages/Packages/Form.jsx"

export default function PackageCreate({ auth }) {
    const nameInput = useRef()
    const chargesInput = useRef()
    const initialDepositsInput = useRef()

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: "",
        description: "",
        charges: "",
        initial_deposits: ""
    })

    const submit = (e) => {
        e.preventDefault()
        post(route("package.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.name) {
                    reset("name")
                    nameInput.current.focus()
                }

                if (errors.charges) {
                    reset("charges")
                    if (!errors.name) {
                        chargesInput.current.focus()
                    }
                }
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Package</h2>}
        >
            <Head title="Create Package" />

            <PageCard header={"Create Package"} header_description={"Create a new package."}>
                <form onSubmit={submit} method={"post"} className="mt-6 space-y-6">
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        refs={{
                            nameInput,
                            chargesInput,
                            initialDepositsInput
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
