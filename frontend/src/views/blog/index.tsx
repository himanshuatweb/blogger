import { useEffect, useState } from 'react';
import api from '@/http/server-base';
import { Blog, BlogResponse } from '@/utils/types';
import { Box } from '@mui/material';
import Spinner from '@/layout/Spinner/Spinner';

const MyBlogs = () => {

    const [blogs, setBlogs] = useState<Blog[] | null>()
    const [loading, setLoading] = useState(false);

    async function getBlogs() {
        setLoading(true)
        const response: BlogResponse = await api.get('blogs/blogsByUser');
        if (response.success) {
            setBlogs(response.data.blogs)
        }
        setLoading(false);
    }
    useEffect(() => {
        getBlogs();
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Box>
                {blogs?.map((blog) => {
                    return <div key={blog._id}>
                        <p> {blog.title} </p>
                    </div>
                })}
            </Box>
        </div>
    )
}

export default MyBlogs