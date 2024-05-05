import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { Box, Button, Grid, CardContent, Card, CardMedia, Typography, IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import DeleteModal from '@/components/common/DeleteModal';
import api from '@/http/server-base';
import { Blog } from '@/utils/types';
import { ERROR_MSG } from '@/utils/constants';

interface BlogProps {
    blog: Blog,
    refetch: () => void,
}

const BlogCard: React.FC<BlogProps> = ({ blog, refetch }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [isDeleting, setisDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setisDeleting(true)
            await api.del(`blogs/${blog._id}`)
            toast.success('Blog Deleted Successfully !', { position: 'top-center' })
            refetch();

        } catch (error: any) {
            const err = error?.response?.data?.errors?.[0];
            toast.error(err || ERROR_MSG, {
                position: 'top-right'
            });
        }
        finally {
            setisDeleting(false)
        }
    }

    return (
        <Grid item xs={12} md={4} lg={3} >
            <Card raised sx={{ maxWidth: 600, borderRadius: 4 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={blog.blogImage}
                    alt={blog.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {blog.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Author: {blog.author}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >
                        <Button
                            onClick={() => navigate(`/my-blogs/${blog.title}`, { state: blog })}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Read More
                        </Button>
                        <IconButton
                            aria-label="delete"
                            onClick={() => { setOpen(true) }}
                        >
                            <FaTrash size={20} color='red' />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
            <DeleteModal
                open={open}
                handleClose={() => { setOpen(false) }}
                handleDelete={handleDelete}
                title="Delete Blog"
                description="Are you sure you want to delete this blog !"
                isDeleting={isDeleting}
            />
        </Grid>
    );
};

export default BlogCard;
