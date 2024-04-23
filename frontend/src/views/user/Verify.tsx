// import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { useFormik } from 'formik';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { AxiosResponse } from 'axios';
import * as Yup from 'yup';

import api from '@/http/server-base';
import CustomTextField from '@/components/Forms/Input/CustomTextField';

const userTokenSchema = Yup.object({
    token: Yup.string().max(500).required('code is required'),
});

const tokenInitialValue = {
    token: ''
}

const VerifyUser = () => {
    const theme = useTheme();
    const user = useAppSelector((state) => state.user)

    // const navigate = useNavigate();
    const handleVerify = async (values: any) => {
        try {

            const res: AxiosResponse = await api.post(`verify`, { token: values?.token, email: user?.email });
            console.log("Verify response ", res);
        } catch (error) {
            console.error("Error registering user:", error);
            // Handle error appropriately (e.g., display error message to the user)
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: tokenInitialValue,
            validationSchema: userTokenSchema,
            async onSubmit(values) {
                handleVerify(values)
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
                                        <Typography variant="h6" fontSize={16}>Verify Email To Continue Using App </Typography>
                                    </Box>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                textLimit={500}
                                                isRequired={true}
                                                type="text"
                                                label="Code"
                                                name="token"
                                                fullWidth
                                                value={values['token'] || ''}
                                                onChange={handleChange}
                                                error={errors['token'] && touched['token'] ? true : false}
                                                helperText={touched['token'] ? errors['token'] : ''}
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
                                            Verify
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

export default VerifyUser