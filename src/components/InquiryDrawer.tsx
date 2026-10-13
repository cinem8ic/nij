import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'white';
  initialTopic?: string;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
  initialTopic = 'Directorial Commissions & Screen Choreo'
}) => {
  const isWhite = theme === 'white';

  const [formData, setFormData] = useState({
    eventType: initialTopic,
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    location: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setFormData((prev) => ({ ...prev, eventType: initialTopic }));
    }
  }, [initialTopic]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      className={`fixed inset-0 z-[150] flex justify-end backdrop-blur-2xl transition-opacity ${
        isWhite ? 'bg-black/20' : 'bg-black/60'
      }`}
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-lg h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 backdrop-blur-3xl transition-all duration-300 border-none ${
          isWhite 
            ? 'bg-[#FAF8F5]/85 text-stone-900 shadow-2xl' 
            : 'bg-[#060608]/80 text-white shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header - Pure Minimal */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 border-stone-300/40">
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-[0.28em] font-semibold ${
              isWhite ? 'text-stone-500' : 'text-stone-400'
            }`}>
              INQUIRY
            </span>
            <h3 className={`text-xl sm:text-2xl font-['Bebas_Neue',_'Montserrat',_sans-serif] font-bold uppercase tracking-wider ${
              isWhite ? 'text-stone-950' : 'text-white'
            }`}>
              CURATE A COMMISSION
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isWhite ? 'text-stone-500 hover:text-black hover:bg-black/5' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 flex-1">
          {submitted ? (
            <div className="py-12 text-center space-y-4 my-auto">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto border ${
                isWhite ? 'bg-black/5 text-stone-900 border-black/20' : 'bg-white/5 text-[#dfba73] border-white/20'
              }`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className={`text-xl font-['Bebas_Neue',_sans-serif] tracking-wider uppercase font-bold ${
                isWhite ? 'text-stone-950' : 'text-white'
              }`}>
                INQUIRY RECEIVED
              </h4>
              <p className={`text-xs leading-relaxed max-w-sm mx-auto ${
                isWhite ? 'text-stone-600' : 'text-stone-400'
              }`}>
                Thank you for reaching out. Our Jubilee Hills studio director will respond within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className={`px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                    isWhite ? 'bg-black text-white hover:bg-stone-800' : 'bg-white/15 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Category */}
              <div className="space-y-1">
                <label className={`text-[10px] font-mono uppercase tracking-widest ${
                  isWhite ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  CATEGORY
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer ${
                    isWhite 
                      ? 'border-black/20 text-stone-900 focus:border-black' 
                      : 'border-white/20 text-white focus:border-[#dfba73]'
                  }`}
                >
                  <option value="Directorial Commission & Screen Choreo" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Directorial Commission & Screen Choreography
                  </option>
                  <option value="Royal Palace Sangeet Direction" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Royal Palace Sangeet Direction
                  </option>
                  <option value="Contemporary & Commercial Choreography" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Contemporary & Commercial Choreography
                  </option>
                  <option value="Private Inversion & Handstand Coaching" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Private Inversion & Handstand Coaching
                  </option>
                  <option value="Festival & Arena Masterclass" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Festival & Arena Masterclass
                  </option>
                  <option value="Studio Rental & Floor Booking" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Jubilee Hills Studio Floor Booking
                  </option>
                </select>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-[10px] font-mono uppercase tracking-widest ${
                    isWhite ? 'text-stone-600' : 'text-stone-400'
                  }`}>
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'border-black/20 text-stone-900 placeholder:text-stone-400 focus:border-black' 
                        : 'border-white/20 text-white placeholder:text-stone-500 focus:border-[#dfba73]'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[10px] font-mono uppercase tracking-widest ${
                    isWhite ? 'text-stone-600' : 'text-stone-400'
                  }`}>
                    PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'border-black/20 text-stone-900 placeholder:text-stone-400 focus:border-black' 
                        : 'border-white/20 text-white placeholder:text-stone-500 focus:border-[#dfba73]'
                    }`}
                  />
                </div>
              </div>

              {/* Email & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-[10px] font-mono uppercase tracking-widest ${
                    isWhite ? 'text-stone-600' : 'text-stone-400'
                  }`}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'border-black/20 text-stone-900 placeholder:text-stone-400 focus:border-black' 
                        : 'border-white/20 text-white placeholder:text-stone-500 focus:border-[#dfba73]'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[10px] font-mono uppercase tracking-widest ${
                    isWhite ? 'text-stone-600' : 'text-stone-400'
                  }`}>
                    DATE / TIMELINE
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer ${
                      isWhite 
                        ? 'border-black/20 text-stone-900 focus:border-black' 
                        : 'border-white/20 text-white focus:border-[#dfba73]'
                    }`}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className={`text-[10px] font-mono uppercase tracking-widest ${
                  isWhite ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  LOCATION / VENUE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad / Rajasthan / Destination"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors ${
                    isWhite 
                      ? 'border-black/20 text-stone-900 placeholder:text-stone-400 focus:border-black' 
                      : 'border-white/20 text-white placeholder:text-stone-500 focus:border-[#dfba73]'
                  }`}
                />
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className={`text-[10px] font-mono uppercase tracking-widest ${
                  isWhite ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  NOTES & SCOPE
                </label>
                <textarea
                  rows={2}
                  placeholder="Details, performers count, track ideas..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`w-full bg-transparent border-b py-2 text-xs sm:text-sm focus:outline-none transition-colors resize-none ${
                    isWhite 
                      ? 'border-black/20 text-stone-900 placeholder:text-stone-400 focus:border-black' 
                      : 'border-white/20 text-white placeholder:text-stone-500 focus:border-[#dfba73]'
                  }`}
                />
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className={`group inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full font-mono font-bold text-xs uppercase tracking-[0.22em] transition-all cursor-pointer backdrop-blur-xl ${
                    isWhite
                      ? 'bg-black/5 hover:bg-black/10 text-stone-900 border border-black/10 hover:border-black/20'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/25'
                  }`}
                >
                  <span className="relative">
                    SUBMIT INQUIRY
                    <span className={`absolute -bottom-1 left-0 w-0 group-hover:w-full h-px transition-all duration-300 ${
                      isWhite ? 'bg-black' : 'bg-white'
                    }`} />
                  </span>
                  <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        <div className={`pt-4 border-t text-[10px] font-mono flex items-center justify-between ${
          isWhite ? 'border-black/10 text-stone-500' : 'border-white/10 text-stone-500'
        }`}>
          <span>JUBILEE HILLS, HYDERABAD</span>
          <span>@NICYJOSEPHDANCEANDFITNESS</span>
        </div>

      </div>
    </div>
  );
};
