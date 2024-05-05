import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import CreateBlogForm from '@/components/Blog/CreateBlogForm';
import { useFormik } from 'formik';
import { blogInitialValue } from '@/components/Forms/initialValue';
import { blogSchema } from '@/components/Forms/validation';

import api from '@/http/server-base';
import { ERROR_MSG } from '@/utils/constants';

import useUpload from '@/hooks/useUpload';
import { BlogCreateResponse } from '@/utils/types';


const CreateBlog = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false)

    const queryClient = useQueryClient();
    const { progress, isUploading, error: errorFileUpload, uploadFile } = useUpload()

    const handleCreateBlog = async (values: any) => {
        setisLoading(true)
        const { blogImage: media, title, description } = values;

        const uploadResponse = await uploadFile(media, 'media');

        if (!errorFileUpload && uploadResponse) {

            try {
                const response: BlogCreateResponse = await api.post('blogs', {
                    title,
                    description,
                    blogImage: uploadResponse,
                });
                setisLoading(false)

                if (response.success) {
                    toast.success('Blog Create ! ', { position: 'top-right' })
                    //@ts-ignore
                    queryClient.invalidateQueries(['my-blogs']);
                    navigate('/my-blogs')
                }
            } catch (error: any) {
                const err = error?.response?.data?.errors?.[0];
                toast.error(err || ERROR_MSG, {
                    position: 'top-right'
                });
            }
        } else {
            //Show error toast for file upload..
            toast.error('Image Upload Failed, Please try again !' || ERROR_MSG, {
                position: 'top-right'
            });
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: blogInitialValue,
            validationSchema: blogSchema,
            async onSubmit(values) {
                handleCreateBlog(values)
            },
        });

    return (
        <Box sx={{
            display: "flex",
            height: 'calc(100vh - 128px)',
            paddingY: '1rem'
        }}
        >
            <Card sx={{
                width: '100%',
                padding: '1rem',
            }}>
                <CardContent>
                    <Grid container>
                        <Grid item sm={12}>
                            <form onSubmit={handleSubmit}>
                                <CreateBlogForm
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
                                    {progress > 0 && <Box>Upload Progress : {progress}% </Box>}
                                    <Box sx={{
                                        display: 'flex',
                                        width: "100%",
                                        justifyContent: 'flex-end',
                                        gap: 2,
                                    }}
                                    >
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            sx={{
                                                padding: '6px 30px',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.warning.light,
                                                    color: '#fff',
                                                },
                                            }}
                                            onClick={() => navigate(-1)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="info"
                                            variant="contained"
                                            startIcon={
                                                (isLoading || isUploading) && <CircularProgress size={20} />}
                                            disabled={isUploading || isLoading}
                                            sx={{
                                                padding: '6px 30px',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.warning.light,
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            Create Blog
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

export default CreateBlog