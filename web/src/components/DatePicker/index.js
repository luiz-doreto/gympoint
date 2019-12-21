import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import { ReactDatePicker } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, onChange, disabled }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.selected',
            clearValue: pickerRef => {
                pickerRef.clear();
            },
        });
  }, [ref.current, fieldName]); // eslint-disable-line

    function handleChange(date) {
        onChange(date);
        setSelected(date);
    }

    return (
        <>
            <ReactDatePicker
                name={fieldName}
                autoComplete="off"
                selected={selected}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy"
                ref={ref}
                disabled={disabled}
            />
            {error && <span>{error}</span>}
        </>
    );
}

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

DatePicker.defaultProps = {
    disabled: false,
};
