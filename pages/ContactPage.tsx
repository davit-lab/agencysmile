
import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../App';
import { API } from '../api';

const ContactPage: React.FC = () => {
  const context = useContext(LanguageContext);
  if (!context) return null;
  const { lang, siteData, team, leads, setLeads } = context;
  const t = siteData[lang];

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: '',
    concern: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.doctor) {
      alert(lang === 'ka' ? 'გთხოვთ აირჩიოთ ექიმი' : 'Please select a doctor');
      return;
    }
    
    setStatus('submitting');
    
    const leadToSubmit = {
      ...formData,
      date: new Date().toLocaleDateString('ka-GE') + ' ' + new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' })
    };
    
    try {
      const result = await API.createLead(leadToSubmit);
      if (result.ok) {
        // Refresh local state to show it in admin immediately if needed
        const updatedLeads = await API.getLeads();
        setLeads(updatedLeads);
        
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', doctor: '', concern: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactHero = siteData[lang].media?.contact_hero || "https://framerusercontent.com/images/ZFhqqQkoQE5tjqtakzIHWZQNhOw.png";

  return (
    <div className="bg-white min-h-screen pt-20 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[#005a5a] font-black uppercase tracking-[0.4em] text-xs mb-6 block">{t.contactPage.connect}</span>
            <h1 className="text-6xl md:text-[8rem] font-black text-gray-900 uppercase tracking-tighter leading-none mb-12">
              {lang === 'ka' ? 'კონტაქტი' : 'Contact'}
            </h1>
            <div className="space-y-10">
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                <p className="text-[10px] font-black uppercase text-[#005a5a] mb-4">Phone</p>
                <a href="tel:555585356" className="text-4xl font-black text-gray-900 hover:text-[#005a5a] transition-colors">555 58 53 56</a>
              </div>
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                <p className="text-[10px] font-black uppercase text-[#005a5a] mb-4">Address</p>
                <p className="text-2xl font-bold text-gray-900">{t.common.address}</p>
              </div>
              <div className="rounded-[3rem] overflow-hidden aspect-video shadow-xl">
                 <img src={contactHero} alt="Office" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-20 rounded-[4rem] shadow-2xl border border-gray-50">
            {status === 'success' ? (
              <div className="text-center py-20 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-[#005a5a] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">{t.common.sent}</h3>
                <p className="text-gray-400 font-bold">{t.common.wait}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter">{t.contactPage.formTitle}</h3>
                
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.contactPage.chooseDoctor}</p>
                  <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                    {team.map(m => (
                      <button key={m.id} type="button" onClick={() => setFormData({...formData, doctor: m.name[lang]})} className={`flex-shrink-0 w-24 transition-all duration-300 ${formData.doctor === m.name[lang] ? 'scale-110 opacity-100' : 'opacity-40 grayscale hover:opacity-60'}`}>
                        <div className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${formData.doctor === m.name[lang] ? 'border-[#005a5a]' : 'border-transparent'}`}>
                          <img src={m.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="text-[8px] font-black uppercase text-center mt-2 truncate">{m.name[lang].split(' ')[0]}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <input name="name" value={formData.name} placeholder={t.contactPage.name} required onChange={handleChange} className="w-full py-4 border-b-2 border-gray-100 outline-none focus:border-[#005a5a] font-bold transition-all" />
                  <input name="phone" value={formData.phone} placeholder={t.contactPage.phonePlaceholder} required onChange={handleChange} className="w-full py-4 border-b-2 border-gray-100 outline-none focus:border-[#005a5a] font-bold transition-all" />
                </div>
                <input name="concern" value={formData.concern} placeholder={t.contactPage.concernPlaceholder} required onChange={handleChange} className="w-full py-4 border-b-2 border-gray-100 outline-none focus:border-[#005a5a] font-bold transition-all" />
                <textarea name="message" value={formData.message} placeholder={t.contactPage.message} onChange={handleChange} rows={3} className="w-full p-6 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#005a5a]/10 font-medium"></textarea>
                
                {status === 'error' && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">შეცდომა! გთხოვთ სცადოთ მოგვიანებით.</p>}

                <button type="submit" disabled={status === 'submitting'} className="w-full py-6 bg-[#005a5a] text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl hover:bg-black transition-all transform active:scale-95 disabled:opacity-50">
                  {status === 'submitting' ? 'Sending...' : t.contactPage.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
