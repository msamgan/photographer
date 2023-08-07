import { Link } from "@inertiajs/react"

export default function AddLinkButton({ link, label, className = "", ...props }) {
    return (
        <div className="pt-12 max-w-screen-2xl mx-auto sm:px-6 lg:px-8 text-right">
            <Link href={link}>
                <button
                    {...props}
                    type="button"
                    className={
                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " + className
                    }
                >
                    <span className={"flex flex-row"}>
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
                        {label}
                    </span>
                </button>
            </Link>
        </div>
    )
}
