import api from '@/http/server-base';
import { BlogResponse } from '@/utils/types';

export async function getBlogs() {
    const response: BlogResponse = await api.get('blogs/blogsByUser');
    if (response.success) {
        return response.data.blogs
    }
}
