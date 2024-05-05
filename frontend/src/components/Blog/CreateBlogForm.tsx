import { Box, Grid, Typography } from '@mui/material';
import CustomTextField from '@/components/Forms/Input/CustomTextField';

const CreateBlogForm = (props: any) => {
    const { values, handleChange, errors, handleBlur, touched, setFieldValue } = props;

    return (
        <Box>
            <Box mb={2}>
                <Box mb={2}>
                    <Typography variant="h6" fontSize={16}>Create New Blog</Typography>
                </Box>

                <Grid container>
                    <Grid item xs={12}>
                        <CustomTextField
                            textLimit={150}
                            isRequired={true}
                            type="text"
                            label="Title"
                            name="title"
                            fullWidth
                            value={values['title'] || ''}
                            onChange={handleChange}
                            error={errors['title'] && touched['title'] ? true : false}
                            helperText={touched['title'] ? errors['title'] : ''}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                            textLimit={1500}
                            isRequired={true}
                            type="text"
                            label="Description"
                            name="description"
                            multiline
                            rows={2}
                            fullWidth
                            value={values['description'] || ''}
                            onChange={handleChange}
                            error={errors['description'] && touched['description'] ? true : false}
                            helperText={touched['description'] ? errors['description'] : ''}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Box>Upload Blog Image  <span>*</span> </Box>
                        {(touched['blogImage'] && errors['blogImage']) ? <Typography variant="body2" sx={{ fontWeight: 100, fontSize: '6', color: 'red' }} >{errors['blogImage']}</Typography> : null}
                        <input
                            type="file"
                            name="blogImage"
                            id="blogImage"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(event) => {
                                const file = event?.target?.files?.[0];
                                if (file) {
                                    setFieldValue('blogImage', file)
                                }
                            }}
                        />

                    </Grid>


                </Grid>
            </Box>


        </Box>
    );
};

export default CreateBlogForm;
