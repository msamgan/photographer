import { useEffect, useRef } from "react"
import { Head, useForm } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import PageCard from "@/Components/PageCard.jsx"
import Form from "@/Pages/Job/Form.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import TransactionNotification from "@/Components/TransactionNotification.jsx"
import InputError from "@/Components/InputError.jsx"

export default function PackageEdit({ auth, clients, jobTypes, packages, job }) {
    const nameInput = useRef()
    const chargesInput = useRef()
    const initialDepositsInput = useRef()

    const clientsOptions = clients.map((client) => {
        return {
            value: client.uuid,
            label: client.name
        }
    })

    const jobTypesOptions = jobTypes.map((jobType) => {
        return {
            value: jobType.uuid,
            label: jobType.name
        }
    })

    const packagesOptions = packages.map((packageOption) => {
        return {
            value: packageOption.uuid,
            label: packageOption.name
        }
    })

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: "",
        client: "",
        job_type: "",
        package_type: "",
        charges: "",
        initial_deposits: "",
        event_name: [],
        event_location: [],
        event_date: [],
        event_time: []
    })

    useEffect(() => {
        setData({
            name: job.name,
            client: job.client.uuid,
            job_type: job.job_type.uuid,
            package_type: job.package.uuid,
            charges: job.charges,
            initial_deposits: job.initial_deposits,
            event_name: job.events.map((event) => event.event_name),
            event_location: job.events.map((event) => event.event_location),
            event_date: job.events.map((event) => event.event_date),
            event_time: job.events.map((event) => event.event_time)
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        post(route("job.update", job.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                //
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
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Job | {job.name}
                </h2>
            }
        >
            <Head title={"Edit Job | " + job.name} />

            <PageCard
                header={"Edit " + job.name + " Job"}
                header_description={"Edit job details for " + job.name + "."}
            >
                {errors && (
                    <div className={"mt-4"}>
                        {Object.keys(errors).map((error, index) => {
                            return <InputError key={index} message={errors[error]} className="mt-1" />
                        })}
                    </div>
                )}

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
                        attributes={{
                            clientsOptions,
                            jobTypesOptions,
                            packagesOptions
                        }}
                        isEdit={true}
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
