import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';

import { setUser } from '@/store/slices/UserSlice';
import UserLoginForm from '@/components/User/UserLoginForm';
import { loginInitialValue } from '@/components/Forms/initialValue';
import { userLoginSchema } from '@/components/Forms/validation';

const Login = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUserLogin = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', values);
            if (response.data?.success) {
                
                dispatch(setUser({
                    fullName: response.data?.data?.user?.fullName,
                    email: response.data?.data?.user?.email,
                    userImage: response.data?.data?.user?.userImage,
                    isActive: response.data?.data?.user?.isActive,
                    isVerified: response.data?.data?.user?.isVerified,
                    accessToken: response.data?.data?.accessToken,
                    isAuthenticated: true,
                }))
                if (response.data?.data?.user?.isVerified) {
                    if (response.data?.data?.user?.isActive) {
                        navigate('/home')
                    } else {
                        navigate('/inactive-user')
                    }
                } else {
                    navigate('/verify')
                }

            }
        } catch (error) {
            console.error("Error Login user:", error);
            // Handle error appropriately (e.g., display error message to the user)
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: loginInitialValue,
            validationSchema: userLoginSchema,
            async onSubmit(values) {
                console.log("Form Values ", values)
                handleUserLogin(values)
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
                                <UserLoginForm
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
                                        <Link to="/register">
                                            <Typography fontSize={12} color="GrayText">
                                                New User ! Click here to register
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
                                            Login
                                        </Button>
                                        <Box my={1}>
                                            <Button
                                                color="warning"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    padding: '6px 30px',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.warning.light,
                                                        color: '#fff',
                                                    },
                                                }}
                                                onClick={() => { navigate('/forgot-password') }}
                                            >
                                                Forgot Password ?
                                            </Button>
                                        </Box>
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

export default Login