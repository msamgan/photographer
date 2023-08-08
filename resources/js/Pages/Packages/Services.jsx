import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head, useForm } from "@inertiajs/react"
import PageCard from "@/Components/PageCard.jsx"
import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import { useEffect, useState } from "react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import TransactionNotification from "@/Components/TransactionNotification.jsx"
import InputError from "@/Components/InputError.jsx"

const serviceInputs = (nextIndex, data, setData, errors, showRemoveButton = false) => {
    return (
        <div id={nextIndex} className={"mt-3 flex flex-row gap-5 w-2/3"}>
            <div className={"w-1/3"}>
                <InputLabel htmlFor={"name-" + nextIndex} value="Service Name" isRequired={true} />
                <TextInput
                    value={data.name[nextIndex]}
                    onChange={(e) => {
                        let newData = data
                        newData.name[nextIndex] = e.target.value
                        setData("name", newData.name)
                    }}
                    id={"name-" + nextIndex}
                    type="text"
                    className="mt-1 w-full"
                    autoComplete="name"
                />
            </div>
            <div className={"w-2/3"}>
                <InputLabel
                    htmlFor={"description-" + nextIndex}
                    value="Service Description"
                    isRequired={true}
                />
                <TextInput
                    id={"description-" + nextIndex}
                    value={data.description[nextIndex]}
                    onChange={(e) => {
                        let newData = data
                        newData.description[nextIndex] = e.target.value
                        setData("description", newData.description)
                    }}
                    type="text"
                    className="mt-1 w-full"
                    autoComplete="description"
                />
            </div>
            {showRemoveButton && (
                <div className={""}>
                    <span className={"has-tooltip"}>
                        <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                            Remove this services from package
                        </span>
                        <button
                            className={"mt-8 bg-red-500 p-1 rounded text-white"}
                            onClick={(e) => {
                                e.preventDefault()
                                let ele = document.getElementById(nextIndex)
                                ele.remove()

                                let newData = data
                                newData.name.splice(nextIndex, 1)
                                newData.description.splice(nextIndex, 1)
                                setData("name", newData.name)
                                setData("description", newData.description)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </button>
                    </span>
                </div>
            )}
        </div>
    )
}

export default function PackageServices({ auth, packageData }) {
    const [servicesCount, setServicesCount] = useState(1)

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: [],
        description: []
    })

    const updateData = async (services) => {
        let name = []
        let description = []
        services.map((service, index) => {
            name[index] = service.name
            description[index] = service.description
        })

        setData({
            name: name,
            description: description
        })
    }

    useEffect(() => {
        if (packageData.services.length === 0) {
            return
        }

        setServicesCount(packageData.services.length)

        async function fetchData() {
            await updateData(packageData.services)
        }

        fetchData().then((r) => {
            // console.log('Data updated')
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        post(route("package.services.store", packageData.uuid), {
            preserveScroll: true,
            onSuccess: () => {
            },
            onError: (errors) => {
            },
            onFinish: () => {
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Package Services | {packageData.name}
                </h2>
            }
        >
            <Head title="Package Services" />

            <PageCard
                header={"Package Services for " + packageData.name}
                header_description={
                    "Add or remove Package Services for " +
                    packageData.name +
                    " package. You can have any number of services in a package."
                }
            >
                {errors && (
                    <div className={"mt-4"}>
                        {Object.keys(errors).map((error, index) => {
                            return <InputError key={index} message={errors[error]} className="mt-1" />
                        })}
                    </div>
                )}

                <form onSubmit={submit} method={"post"} className="mt-6 space-y-6">
                    {Array(servicesCount)
                        .fill(null)
                        .map((_, index) => {
                            return <div key={index}>{serviceInputs(index, data, setData, errors, !!index)}</div>
                        })}

                    <div className={"mt-4 w-2/3"}>
                        <span className={"has-tooltip"}>
                            <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                                Add more services to package
                            </span>
                            <button
                                className={"mt-1 bg-yellow-500 p-1 rounded text-white w-full"}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setServicesCount(servicesCount + 1)
                                }}
                            >
                                <span className={"flex flex-row justify-center"}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Add Service
                                </span>
                            </button>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <TransactionNotification recentlySuccessful={recentlySuccessful} />
                    </div>
                </form>
            </PageCard>
        </AuthenticatedLayout>
    )
}
