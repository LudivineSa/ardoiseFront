import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface ITextInputProps {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
}

export const TextInput = (props: ITextInputProps) => {
    const { name, label, type, required} = props;
    const { register, formState: { errors } } = useFormContext();

    return (
        <TextField
            {...register(name, { required })}
            name={name}
            label={label}
            type={type}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message as string}
            required={required}
        />
    );
};