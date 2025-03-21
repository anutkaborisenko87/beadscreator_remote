const SelectComponent = ({placeholder = 'Make choice', options = [], ...props}) => {
    const renderOptions = (options, level = 0) => {
        return options.flatMap(option => {
            const indent = '\u00A0\u00A0'.repeat(level);
            const mainOption = (
                <option key={option.id} value={option.id}>
                    {indent}{option.name}
                </option>
            );
            if (option.subcategories && option.subcategories.length > 0) {
                return [mainOption, ...renderOptions(option.subcategories, level + 1)];
            }

            return mainOption;
        });
    };
    return (
        <>
            <select {...props} >
                <option value="">{placeholder}</option>
                {
                    renderOptions(options)
                }
            </select>
        </>
    );
};

export default SelectComponent;
