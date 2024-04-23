import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import CustomTextField from '@/components/Forms/Input/CustomTextField';
import api from '@/http/server-base';

import { ERROR_MSG } from '@/utils/constants';
import { GenericSuccessResponse } from '@/utils/types';


const userLoginSchema = Yup.object({
    email: Yup.string().email().max(80).required('email is required'),
});

const loginInitialValue = {
    email: ''
}

const ForgotPassword = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleForgot = async (values: any) => {
        try {

            const res: GenericSuccessResponse = await api.post(`forgot-password`, values);

            if (res.success) {
                toast.success('Reset Password Mail Sent Successfully')
                navigate('/login')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.errors?.[0] || ERROR_MSG)
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: loginInitialValue,
            validationSchema: userLoginSchema,
            async onSubmit(values) {
                console.log("Form Values ", values)
                handleForgot(values)
            },
        });

    return (
        <Box sx={{
            display: "flex",
            height: 'calc(100vh - 64px)',
            alignItems: 'center',
            justifyContent: "center",
        }}
        >
            <Card sx={{
                maxWidth: '400px',
                width: '100%',
                padding: '1rem',
            }}>
                <CardContent>
                    <Grid container>
                        <Grid item sm={12}>
                            <form onSubmit={handleSubmit}>
                                <Box mb={2}>
                                    <Box mb={2}>
                                        <Typography variant="h6" fontSize={16}>Forgot Passsword ? </Typography>
                                    </Box>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                textLimit={80}
                                                isRequired={true}
                                                type="text"
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                value={values['email'] || ''}
                                                onChange={handleChange}
                                                error={errors['email'] && touched['email'] ? true : false}
                                                helperText={touched['email'] ? errors['email'] : ''}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: '20px',
                                        width: "100%",
                                    }}
                                >
                                    <Box width="100%">
                                        <Button
                                            type="submit"
                                            color="warning"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                padding: '6px 30px',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.warning.light,
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            Sumbit
                                        </Button>

                                    </Box>
                                    <Typography color="GrayText" mt={2} display="flex" alignItems="center">
                                        <span
                                            style={{
                                                color: theme.palette.error.dark,
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            *
                                        </span>
                                        required
                                    </Typography>

                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ForgotPassword