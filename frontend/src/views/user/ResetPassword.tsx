import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import * as Yup from 'yup';

import CustomTextField from '@/components/Forms/Input/CustomTextField';
import { AxiosResponse } from 'axios';
import api from '@/http/server-base';

const resetPasswordSchema = Yup.object({
    password: Yup.string().trim().max(30).required('password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const resetPasswordInitialValue = {
    password: '',
    confirmPassword: '',
}


const ResetPassword = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { resettoken } = useParams();
    const handleUserLogin = async (values: any) => {
        try {
            const response:AxiosResponse = await api.put(`resetpassword/${resettoken}`, {
                "resettoken":resettoken,
                "password":values?.password
            });
            console.log("Response in Resetpassword ",response);
            if (response.data?.success) {
                toast.success('Password Updated');
                navigate('/login')
            }
        } catch (error) {
            console.error("Error Login user:", error);
            toast.error('Password Not Updated');
            // Handle error appropriately (e.g., display error message to the user)
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: resetPasswordInitialValue,
            validationSchema: resetPasswordSchema,
            async onSubmit(values) {
                await handleUserLogin(values)
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
                                        <Typography variant="h6" fontSize={16}>Change Passsword </Typography>
                                    </Box>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                textLimit={80}
                                                isRequired={true}
                                                type="text"
                                                label="Password"
                                                name="password"
                                                fullWidth
                                                value={values['password'] || ''}
                                                onChange={handleChange}
                                                error={errors['password'] && touched['password'] ? true : false}
                                                helperText={touched['password'] ? errors['password'] : ''}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                textLimit={80}
                                                isRequired={true}
                                                type="password"
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                fullWidth
                                                value={values['confirmPassword'] || ''}
                                                onChange={handleChange}
                                                error={errors['confirmPassword'] && touched['confirmPassword'] ? true : false}
                                                helperText={touched['confirmPassword'] ? errors['confirmPassword'] : ''}
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
                                            Update Password
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

export default ResetPassword