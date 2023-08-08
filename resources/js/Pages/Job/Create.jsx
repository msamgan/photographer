import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import {Head, useForm} from "@inertiajs/react"
import PageCard from "@/Components/PageCard.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import {useRef} from "react"
import TransactionNotification from "@/Components/TransactionNotification.jsx"
import Form from "@/Pages/Job/Form.jsx"
import InputError from "@/Components/InputError.jsx";

export default function PackageCreate({auth, clients, jobTypes, packages}) {
    const nameInput = useRef()
    const clientInput = useRef()
    const jobTypeInput = useRef()
    const packageInput = useRef()
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

    const {data, setData, errors, post, reset, processing, recentlySuccessful} = useForm({
        name: "",
        client: "",
        job_type: "",
        package_type: "",
        charges: "",
        initial_deposits: "",
        event_name: [],
        event_location: [],
        event_date: [],
        event_time: [],
    })

    const submit = (e) => {
        e.preventDefault()
        post(route("job.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Job</h2>}
        >
            <Head title="Create Job"/>

            <PageCard header={"Create Job"} header_description={"Create a new job."}>

                {errors && (
                    <div className={"mt-4"}>
                        {Object.keys(errors).map((error, index) => {
                            return <InputError key={index} message={errors[error]} className="mt-1"/>
                        })}
                    </div>
                )}

                <form onSubmit={submit} method={"post"} className="mt-6 space-y-6">
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        refs={
                            {
                                nameInput,
                                clientInput,
                                jobTypeInput,
                                packageInput,
                                chargesInput,
                                initialDepositsInput,
                            }
                        }
                        attributes={
                            {
                                clientsOptions,
                                jobTypesOptions,
                                packagesOptions,
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
