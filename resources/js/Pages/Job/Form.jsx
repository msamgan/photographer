import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import Select from "react-select"
import { useState } from "react"

const eventInput = (nextIndex, data, setData, errors, showRemoveButton = false) => {
    return (
        <div id={nextIndex} className={"mt-3 flex flex-row gap-5 w-2/3"}>
            <div className={"w-1/4"}>
                <InputLabel htmlFor={"event_name-" + nextIndex} value="Event Name" isRequired={true} />
                <TextInput
                    value={data.event_name[nextIndex]}
                    onChange={(e) => {
                        let newData = data
                        newData.event_name[nextIndex] = e.target.value
                        setData("event_name", newData.event_name)
                    }}
                    id={"event_name-" + nextIndex}
                    type="text"
                    className="mt-1 w-full"
                    autoComplete="event_name"
                />
            </div>
            <div className={"w-1/4"}>
                <InputLabel htmlFor={"event_location-" + nextIndex} value="Event Location" isRequired={true} />
                <TextInput
                    id={"event_location-" + nextIndex}
                    value={data.event_location[nextIndex]}
                    onChange={(e) => {
                        let newData = data
                        newData.event_location[nextIndex] = e.target.value
                        setData("event_location", newData.event_location)
                    }}
                    type="text"
                    className="mt-1 w-full"
                    autoComplete="event_location"
                />
            </div>
            <div className={"w-1/4"}>
                <InputLabel htmlFor={"event_date-" + nextIndex} value="Event Date" isRequired={true} />
                <TextInput
                    id={"event_date-" + nextIndex}
                    value={data.event_date[nextIndex]}
                    onChange={(e) => {
                        let newData = data
                        newData.event_date[nextIndex] = e.target.value
                        setData("event_date", newData.event_date)
                    }}
                    type="date"
                    className="mt-1 w-full"
                    autoComplete="event_date"
                />
            </div>
            <div className={"w-1/4"}>
                <InputLabel htmlFor={"event_time-" + nextIndex} value="Event Time" isRequired={true} />
                <TextInput
                    id={"event_time-" + nextIndex}
                    value={data.event_time[nextIndex]}
                    onChange={(e) => {
                        let newData = data
                        newData.event_time[nextIndex] = e.target.value
                        setData("event_time", newData.event_time)
                    }}
                    type="time"
                    className="mt-1 w-full"
                    autoComplete="event_time"
                />
            </div>
            {showRemoveButton && (
                <span className={"has-tooltip"}>
                    <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                        Remove this event from job
                    </span>
                    <button
                        className={"mt-8 bg-red-500 p-1 rounded text-white"}
                        onClick={(e) => {
                            e.preventDefault()
                            let ele = document.getElementById(nextIndex)
                            ele.remove()

                            let newData = data
                            newData.event_name.splice(nextIndex, 1)
                            newData.event_location.splice(nextIndex, 1)
                            newData.event_date.splice(nextIndex, 1)
                            setData("event_name", newData.event_name)
                            setData("event_location", newData.event_location)
                            setData("event_date", newData.event_date)
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
            )}
        </div>
    )
}

export default function PackageForm({ data, setData, errors, refs, attributes }) {
    const [showCharges, setShowCharges] = useState(false)
    const [additionalEvents, setAdditionalEvents] = useState([])
    const [eventCount, setEventCount] = useState(0)

    const addAdditionalEvent = () => {
        let nextIndex = eventCount + 1
        setEventCount(nextIndex)
        setAdditionalEvents([...additionalEvents, eventInput(nextIndex, data, setData, errors, true)])
    }

    return (
        <div>
            <div className={"mt-3"}>
                <InputLabel htmlFor="name" value="Job Title" isRequired={true} />
                <TextInput
                    id="name"
                    ref={refs.nameInput}
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    type="text"
                    className="mt-1 w-2/3"
                    autoComplete="name"
                    isFocused={true}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <span className={"flex flex-row gap-3 w-2/3"}>
                <div className={"mt-3 w-1/3"}>
                    <InputLabel htmlFor="client" value="Client Name" isRequired={true} />
                    <Select
                        id="client"
                        ref={refs.clientInput}
                        onChange={(e) => setData("client", e.value)}
                        options={attributes.clientsOptions}
                        className="mt-1 w-full"
                        autoComplete="client"
                    />
                    <InputError message={errors.client} className="mt-2" />
                </div>
                <div className={"mt-3 w-1/3"}>
                    <InputLabel htmlFor="job_type" value="Job Type" isRequired={true} />
                    <Select
                        id="job_type"
                        ref={refs.jobTypeInput}
                        onChange={(e) => setData("job_type", e.value)}
                        options={attributes.jobTypesOptions}
                        className="mt-1 w-full"
                        autoComplete="job_type"
                    />
                    <InputError message={errors.job_type} className="mt-2" />
                </div>
                <div className={"mt-3 w-1/3"}>
                    <InputLabel htmlFor="package_type" value="Package" isRequired={true} />
                    <Select
                        id="package_type"
                        ref={refs.packageInput}
                        onChange={(e) => {
                            setData("package_type", e.value)
                            setShowCharges(false)
                            fetch(route("package.show", e.value))
                                .then((response) => response.json())
                                .then((packageData) => {
                                    setData({
                                        ...data,
                                        charges: packageData.charges,
                                        initial_deposits: packageData.initial_deposits,
                                        package_type: e.value
                                    })
                                    setShowCharges(true)
                                })
                        }}
                        options={attributes.packagesOptions}
                        className="mt-1 w-full"
                        autoComplete="package_type"
                    />
                    <InputError message={errors.package_type} className="mt-2" />
                </div>
            </span>
            <span className={"flex flex-row gap-3 w-2/3" + (showCharges ? "" : " hidden")}>
                <div className={"mt-3 w-1/2"}>
                    <InputLabel htmlFor="charges" value="Package Charges (USD)" isRequired={true} />
                    <TextInput
                        id="charges"
                        ref={refs.chargesInput}
                        value={data.charges}
                        onChange={(e) => setData("charges", e.target.value)}
                        type="number"
                        className="mt-1 w-full"
                        autoComplete="charges"
                    />
                    <InputError message={errors.charges} className="mt-2" />
                </div>
                <div className={"mt-3 w-1/2"}>
                    <InputLabel htmlFor="initial_deposits" value="Intial Deposits (USD)" isRequired={true} />
                    <TextInput
                        id="initial_deposits"
                        ref={refs.initialDepositsInput}
                        value={data.initial_deposits}
                        onChange={(e) => setData("initial_deposits", e.target.value)}
                        type="number"
                        className="mt-1 w-full"
                        autoComplete="initial_deposits"
                    />
                    <InputError message={errors.initial_deposits} className="mt-2" />
                </div>
            </span>
            <h5 className={"mt-5 text-lg font-bold"}>Events</h5>
            <div className={"mt-3"}>{eventInput(0, data, setData, errors, false)}</div>
            {additionalEvents.map((service, index) => {
                return <div key={index}>{service}</div>
            })}

            <div className={"mt-3"}>
                <span className={"has-tooltip"}>
                    <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-black -mt-8">
                        Add more events to job
                    </span>
                    <button
                        className={"mt-1 bg-yellow-500 p-1 rounded text-white w-2/3 hover:bg-yellow-600"}
                        onClick={(e) => {
                            e.preventDefault()
                            addAdditionalEvent()
                        }}
                    >
                        <span className={"flex justify-center"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mr-2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Event
                        </span>
                    </button>
                </span>
            </div>
        </div>
    )
}
