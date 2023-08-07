import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"

export default function PackageForm({data, setData, errors, refs}) {
    return (
        <div>
            <span className={'flex flex-row gap-3'}>
                <div className={"mt-3 w-1/2"}>
                    <InputLabel htmlFor="name" value="Client Name" isRequired={true}/>
                    <TextInput
                        id="name"
                        ref={refs.nameInput}
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="mt-1 w-full"
                        autoComplete="name"
                        isFocused={true}
                    />
                    <InputError message={errors.name} className="mt-2"/>
                </div>
                <div className={"mt-3 w-full"}>
                    <InputLabel htmlFor="spouse_name" value="Spouse Name"/>
                    <TextInput
                        id="spouse_name"
                        value={data.spouse_name}
                        onChange={(e) => setData("spouse_name", e.target.value)}
                        type="text"
                        className="mt-1 w-1/4"
                        autoComplete="spouse_name"
                    />
                    <InputError message={errors.spouse_name} className="mt-2"/>
                </div>
            </span>
            <div className={"mt-3"}>
                <InputLabel htmlFor="email" value="Client Email" isRequired={true}/>
                <TextInput
                    id="email"
                    ref={refs.emailInput}
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    type="text"
                    className="mt-1 w-1/2"
                    autoComplete="email"
                />
                <InputError message={errors.email} className="mt-2"/>
            </div>
            <div className={"mt-3"}>
                <InputLabel htmlFor="phone" value="Client Phone" isRequired={true}/>
                <TextInput
                    id="phone"
                    ref={refs.phoneInput}
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    type="text"
                    className="mt-1 w-1/2"
                    autoComplete="phone"
                />
                <InputError message={errors.phone} className="mt-2"/>
            </div>
            <div className={"mt-3"}>
                <InputLabel htmlFor="full_address" value="Full Address" isRequired={true}/>
                <textarea
                    ref={refs.fullAddressInput}
                    id="full_address"
                    value={data.full_address}
                    onChange={(e) => setData("full_address", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 w-1/2"
                    autoComplete="full_address"
                />
                <InputError message={errors.full_address} className="mt-2"/>
            </div>
        </div>
    )
}
