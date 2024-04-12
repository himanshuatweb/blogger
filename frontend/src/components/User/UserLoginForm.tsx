import { Box, Grid, Typography } from '@mui/material';
import CustomTextField from '@/components/Forms/Input/CustomTextField';

const UserLoginForm = (props: any) => {
    const { values, handleChange, errors, handleBlur, touched } = props;

    return (
        <Box>
            <Box mb={2}>
                <Box mb={2}>
                    <Typography variant="h6" fontSize={16}>Welcome Back | Sign In Blogger</Typography>
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
                    <Grid item xs={12}>
                        <CustomTextField
                            textLimit={80}
                            isRequired={true}
                            type="password"
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


                </Grid>
            </Box>


        </Box>
    );
};

export default UserLoginForm;
