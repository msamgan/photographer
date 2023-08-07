import { Transition } from "@headlessui/react"

export default function TransactionNotification({ label = "Saved.", recentlySuccessful = false }) {
    return (
        <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
        >
            <p className="text-sm text-gray-600">{label}</p>
        </Transition>
    )
}
