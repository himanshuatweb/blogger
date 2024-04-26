import { useQuery } from '@tanstack/react-query';
import { Grid } from '@mui/material';
import CustomLoader from '@/components/common/CustomLoader';
import BlogCard from '@/components/Blog/BlogCard';
import { getBlogs } from '@/http/helperFunction';

const queryKey = ['my-blogs'];

const MyBlogs = () => {
    const { data: blogs, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: getBlogs,
    })

    if (isLoading) {
        return <CustomLoader />
    }

    return (
        <Grid container spacing={2} mt={1}>
            {blogs?.map((blog) => {
                return <BlogCard key={blog._id} blog={blog} />
            })}
        </Grid>
    )
}

export default MyBlogs