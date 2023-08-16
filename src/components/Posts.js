import React, { useState, useEffect } from 'react';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`wp-json/wp/v2/posts?page=${currentPage}&per_page=${postsPerPage}`);

                if (!response.ok) {
                    throw new Error("Erro na resposta da API");
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }
        };

        fetchPosts();
    }, [currentPage]);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title.rendered}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <p>Gallery Image IDs: {post.gallery_image_urls}</p>
                </div>
            ))}
            <button onClick={() => setCurrentPage(prev => prev - 1)}>Anterior</button>
            <button onClick={() => setCurrentPage(prev => prev + 1)}>Próximo</button>
        </div>
    );
}

export default Posts;