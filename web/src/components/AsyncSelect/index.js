import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { ASelect } from './styles';

export default function AsyncSelect({ name, loadOptions }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    function parseSelectValue(selectRef) {
        const selectValue = selectRef.select.state.value;
        return selectValue ? selectValue.id : '';
    }

    useEffect(() => {
        registerField({
            name: 'student_id',
            ref: ref.current,
            path: 'state.value',
            parseValue: parseSelectValue,
            clearValue: selectRef => {
                selectRef.select.clearValue();
            },
        });
  }, [ref.current, fieldName]); // eslint-disable-line

    return (
        <>
            <ASelect
                className="react-select-container"
                classNamePrefix="react-select"
                name={fieldName}
                ref={ref}
                cacheOptions
                defaultValue={defaultValue}
                defaultOptions
                loadOptions={loadOptions}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.title}
            />

            {error && <span>{error}</span>}
        </>
    );
}

AsyncSelect.propTypes = {
    name: PropTypes.string.isRequired,
    loadOptions: PropTypes.func.isRequired,
};
