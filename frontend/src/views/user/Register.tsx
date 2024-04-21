import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';

import { setUser } from '@/store/slices/UserSlice';
import UserRegisterForm from '@/components/User/UserRegisterForm';
import { registerInitialValue } from '@/components/Forms/initialValue';
import { userRegisterSchema } from '@/components/Forms/validation';
import api from '@/http/server-base';


const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegisterUser = async (values: any) => {
        try {
            const { fullName, email, password, confirmPassword, age, userImage } = values;
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('age', age);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            formData.append('userImage', userImage);


            const response: AxiosResponse = await api.post(`register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data) {

                api.updateTokens({
                    "accessToken": response?.data?.accessToken,
                    "refreshToken": response?.data?.user?.refreshToken
                })


                dispatch(setUser({
                    fullName: response.data?.user?.fullName,
                    email: response.data?.user?.email,
                    userImage: response.data?.user?.userImage,
                    isActive: response.data?.user?.isActive,
                    isVerified: response.data?.user?.isVerified,
                    isAuthenticated: true,
                }))
                if (response.data?.user?.isVerified) {
                    if (response.data?.user?.isActive) {
                        navigate('/home')
                    } else {
                        navigate('/inactive-user')
                    }
                } else {
                    navigate('/verify')
                }

            }

        } catch (error: any) {
            const err = error?.response?.data?.errors?.[0];
            toast.error(err, {
                position: 'top-right'
            });
            // Handle error appropriately (e.g., display error message to the user)
        }
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: registerInitialValue,
            validationSchema: userRegisterSchema,
            async onSubmit(values) {
                handleRegisterUser(values);
            },
        });

    return (
        <Box sx={{
            display: "flex",
            minHeight: 'calc(100vh - 64px)',
            alignItems: 'center',
            justifyContent: "center",
            my: 2,
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
                                <UserRegisterForm
                                    values={values}
                                    handleChange={handleChange}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    setFieldValue={setFieldValue}
                                />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: '20px',
                                        width: "100%",
                                    }}
                                >
                                    <Box mb={1} >
                                        <Link to="/login">
                                            <Typography fontSize={12} color="GrayText">
                                                Already Registered ! Click Here to login
                                            </Typography>
                                        </Link>
                                    </Box>
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
                                            Register
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

export default Register