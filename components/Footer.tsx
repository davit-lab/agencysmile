
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '../App';

const Footer: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const context = useContext(LanguageContext);
  if (!context) return null;
  const { lang, siteData } = context;
  const t = siteData[lang];

  const openingHours = t.footer.days.map((day: string) => ({ day, time: day === t.footer.days[6] ? '11:00 - 18:00' : '10:00 - 20:00' }));

  return (
    <footer className="bg-[#1f1f1f] text-white">
      {!isContactPage && (
        <div className="bg-white py-16 px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="rounded-[31px] overflow-hidden w-full md:w-[211px] h-[300px] bg-[#005a5a] flex items-center justify-center p-10">
                 <img src="https://framerusercontent.com/images/ZFhqqQkoQE5tjqtakzIHWZQNhOw.png" alt="Smile Agency Brand" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <a href="https://www.facebook.com/SmileAgency.ge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white p-3 shadow-lg group-hover:scale-105 transition-transform">
                    <img src="https://framerusercontent.com/images/ghom8ltrRrfS275bArALYmSGF00.png" alt="FB" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-2xl font-semibold text-[#005a5a] uppercase">{t.footer.fb}</h4>
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden h-[400px] border border-gray-100 shadow-sm">
              <iframe src="https://maps.google.com/maps?q=41.7166158,44.7747431&z=18&output=embed" className="w-full h-full border-0 grayscale opacity-80" title="Footer Map"></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#005a5a]/80 py-16 px-4 md:px-10 border-t border-black/5">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h6 className="text-xl font-bold uppercase tracking-wider mb-8">{t.footer.hours}</h6>
            <div className="space-y-3">
              {openingHours.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-[#005a5a]/30">
                  <span className="opacity-80 font-medium">{item.day}</span>
                  <span className="opacity-80 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h6 className="text-xl font-bold uppercase tracking-wider mb-8">{t.footer.contact}</h6>
            <div className="space-y-8">
              <div className="flex items-center gap-4"><div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div><p className="text-lg opacity-80">555 58 53 56</p></div>
              <div className="flex items-center gap-4"><div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div><p className="text-lg opacity-80 underline">Smileagency2020@gmail.com</p></div>
              <div className="flex items-center gap-4"><div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div><p className="text-lg opacity-80">{t.common.address}</p></div>
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm">
                <p className="opacity-70 text-sm leading-relaxed mb-6 italic">{t.footer.desc}</p>
                <Link to="/services" className="text-[#005a5a] bg-white px-6 py-3 rounded-xl font-bold uppercase text-xs text-center block tracking-widest hover:bg-teal-50">{t.footer.btn}</Link>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1f1f1f] py-8 px-4 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center opacity-40 text-[10px] gap-4 uppercase tracking-widest">
           <p>{t.footer.copy}</p>
           <div className="flex gap-4"><p>{t.footer.policy}</p><span className="opacity-30">|</span><p>{t.footer.terms}</p></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
