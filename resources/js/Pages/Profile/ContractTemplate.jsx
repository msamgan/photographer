import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head } from "@inertiajs/react"
import PageCard from "@/Components/PageCard.jsx"

export default function ContractTemplate({ auth, contractTemplate }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contract Template</h2>}
        >
            <Head title={"Contract Template"} />
            <PageCard header={""} header_description={""}></PageCard>
        </AuthenticatedLayout>
    )
}
