import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';
import { sanityClient, urlFor } from '../sanityClient';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    sanityClient
      .fetch(
        `*[_type == "post"] | order(_createdAt desc) {
           _id,
           title,
           slug,
           mainImage,
           excerpt,
           body,
           _createdAt,
           "authorName": author->name
         }`
      )
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else {
          setError("Received invalid data format.");
          setBlogPosts([]);
        }
      })
      .catch(err => {
        console.error("Error fetching data from Sanity:", err);
        setError("Failed to load posts. Please check connection or query.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleReadMore = (slug) => {
    if (slug) {
      navigate(`/blog/${slug}`);
    } else {
      console.error("Slug is undefined, navigation failed.");
    }
  };

  let content;
  if (loading) {
    content = <p className="text-lg text-black">Loading posts...</p>;
  } else if (error) {
    content = <p className="text-lg text-red-600">{error}</p>;
  } else if (blogPosts && blogPosts.length > 0) {
    content = (
      <div className="w-full flex flex-wrap justify-center text-black gap-6">
        {blogPosts.map((post) => (
          <div key={post._id} className="max-w-md rounded-lg text-black overflow-hidden flex flex-col">
            {post.mainImage && (
              <img
                className="w-full h-48 object-cover"
                src={urlFor(post.mainImage).width(400).url()}
                alt={post.title || 'Blog post image'}
              />
            )}
            <div className="p-4 flex-grow">
              <h3 className="text-xl mb-2 text-black">{post.title || "Untitled Post"}</h3>
              <p className="text-black text-sm mb-4">{post.excerpt || 'No content preview'}</p>
              <p className="text-black text-sm"><b>Author:</b> {post.authorName || "Unknown Author"}</p>
              <p className="text-black text-xs mt-1">Published: {new Date(post._createdAt).toLocaleDateString()}</p>
            </div>
            <div className="px-4 pb-4 mt-auto">
              <button
                onClick={() => handleReadMore(post.slug?.current)}
                className= "text-amber-700 hover:underline text-sm transition-colors duration-200"
              >
                Read more...
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = <p className="text-lg text-black">No blog posts found yet.</p>;
  }

  return (
    <>
      <NavMenu />
      <main style={{ background: "#fffff8" }} className="max-w-3xl mt-20 mx-auto flex flex-col items-left justify-start min-h-[70vh] mb-24 px-4 sm:px-6 pb-12">
        <h1 className="text-4xl text-black mb-8">#fulcrum</h1>
        {content}
      </main>
      <Footer />
    </>
  );
};

export default Blog;
