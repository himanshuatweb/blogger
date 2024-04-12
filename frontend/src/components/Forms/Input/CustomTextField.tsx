import { Box, FormHelperText, TextField, styled, useTheme } from '@mui/material';
import React from 'react';

const CustomInput = styled((props) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
        color: theme.palette.grey[900],
        opacity: '0.4',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[200],
    },
    '& .css-13kafyo-MuiInputBase-root-MuiOutlinedInput-root': {
        padding: 0,
    },
    '& .MuiInputBase-inputMultiline': {
        padding: "8px 0px !important",
    },

}));

const Label = styled('label')(({ theme }) => ({
    display: 'block',
    fontWeight: '600',
    color: theme.palette.grey[700],
    fontSize: '14px',
}));

export default function CustomTextField(props: any) {
    const theme = useTheme();
    const { label, isRequired, error, textLimit, value, helperText, additionalText, ...inputProps } = props;

    const idStr = React.useMemo(() => {
        const random = Math.random().toString(36).substring(7);
        return `${props.type}-${random}`;
    }, []);

    return (
        <Box sx={{ m: 0, width: '100%', position: "relative", mb: 2 }}>
            <Label htmlFor={idStr} sx={{ pb: '2px' }}>
                {label} {isRequired ? <span className="text-red-600">*</span> : null}
            </Label>
            <CustomInput
                {...inputProps}
                value={value}
                id={idStr}
                size="small"
                autoComplete="nope"
                fullWidth
                error={error}
                inputProps={{ maxLength: textLimit }}
            />
            <FormHelperText
                error={error}
            >
                {helperText}
            </FormHelperText>
            <FormHelperText
                sx={{
                    position: "absolute",
                    right: '10px',
                    top: "0%",
                    color: theme.palette.grey[500],
                }}
            >{additionalText}</FormHelperText>

        </Box>
    );
}

export { Label };
