import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { products } from '../constants';
import PageTransition from '../components/PageTransition';
import { useShop } from '../context/ShopContext';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setBgColor } = useShop();
  
  const [formData, setFormData] = useState({ fullName: '', address: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    if (product) {
      setBgColor(product.color);
    }
  }, [product, setBgColor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co (a frontend service like Formspree that accepts direct emails)
      // Note: On the very first submission, FormSubmit will send an activation email to this address.
      const response = await fetch('https://formsubmit.co/ajax/hiranyaudakara2@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Order: ${product?.name}`,
          Product_Name: product?.name,
          Product_Price: product?.price,
          Customer_Name: formData.fullName || 'Not provided',
          Delivery_Address: formData.address,
          Phone_Number: formData.phone,
          Email_Address: formData.email || 'Not provided',
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError('Failed to send order details. Please try again.');
      }
    } catch (err) {
      setError('Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
        <button onClick={() => navigate('/products')} className="ml-4 underline">Go back</button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 mb-12 hover:opacity-60 transition-opacity uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
        <div className="container mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 text-center"
                >
                  <CheckCircle className="w-20 h-20 mx-auto mb-6 text-emerald-400" />
                  <h2 className="text-4xl font-display uppercase mb-4">Order Placed Successfully</h2>
                  <p className="opacity-80">Thank you for your purchase. Your order details have been emailed to us.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20">
                  <h2 className="text-3xl font-display uppercase mb-8">Order Information</h2>
                  {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
                  <div className="space-y-6">
                    <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    <input type="text" placeholder="Delivery Address *" className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    <input type="tel" placeholder="Phone Number *" className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-10 w-full py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Order'
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
