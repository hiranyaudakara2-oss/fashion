import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, LogOut, Lock } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Fetching CMS content...');
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        console.log('CMS content loaded:', data);
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load CMS content:', err);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, content })
      });
      if (res.ok) {
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/5"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-display text-center mb-8 text-white">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="Enter password..."
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-[#E0E0E0] transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6 text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-display mb-2">CMS Dashboard</h1>
            <p className="text-[#A1A1A1]">Edit your website content in real-time.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-[#E0E0E0] transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 bg-transparent border border-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-black transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Hero Section CMS */}
          <section className="bg-[#1A1A1A] p-8 rounded-2xl shadow-sm border border-white/5">
            <h2 className="text-xl font-display mb-6 pb-4 border-b border-white/5">Hero Section</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Main Title</label>
                <input 
                  type="text" 
                  value={content?.hero?.title || ""}
                  onChange={(e) => setContent({...content, hero: {...(content?.hero || {}), title: e.target.value}})}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Subtitle</label>
                <input 
                  type="text" 
                  value={content?.hero?.subtitle || ""}
                  onChange={(e) => setContent({...content, hero: {...(content?.hero || {}), subtitle: e.target.value}})}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Button Text</label>
                <input 
                  type="text" 
                  value={content?.hero?.buttonText || ""}
                  onChange={(e) => setContent({...content, hero: {...(content?.hero || {}), buttonText: e.target.value}})}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Broadcast Message CMS */}
          <section className="bg-[#1A1A1A] p-8 rounded-2xl shadow-sm border border-white/5">
            <h2 className="text-xl font-display mb-6 pb-4 border-b border-white/5">Broadcast Message</h2>
            <div className="grid gap-6">
              <div className="flex items-center gap-4 mb-2">
                <label className="text-xs uppercase tracking-widest text-[#A1A1A1] font-medium">Enable Broadcast</label>
                <button 
                  onClick={() => setContent({...content, broadcast: {...(content?.broadcast || {}), enabled: !content?.broadcast?.enabled}})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${content?.broadcast?.enabled ? 'bg-red-600' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${content?.broadcast?.enabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Message Content</label>
                <textarea 
                  value={content?.broadcast?.message || ""}
                  onChange={(e) => setContent({...content, broadcast: {...(content?.broadcast || {}), message: e.target.value}})}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors min-h-[100px]"
                  placeholder="Enter message for all users..."
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Message Type</label>
                <select 
                  value={content?.broadcast?.type || "info"}
                  onChange={(e) => setContent({...content, broadcast: {...(content?.broadcast || {}), type: e.target.value}})}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                >
                  <option value="info">Information (Blue)</option>
                  <option value="warning">Warning (Yellow)</option>
                  <option value="success">Success (Green)</option>
                  <option value="error">Urgent (Red)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Theme Settings CMS */}
          <section className="bg-[#1A1A1A] p-8 rounded-2xl shadow-sm border border-white/5">
            <h2 className="text-xl font-display mb-6 pb-4 border-b border-white/5">Theme Settings</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A1A1A1] mb-2 font-medium">Background Color</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="color" 
                    value={content.theme?.bgColor || "#050505"}
                    onChange={(e) => setContent({...content, theme: {...content.theme, bgColor: e.target.value}})}
                    className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={content.theme?.bgColor || "#050505"}
                    onChange={(e) => setContent({...content, theme: {...content.theme, bgColor: e.target.value}})}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setContent({...content, theme: {...content.theme, bgColor: "#050505"}})}
                  className="px-4 py-2 bg-black text-white rounded-lg text-xs border border-white/10 hover:bg-white/10"
                >
                  Dark Mode
                </button>
                <button 
                  onClick={() => setContent({...content, theme: {...content.theme, bgColor: "#FAFAFA"}})}
                  className="px-4 py-2 bg-white text-black rounded-lg text-xs border border-black/10 hover:bg-black/10"
                >
                  Light Mode
                </button>
              </div>
            </div>
          </section>

          {/* Product Management CMS */}
          <section className="bg-[#1A1A1A] p-8 rounded-2xl shadow-sm border border-white/5">
            <h2 className="text-xl font-display mb-6 pb-4 border-b border-white/5">Product Management</h2>
            <div className="space-y-6">
              {content.products?.map((product: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Product #{index + 1}</h3>
                    <button 
                      onClick={() => {
                        const newProducts = [...content.products];
                        newProducts.splice(index, 1);
                        setContent({...content, products: newProducts});
                      }}
                      className="text-red-400 hover:text-red-300 text-xs uppercase font-bold"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#A1A1A1] mb-1">Name</label>
                      <input 
                        type="text" 
                        value={product.name}
                        onChange={(e) => {
                          const newProducts = [...content.products];
                          newProducts[index].name = e.target.value;
                          setContent({...content, products: newProducts});
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#A1A1A1] mb-1">Price</label>
                      <input 
                        type="text" 
                        value={product.price}
                        onChange={(e) => {
                          const newProducts = [...content.products];
                          newProducts[index].price = e.target.value;
                          setContent({...content, products: newProducts});
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#A1A1A1] mb-1">Category</label>
                      <input 
                        type="text" 
                        value={product.category}
                        onChange={(e) => {
                          const newProducts = [...content.products];
                          newProducts[index].category = e.target.value;
                          setContent({...content, products: newProducts});
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#A1A1A1] mb-1">Color (Hex)</label>
                      <input 
                        type="text" 
                        value={product.color}
                        onChange={(e) => {
                          const newProducts = [...content.products];
                          newProducts[index].color = e.target.value;
                          setContent({...content, products: newProducts});
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#A1A1A1] mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={product.image}
                        onChange={(e) => {
                          const newProducts = [...content.products];
                          newProducts[index].image = e.target.value;
                          setContent({...content, products: newProducts});
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => {
                  const newProducts = [...(content.products || [])];
                  newProducts.push({
                    id: Date.now(),
                    name: "New Product",
                    price: "$0",
                    category: "General",
                    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
                    color: "#000000"
                  });
                  setContent({...content, products: newProducts});
                }}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-[#A1A1A1] hover:border-white/30 hover:text-white transition-all text-sm uppercase tracking-widest font-bold"
              >
                + Add New Product
              </button>
            </div>
          </section>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="text-sm text-[#A1A1A1] italic">
              Tip: Changes made here will be visible to all users once you click "Save Changes".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
