import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, School, Book, CreditCard, Users, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { supabase } from '../supabase';
import qrCode from '../assets/qr.png';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    collegeName: '',
    teamName: '',
    course: '',
    studentIdFile: null,
    paymentScreenshotFile: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Initializing...');
    
    try {
      // 1. Upload files to Supabase Storage
      const uploadFile = async (file, label, folder) => {
        if (!file) return null;
        setStatus(`Uploading ${label}...`);
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const { data, error } = await supabase.storage
          .from('registrations')
          .upload(`${folder}/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) throw new Error(`Failed to upload ${label}: ${error.message}`);
        
        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('registrations')
          .getPublicUrl(data.path);
          
        return publicUrl;
      };

      const studentIdUrl = await uploadFile(formData.studentIdFile, 'Student ID', 'ids');
      const paymentScreenshotUrl = await uploadFile(formData.paymentScreenshotFile, 'Payment proof', 'payments');

      if (!studentIdUrl || !paymentScreenshotUrl) {
        throw new Error('Please upload all required documents.');
      }

      // 2. Submit to backend
      setStatus('Finalizing Registration...');
      const response = await axios.post('/api/registration/register', {
        ...formData,
        studentIdUrl,
        paymentScreenshotUrl
      }, {
        timeout: 30000 // 30 seconds timeout
      });

      if (response.status === 201) {
        setStatus('Success!');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Connection timeout. Please try again.';
      alert(`Registration Failed: ${errorMsg}`);
      setStatus('Failed');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-3xl text-center max-w-md border-neon"
        >
          <CheckCircle className="w-20 h-20 text-neon mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-4">REGISTRATION SUCCESSFUL!</h2>
          <p className="text-slate-400 mb-8">Your details have been recorded. Our team will review your ID and Payment. Stay tuned for further instructions!</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">PLAYER <span className="text-neon">REGISTRATION</span></h2>
          <div className="bg-neon/10 border border-neon/20 px-6 py-2 rounded-full inline-block">
             <p className="text-neon uppercase tracking-widest text-xs font-black">Exclusively for B.Tech Students & 2025 Pass-outs</p>
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass p-8 md:p-12 rounded-3xl space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput 
              icon={User} 
              label="Full Name" 
              placeholder="Enter your name" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
            <FormInput 
              icon={Phone} 
              label="Phone Number" 
              placeholder="10-digit mobile number" 
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              pattern="[0-9]{10}"
              required
            />
            <FormInput 
              icon={School} 
              label="College Name" 
              placeholder="Your institution" 
              value={formData.collegeName}
              onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
              required
            />
            <FormInput 
              icon={Users} 
              label="Team Name" 
              placeholder="Enter your team name" 
              value={formData.teamName}
              onChange={(e) => setFormData({...formData, teamName: e.target.value})}
              required
            />
            <FormInput 
              icon={Book} 
              label="Course / Stream" 
              placeholder="e.g. B.Tech CS" 
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <FileUploadField 
              id="studentId"
              icon={CreditCard} 
              label="Student ID" 
              onChange={(file) => setFormData({...formData, studentIdFile: file})}
            />
            <FileUploadField 
              id="paymentScreenshot"
              icon={CreditCard} 
              label="Payment Screenshot" 
              onChange={(file) => setFormData({...formData, paymentScreenshotFile: file})}
            />
          </div>

          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 flex flex-col items-center gap-6">
             <div className="text-center">
                <h4 className="font-sports text-xl text-primary mb-2">SCAN & PAY ENTRY FEE</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Amount: ₹200 (Per Team)</p>
                <p className="text-sm text-neon font-mono mt-2">UPI: 9398203083@ybl</p>
             </div>
             <div className="bg-white p-3 rounded-2xl shadow-[0_0_30px_rgba(0,255,204,0.3)]">
                <img src={qrCode} alt="Payment QR" className="w-40 h-40 object-contain" onError={(e) => e.target.src = "https://placehold.co/160?text=PAYMENT+QR"} />
             </div>
             <p className="text-xs text-slate-500 text-center max-w-xs">Scan the QR code above using PhonePe or any UPI app to pay your registration fee.</p>
             <div className="pt-4 border-t border-white/5 w-full text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">For any doubts or support:</p>
                <a href="tel:9398203083" className="text-lg font-black text-white hover:text-neon transition-colors">9398203083</a>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg mt-8 disabled:opacity-50"
          >
            {loading ? (status || "Processing...") : "Complete Registration"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

const FormInput = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-400 uppercase tracking-tight ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neon/60">
        <Icon size={20} />
      </div>
      <input 
        className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon outline-none transition-all placeholder:text-slate-600"
        {...props}
      />
    </div>
  </div>
);

const FileUploadField = ({ icon: Icon, label, onChange, id }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-400 uppercase tracking-tight ml-1">{label}</label>
      <label 
        htmlFor={id}
        className={`border-2 border-dashed ${fileName ? 'border-neon/50 bg-neon/5' : 'border-white/10 bg-white/5'} rounded-xl p-6 text-center hover:border-neon/50 transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[140px]`}
      >
        <input 
          id={id}
          type="file" 
          onChange={handleFileChange} 
          className="sr-only" 
          accept="image/*,application/pdf"
        />
        <Icon size={32} className={`mb-2 transition-transform group-hover:scale-110 ${fileName ? 'text-neon' : 'text-neon/60'}`} />
        <p className={`text-xs font-bold uppercase tracking-wide truncate w-full px-2 ${fileName ? 'text-white' : 'text-slate-500'}`}>
          {fileName || 'Click to select file'}
        </p>
        {fileName && <p className="text-[10px] text-neon mt-1 font-black">READY TO UPLOAD ✓</p>}
      </label>
    </div>
  );
};

export default Register;
