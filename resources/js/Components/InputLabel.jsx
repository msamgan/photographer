export default function InputLabel({ value, className = "", children, isRequired = false, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children} {isRequired && <span className="text-red-500">*</span>}
        </label>
    )
}
