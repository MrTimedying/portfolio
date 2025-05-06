import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';
import { sanityClient, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      setError("No post specified.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          body,
          _createdAt,
          mainImage,
          "authorName": author->name
        }`;
        const params = { slug };
        const result = await sanityClient.fetch(query, params);

        if (result) {
          setPost(result);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error(`Error fetching post with slug ${slug}:`, err);
        setError("Failed to load the post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const navigateToBlog = () => {
    navigate('/blog');
  };

  if (loading) return (
    <>
      <NavMenu />
      <main style={{ background: "#fffff8" }} className="max-w-3xl mt-20 mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4 sm:px-6 pb-12">
        <p className="text-lg text-black">Loading post...</p>
      </main>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <NavMenu />
      <main style={{ background: "#fffff8" }} className="max-w-3xl mt-20 mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4 sm:px-6 pb-12">
        <p className="text-lg text-red-600">{error}</p>
      </main>
      <Footer />
    </>
  );

  if (!post) return (
    <>
      <NavMenu />
      <main style={{ background: "#fffff8" }} className="max-w-3xl mt-20 mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4 sm:px-6 pb-12">
        <p className="text-lg text-black">Post data is unavailable.</p>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <NavMenu />
      <main style={{ background: "#fffff8" }} className="max-w-3xl mt-20 mx-auto flex flex-col items-left justify-start min-h-[70vh] mb-24 px-4 sm:px-6 pb-12">
        <article className= " rounded-lg text-sm overflow-hidden p-6 md:p-8">
          <button
            onClick={navigateToBlog}
            className="mb-6 inline-flex items-center text-amber-800 hover:text-amber-900 transition-colors duration-200 group"
          >
            <span className="mr-1 transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Back to Blog
          </button>
          <h1 className="text-2xl mb-4 text-gray-900">#{post.title || 'Untitled Post'}</h1>
          <div className="text-sm text-black mb-6">
            <span>By {post.authorName || 'Unknown Author'}</span> | <span>Published on {formatDate(post._createdAt)}</span>
          </div>
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title || 'Blog post image'}
              className="w-full h-64 md:h-80 object-cover rounded-md mb-8 shadow-sm"
            />
          )}
          <div className="prose prose-lg max-w-none text-gray-800">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p>Full content will be rendered here.</p>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default SinglePost;
