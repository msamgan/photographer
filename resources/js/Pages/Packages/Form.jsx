import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"

export default function PackageForm({data, setData, errors, refs}) {
    return (
        <div>
            <div className={"mt-3"}>
                <InputLabel htmlFor="name" value="Package Name" isRequired={true}/>
                <TextInput
                    id="name"
                    ref={refs.nameInput}
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    type="text"
                    className="mt-1 w-1/2"
                    autoComplete="name"
                    isFocused={true}
                />
                <InputError message={errors.name} className="mt-2"/>
            </div>
            <span className={'flex flex-row gap-3'}>
                <div className={"mt-3 w-1/2"}>
                    <InputLabel htmlFor="charges" value="Package Charges (USD)" isRequired={true}/>
                    <TextInput
                        id="charges"
                        ref={refs.chargesInput}
                        value={data.charges}
                        onChange={(e) => setData("charges", e.target.value)}
                        type="number"
                        className="mt-1 w-full"
                        autoComplete="charges"
                    />
                    <InputError message={errors.charges} className="mt-2"/>
                </div>
                <div className={"mt-3 w-full"}>
                    <InputLabel htmlFor="initial_deposits" value="Intial Deposits (USD)" isRequired={true}/>
                    <TextInput
                        id="initial_deposits"
                        ref={refs.initialDepositsInput}
                        value={data.initial_deposits}
                        onChange={(e) => setData("initial_deposits", e.target.value)}
                        type="number"
                        className="mt-1 w-1/4"
                        autoComplete="charges"
                    />
                    <InputError message={errors.initial_deposits} className="mt-2"/>
                </div>
            </span>
            <div className={"mt-3"}>
                <InputLabel htmlFor="description" value="Package Description" isRequired={false}/>
                <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 w-1/2"
                    autoComplete="description"
                />
                <InputError message={errors.description} className="mt-2"/>
            </div>
        </div>
    )
}
