import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';
import AuthorSidebar from '../components/AuthorSidebar';
import { sanityClient, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
// We'll keep the marked import for now, but simplify the normal block serializer
import { marked } from 'marked';
import '../styles/blogPost.css'; // Import the new CSS file

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
          "authorName": author->name,
          "categories": categories[]->title,
          "tags": tags[]->name
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

  // Helper function to extract raw text from a Portable Text block
  const extractTextFromBlock = (block) => {
    if (!block.children) return '';
    return block.children
      .map(child => child.text || '')
      .join('');
  };

  // Define your custom serializers
  const customSerializers = {
    // Serializers for block types
    block: {
      // Render normal text blocks - extract raw text and process with marked
      normal: ({ value }) => {
        const rawText = extractTextFromBlock(value);
        console.log("Raw text for normal block:", rawText);
        
        // Let marked handle everything (paragraphs, headings, etc.) and render directly
        const htmlContent = marked.parse(rawText);
        console.log("HTML content after marked:", htmlContent);
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      },
      // Render headings - also process markdown within headings
      h1: ({ value }) => {
        const rawText = extractTextFromBlock(value);
        const htmlContent = marked.parse(rawText);
        return <h1 className="text-3xl font-extrabold text-gray-900 mb-4 mt-6" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      },
      h2: ({ value }) => {
        const rawText = extractTextFromBlock(value);
        const htmlContent = marked.parse(rawText);
        return <h2 className="text-2xl font-extrabold text-gray-900 mb-3 mt-5 border-b border-gray-300 pb-2" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      },
      h3: ({ value }) => {
        const rawText = extractTextFromBlock(value);
        const htmlContent = marked.parse(rawText);
        return <h3 className="text-xl font-extrabold text-gray-900 mb-2 mt-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      },
      h4: ({ value }) => {
        const rawText = extractTextFromBlock(value);
        const htmlContent = marked.parse(rawText);
        return <h4 className="text-lg font-extrabold text-gray-900 mb-2 mt-3" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      },
      // Render blockquotes - also process markdown within blockquotes
      blockquote: ({ value }) => {
        const rawText = extractTextFromBlock(value);
        const htmlContent = marked.parse(rawText);
        return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      },
      // Note: List items (li) are handled by the 'list' serializer for the parent ul/ol
      // You might need a 'list' serializer if you have custom list rendering needs.
    },
    // Serializers for marks (inline formatting) - these might not be needed if marked handles everything
    mark: {
      // Example for links - you might want to keep this for Sanity-specific links
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
            {children}
          </a>
        );
      },
      // Comment out basic marks since marked will handle these
      // strong: ({ children }) => <strong>{children}</strong>,
      // em: ({ children }) => <em>{children}</em>,
      // underline: ({ children }) => <u>{children}</u>,
      // 'strike-through': ({ children }) => <s>{children}</s>,
    },
    // Add serializers for other Portable Text types if needed (e.g., image, code)
    // image: ({ value }) => (
    //   <img
    //     src={urlFor(value).url()}
    //     alt={value.alt || 'Portable text image'}
    //     className="my-4 rounded-md shadow-sm"
    //   />
    // ),
    // code: ({ value }) => <pre><code className="language-javascript">{value.code}</code></pre>,
  };

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavMenu />
      <motion.main 
        style={{ background: "#fffff8" }} 
        className="max-w-3xl mt-20 mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.p 
          className="text-lg text-black"
          animate={{ 
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading post...
        </motion.p>
      </motion.main>
      <Footer />
    </motion.div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavMenu />
      <motion.main 
        style={{ background: "#fffff8" }} 
        className="max-w-3xl mt-20 mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p 
          className="text-lg text-red-600"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {error}
        </motion.p>
      </motion.main>
      <Footer />
    </motion.div>
  );

  if (!post) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavMenu />
      <motion.main 
        style={{ background: "#fffff8" }} 
        className="max-w-3xl mt-20 mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p 
          className="text-lg text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Post data is unavailable.
        </motion.p>
      </motion.main>
      <Footer />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavMenu />
      <motion.main 
        style={{ background: "#fffff8" }} 
        className="max-w-5xl mt-20 mx-auto flex flex-col md:flex-row items-start gap-8 mb-24 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Author Sidebar */}
        <AuthorSidebar 
          authorName={post.authorName} 
          categories={post.categories}
          tags={post.tags}
        />

        {/* Article Content */}
        <motion.article 
          className="flex-grow w-5/6 rounded-lg text-sm overflow-hidden p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            onClick={navigateToBlog}
            className="mb-6 inline-flex items-center text-amber-800 hover:text-amber-900 transition-colors duration-200 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              x: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="mr-1 transition-transform duration-200 group-hover:-translate-x-1"
              animate={{ x: [-2, 0, -2] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              ←
            </motion.span>
            Back to Blog
          </motion.button>
          <motion.h1 
            className="text-2xl mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            #{post.title || 'Untitled Post'}
          </motion.h1>
          <motion.div 
            className="text-sm text-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <span>Published on {formatDate(post._createdAt)}</span>
          </motion.div>
          {post.mainImage && (
            <motion.img
              src={urlFor(post.mainImage).url()}
              alt={post.title || 'Blog post image'}
              className="w-full h-64 md:h-80 object-cover rounded-md mb-8 shadow-sm"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6 }
              }}
              viewport={{ once: true }}
            />
          )}
          <motion.div 
            className="blog-post-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {post.body ? (
              <PortableText value={post.body} components={customSerializers} />
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                Full content will be rendered here.
              </motion.p>
            )}
          </motion.div>
        </motion.article>
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default SinglePost;
