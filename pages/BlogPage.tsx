
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';

const BlogPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const context = useContext(LanguageContext);
  if (!context) return null;
  const { lang, siteData } = context;
  const t = siteData[lang];

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const posts = Object.entries(t.blogPage.posts).map(([id, data]: [string, any]) => ({
    id,
    ...data
  }));

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="fixed top-1/2 left-0 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none w-full text-center z-0">
        <h2 className="text-[15rem] md:text-[30rem] font-black uppercase tracking-[-0.05em] leading-none text-[#005a5a]">JOURNAL</h2>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className={`mb-20 md:mb-32 space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-4">
             <span className="h-[2px] w-12 bg-[#005a5a]" />
             <span className="text-[#005a5a] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">{lang === 'ka' ? 'სიახლეები' : 'Our Journal'}</span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black text-gray-900 uppercase tracking-tighter leading-[0.85] mb-6">
            {t.blogPage.title}
          </h1>
          <p className="text-gray-500 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
            {t.blogPage.subtitle}
          </p>
        </div>

        {featuredPost && (
          <div className={`mb-24 md:mb-40 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <Link to={`/blog/${featuredPost.id}`} className="group grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="lg:col-span-8 overflow-hidden rounded-[3rem] md:rounded-[4rem] shadow-2xl aspect-[16/9]">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-4 space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <span className="bg-[#005a5a] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full inline-block shadow-lg">
                    {featuredPost.category}
                  </span>
                  <p className="text-gray-400 font-black text-xs uppercase tracking-widest">{featuredPost.date}</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight group-hover:text-[#005a5a] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-4 text-gray-900 font-black uppercase text-xs tracking-[0.2em] group-hover:gap-6 transition-all">
                  {t.blogPage.readMore}
                  <svg className="w-5 h-5 text-[#005a5a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {regularPosts.map((post: any, index: number) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className={`group transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${(index + 1) * 200 + 400}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-6 px-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#005a5a] font-black uppercase text-[10px] tracking-widest bg-[#005a5a]/5 px-4 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter leading-tight group-hover:text-[#005a5a] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-2 flex items-center gap-4 text-gray-400 group-hover:text-[#005a5a] font-black uppercase text-[10px] tracking-widest transition-all">
                  {t.blogPage.readMore}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
