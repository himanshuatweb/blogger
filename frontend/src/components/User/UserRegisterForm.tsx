import { Box, Grid, Typography } from '@mui/material';
import CustomTextField from '@/components/Forms/Input/CustomTextField';

const UserRegisterForm = (props: any) => {

    const { values, handleChange, errors, handleBlur, touched, setFieldValue } = props;

    return (
        <Box>
            <Box mb={2}>
                <Box mb={2}>
                    <Typography variant="h6">Welcome Aboard | Blogger.com</Typography>
                </Box>

                <Grid container spacing={1} >
                    <Grid item sm={12} md={6}>
                        <CustomTextField
                            textLimit={80}
                            isRequired={true}
                            type="text"
                            label="Fullname"
                            name="fullName"
                            fullWidth
                            value={values['fullName'] || ''}
                            onChange={handleChange}
                            error={errors['fullName'] && touched['fullName'] ? true : false}
                            helperText={touched['fullName'] ? errors['fullName'] : ''}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
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
                    <Grid item md={12}>
                        <CustomTextField
                            textLimit={2}
                            isRequired={true}
                            type="number"
                            label="Age"
                            name="age"
                            fullWidth
                            value={values['age'] || ''}
                            onChange={handleChange}
                            error={errors['age'] && touched['age'] ? true : false}
                            helperText={touched['age'] ? errors['age'] : ''}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
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
                    <Grid item sm={12} md={6}>
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
                    <Grid item md={12}>
                        <Box>Upload Image</Box>
                        {(touched['userImage'] && errors['userImage']) ? <Typography variant="body2" sx={{ fontWeight: 100, fontSize: '6', color: 'red' }} >{errors['userImage']}</Typography> : null}
                        <input
                            type="file"
                            name="userImage"
                            id="userImage"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(event) => {
                                const file = event?.target?.files?.[0];
                                if (file) {
                                    setFieldValue('userImage', file)
                                }
                            }}
                        />

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserRegisterForm;
