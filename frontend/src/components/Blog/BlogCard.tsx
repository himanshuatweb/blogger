import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { Blog } from '@/utils/types';

interface BlogProps {
    blog: Blog
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
    const navigate = useNavigate();
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
                    <Button
                        onClick={() => navigate(`/my-blogs/${blog.title}`, { state: blog })}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Read More
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default BlogCard;
