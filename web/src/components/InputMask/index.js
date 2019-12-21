import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function InputMask({
    name,
    onChange,
    thousandSeparator,
    decimalSeparator,
    fixedDecimalScale,
    decimalScale,
    prefix,
    suffix,
}) {
    const ref = useRef();
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [value, setValue] = useState(defaultValue || '');

    function handleValue(inputRef) {
        return parseFloat(inputRef.state.numAsString);
    }

    useEffect(() => {
        if (ref.current) {
            registerField({
                name: fieldName,
                ref: ref.current,
                path: 'state.numAsString',
                parseValue: handleValue,
            });
        }
  }, [ref, fieldName]); // eslint-disable-line

    function handleChange(valueObject) {
        if (onChange) {
            onChange(valueObject.floatValue || 0);
        }
        setValue(valueObject.formattedValue);
    }

    return (
        <>
            <NumberFormat
                thousandSeparator={thousandSeparator}
                decimalSeparator={decimalSeparator}
                fixedDecimalScale={fixedDecimalScale}
                decimalScale={decimalScale}
                prefix={prefix}
                suffix={suffix}
                ref={ref}
                name={fieldName}
                value={value}
                onValueChange={handleChange}
            />

            {error && <span>{error}</span>}
        </>
    );
}

InputMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    thousandSeparator: PropTypes.string,
    decimalSeparator: PropTypes.string,
    fixedDecimalScale: PropTypes.bool,
    decimalScale: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
};

InputMask.defaultProps = {
    onChange: undefined,
    thousandSeparator: '.',
    decimalSeparator: ',',
    fixedDecimalScale: true,
    decimalScale: 2,
    prefix: '',
    suffix: '',
};
