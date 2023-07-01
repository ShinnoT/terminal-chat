const InputField = ({
    requiredClass,
    fieldLabel,
    autofocus,
    inputType,
    placeholder,
    maxLength,
    minLength,
    inputLabel,
    error,
    disabled,
}) => {
    return (
        disabled || (
            <>
                <div>
                    <label
                        className={`block text-green-500 tracking-widest font-bold text-base mb-0.5 ${requiredClass}`}
                        htmlFor={fieldLabel}
                    >
                        {fieldLabel}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-1 px-3 mb-0.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={fieldLabel}
                        type={inputType}
                        placeholder={placeholder}
                        {...(autofocus && { autoFocus: "autofocus" })}
                        maxLength={maxLength}
                        {...(minLength && { minLength })}
                    />
                    <p className="text-gray-600 text-xs">{inputLabel}</p>
                </div>
                <div className="mb-4 h-2">
                    {error && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs">
                            {error}
                        </span>
                    )}
                </div>
            </>
        )
    );
};

export default InputField;
