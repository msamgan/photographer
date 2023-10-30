import { useEffect, useRef } from "react"
import { Head, useForm } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import PageCard from "@/Components/PageCard.jsx"
import Form from "@/Pages/Packages/Form.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import TransactionNotification from "@/Components/TransactionNotification.jsx"

export default function PackageEdit({ auth, packageData }) {
    const nameInput = useRef()
    const chargesInput = useRef()
    const initialDepositsInput = useRef()

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: "",
        description: "",
        charges: "",
        initial_deposits: ""
    })

    useEffect(() => {
        setData({
            name: packageData.name,
            description: packageData.description,
            charges: packageData.charges,
            initial_deposits: packageData.initial_deposits
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        post(route("package.update", packageData.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                //
            },
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
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Package | {packageData.name}
                </h2>
            }
        >
            <Head title={"Edit Package | " + packageData.name} />

            <PageCard
                header={"Edit " + packageData.name + " Package"}
                header_description={"Edit package details for " + packageData.name + "."}
            >
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
