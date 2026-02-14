
import React, { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(LanguageContext);
  if (!context) return null;
  const { lang, blogPosts } = context;
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) return null;

  return (
    <article className="bg-white min-h-screen">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <span className="bg-[#005a5a] text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full mb-6">{post.category[lang]}</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter max-w-5xl leading-tight">{post.title[lang]}</h1>
          <p className="text-white/80 mt-6 font-bold uppercase tracking-widest text-sm">{post.date} • Smile Agency</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-16 md:py-24 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 lg:col-start-3">
          <div className="mb-12">
            <button onClick={() => navigate('/blog')} className="flex items-center gap-3 text-gray-400 hover:text-[#005a5a] font-bold uppercase text-xs tracking-widest transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              {lang === 'ka' ? 'ყველა ბლოგი' : 'All blog posts'}
            </button>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-[1.8] whitespace-pre-line">
            {post.content[lang] || post.excerpt[lang]}
          </div>

          <div className="mt-20 p-8 md:p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 uppercase mb-2 tracking-tight">{lang === 'ka' ? 'გაქვთ კითხვები?' : 'Have questions?'}</h4>
              <p className="text-gray-500 font-medium">{lang === 'ka' ? 'ჩვენი გუნდი მზად არის დაგეხმაროთ ნებისმიერ დროს.' : 'Our team is ready to help you anytime.'}</p>
            </div>
            <Link to="/contact" className="bg-[#005a5a] text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform shrink-0">{lang === 'ka' ? 'კონსულტაცია' : 'Consultation'}</Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
