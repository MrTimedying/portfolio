import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';
import { urlFor } from '../sanityClient';
import useBlogStore from '../store/blogStore';

const Blog = () => {
  const navigate = useNavigate();

  // Use state and actions from the Zustand store
  const { blogPosts, loading, error, fetchBlogPosts } = useBlogStore();

  useEffect(() => {
    // Fetch blog posts when the component mounts
    fetchBlogPosts();
  }, [fetchBlogPosts]); // Include fetchBlogPosts in the dependency array

  const handleReadMore = (slug) => {
    if (slug) {
      navigate(`/blog/${slug}`);
    } else {
      console.error("Slug is undefined, navigation failed.");
    }
  };

  // Group posts by category, excluding 'reviewed'
  const groupedPosts = blogPosts.reduce((acc, post) => {
    const categories = post.category && Array.isArray(post.category)
      ? post.category.filter(cat => cat !== 'reviewed') // Exclude 'reviewed' category
      : ['Uncategorized']; // Default category if none are assigned or if category is null/empty

    // If after filtering, there are no categories left, default to 'Uncategorized'
    const displayCategories = categories.length > 0 ? categories : ['Uncategorized'];

    displayCategories.forEach(category => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
    });
    return acc;
  }, {});

  let content;
  if (loading && blogPosts.length === 0) { // Show loading only if no posts are currently loaded
    content = (
      <motion.p 
        className="text-lg text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading posts...
      </motion.p>
    );
  } else if (error) {
    content = (
      <motion.p 
        className="text-lg text-red-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.p>
    );
  } else if (blogPosts && blogPosts.length > 0) {
    // Display posts grouped by category
    content = (
      <motion.div 
        className="w-full flex flex-col items-center text-black gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {Object.entries(groupedPosts).map(([category, posts], categoryIndex) => (
          <motion.div 
            key={category} 
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <motion.h2 
              className="text-2xl mb-4 border-b border-gray-300 pb-2 text-black"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 + 0.2 }}
            >
              {category}
            </motion.h2>
            <div className="flex flex-wrap justify-center text-black gap-6">
              {posts.map((post, postIndex) => (
                <motion.div 
                  key={post._id} 
                  className="max-w-md rounded-lg text-black overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: categoryIndex * 0.1 + postIndex * 0.1 + 0.3 
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileInView={{ 
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {post.mainImage && (
                    <motion.img
                      className="w-full h-48 object-cover"
                      src={urlFor(post.mainImage).width(400).url()}
                      alt={post.title || 'Blog post image'}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.1 + postIndex * 0.1 + 0.4 }}
                    />
                  )}
                  <div className="p-4 flex-grow">
                    <motion.h3 
                      className="text-xl mb-2 text-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + postIndex * 0.1 + 0.5 }}
                    >
                      {post.title || "Untitled Post"}
                    </motion.h3>
                    <motion.p 
                      className="text-black text-sm mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + postIndex * 0.1 + 0.6 }}
                    >
                      {post.excerpt || 'No content preview'}
                    </motion.p>
                    <motion.p 
                      className="text-black text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + postIndex * 0.1 + 0.7 }}
                    >
                      <b>Author:</b> {
                        post.tags && Array.isArray(post.tags) && post.tags.includes('ai-generated') 
                          ? (
                            <Link 
                              to="/blog/human-in-the-loop"
                              className="text-amber-700 hover:text-amber-800 transition-colors duration-200 ml-1 hover:underline"
                            >
                              Self-aware Researcher
                            </Link>
                          )
                          : (post.authorName || "Unknown Author")
                      }
                    </motion.p>
                    <motion.p 
                      className="text-black text-xs mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + postIndex * 0.1 + 0.8 }}
                    >
                      Published: {new Date(post._createdAt).toLocaleDateString()}
                    </motion.p>
                  </div>
                  <div className="px-4 pb-4 mt-auto">
                    <motion.button
                      onClick={() => handleReadMore(post.slug?.current)}
                      className="text-amber-700 hover:underline text-sm transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read more...
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  } else {
    content = (
      <motion.p 
        className="text-lg text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No blog posts found yet.
      </motion.p>
    );
  }

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
        className="max-w-3xl mt-20 mx-auto flex flex-col items-left justify-start min-h-[70vh] mb-24 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1 
          className="text-4xl text-black mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          human in the loop
        </motion.h1>
        {content}
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default Blog;
