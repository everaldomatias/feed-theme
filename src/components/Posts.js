import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import topIcon from "../images/heart.svg";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const handleTop = () => {
        console.log('a')
    }

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
        <>
            {posts.map(post => (
                <div className='content__slider' key={post.id}>
                    <button className="top" onClick={() => handleTop()}><img src={topIcon} /></button>
                    <Slider imageUrls={post.gallery_image_urls} />
                </div>
            ))}
            <button onClick={() => setCurrentPage(prev => prev - 1)}>Anterior</button>
            <button onClick={() => setCurrentPage(prev => prev + 1)}>Próximo</button>
        </>
    );
}

export default Posts;