import React, { useState, useEffect } from 'react';
import { PROJECTS, MEMBERS } from './constants';
import { ReviewFormData, SentimentLevel } from './types';
import { SelectionHeader } from './components/SelectionHeader';
import { TextArea } from './components/ui/TextArea';
import { WillingnessSelect } from './components/WillingnessSelect';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

// New office background image
const BACKGROUND_IMAGE = "https://mynavitechtus.com/wp-content/uploads/2025/06/495168053_1298478595084510_88765-scaled.jpg";

const App: React.FC = () => {
  const [projectId, setProjectId] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<ReviewFormData>({
    keepDoing: '',
    startDoing: '',
    stopDoing: '',
    sentiment: null,
  });

  // Reset member selection when project changes
  useEffect(() => {
    setMemberId('');
  }, [projectId]);

  const handleProjectSelect = (id: string) => {
    setProjectId(id);
    setIsSuccess(false); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sentiment) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({
      keepDoing: '',
      startDoing: '',
      stopDoing: '',
      sentiment: null,
    });
    setMemberId('');
    setProjectId('');
    setIsSuccess(false);
  };

  const hasTextFeedback = formData.keepDoing.trim().length > 0 || formData.startDoing.trim().length > 0 || formData.stopDoing.trim().length > 0;
  const isValid = projectId && memberId && hasTextFeedback && formData.sentiment;

  // Render Success Screen
  if (isSuccess) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden font-sans">
        {/* Background Image Layer */}
        <div className="fixed inset-0 z-0">
           <img src={BACKGROUND_IMAGE} alt="Office Background" className="w-full h-full object-cover" />
           {/* Heavy overlay to ensure text readability and maintain brand color */}
           <div className="absolute inset-0 bg-[#D9F0F7]/90 backdrop-blur-[4px]"></div>
        </div>

        <div className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-xl p-12 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.07)] border border-white/80 text-center fade-enter-active flex flex-col items-center">
          <div className="bg-gradient-to-tr from-[#0ea5e9] to-[#38bdf8] p-6 rounded-2xl shadow-lg shadow-brand-500/20 mb-8 transform -rotate-2">
            <img 
              src="https://mynavitechtus.com/wp-content/uploads/2023/03/MYNAVI_ENLOGOMYNAVI_VIETNAMTECHTUS_YOKO_WHITE.png" 
              alt="Mynavi TechTus"
              className="h-8 w-auto object-contain" 
            />
          </div>
          <div className="w-20 h-20 bg-[#f0fdf4] text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-[#0c4a6e] mb-3 tracking-tight">Đánh giá thành công</h2>
          <p className="text-[#075985]/80 mb-10 leading-relaxed font-medium text-lg">
            Cảm ơn bạn đã dành thời gian. <br/>Những chia sẻ của bạn rất quý giá!
          </p>
          <button 
            onClick={handleReset}
            className="w-full py-4 px-6 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transform hover:-translate-y-1"
          >
            Review người khác
          </button>
        </div>
      </div>
    );
  }

  // Render Main Form
  return (
    <div className="min-h-screen relative font-sans text-[#0c4a6e] selection:bg-[#bae6fd]">
      
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img src={BACKGROUND_IMAGE} alt="Office Background" className="w-full h-full object-cover" />
        {/* Overlay - Pastel Blue Tint */}
        <div className="absolute inset-0 bg-[#D9F0F7]/85 backdrop-blur-[3px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6">
        {/* Header */}
        <header className="mb-12 text-center flex flex-col items-center">
          {/* Logo container */}
          <div className="mb-10 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0ea5e9] px-8 py-4 rounded-full shadow-2xl shadow-brand-500/20 ring-4 ring-white/30 flex items-center justify-center">
              <img 
                src="https://mynavitechtus.com/wp-content/uploads/2023/03/MYNAVI_ENLOGOMYNAVI_VIETNAMTECHTUS_YOKO_WHITE.png" 
                alt="Mynavi TechTus"
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-sm" 
              />
            </div>
          </div>
          
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white/60 mb-6">
             <Sparkles size={14} className="text-[#0ea5e9] mr-2" fill="currentColor" />
             <span className="text-xs font-bold text-[#075985] tracking-wider uppercase">Internal Peer Review</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-[#0c4a6e] mb-4 tracking-tight drop-shadow-sm">
            Đánh giá đồng đội
          </h1>
          <p className="text-xl text-[#0369a1]/80 font-medium max-w-2xl mx-auto drop-shadow-sm">
            Góp ý chân thành giúp chúng ta đi xa hơn cùng nhau.
          </p>
        </header>

        {/* Selection Area */}
        <SelectionHeader 
          projects={PROJECTS}
          members={MEMBERS}
          selectedProject={projectId}
          selectedMember={memberId}
          onSelectProject={handleProjectSelect}
          onSelectMember={setMemberId}
        />

        {/* Form Content */}
        {projectId && memberId && (
          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 fade-enter-active relative overflow-hidden">
            {/* Decoration blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              <TextArea
                label="Keep Doing (Tiếp tục phát huy)"
                placeholder="Điều gì người này đang làm tốt? (Ví dụ: Kỹ năng giải quyết vấn đề, tinh thần teamwork...)"
                value={formData.keepDoing}
                onChange={(e) => setFormData({...formData, keepDoing: e.target.value})}
                rows={3}
              />

              <TextArea
                label="Start Doing (Nên bắt đầu làm)"
                placeholder="Điều gì sẽ giúp họ tốt hơn? (Ví dụ: Chủ động hơn trong meeting, chia sẻ kiến thức...)"
                value={formData.startDoing}
                onChange={(e) => setFormData({...formData, startDoing: e.target.value})}
                rows={3}
              />

              <TextArea
                label="Stop Doing (Cần thay đổi)"
                placeholder="Điều gì đang gây trở ngại cho công việc chung?"
                value={formData.stopDoing}
                onChange={(e) => setFormData({...formData, stopDoing: e.target.value})}
                rows={3}
              />

              <div className="h-px bg-gradient-to-r from-transparent via-[#bae6fd] to-transparent my-10"></div>

              <WillingnessSelect 
                value={formData.sentiment} 
                onChange={(val) => setFormData({...formData, sentiment: val})} 
              />
            </div>

            {/* Submit Action */}
            <div className="mt-14 flex flex-col items-center">
              {!isValid && (
                <div className="mb-4 text-center animate-pulse">
                  <span className="text-sm font-semibold text-[#0ea5e9] bg-white/60 px-4 py-2 rounded-full border border-white">
                    Vui lòng hoàn thành ít nhất một mục nhận xét & chọn cảm nhận
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`
                  relative overflow-hidden group w-full sm:w-2/3 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg
                  ${!isValid 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white hover:shadow-2xl hover:shadow-[#0ea5e9]/30 hover:-translate-y-1'
                  }
                `}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-3" size={24} />
                      Đang gửi đánh giá...
                    </>
                  ) : (
                    'Gửi đánh giá'
                  )}
                </span>
                {isValid && <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-out -skew-x-12 origin-left"></div>}
              </button>
            </div>
          </form>
        )}

        {/* Empty State / Prompt */}
        {(!projectId || !memberId) && (
          <div className="text-center py-16 px-4">
             <p className="text-[#0369a1]/70 font-medium bg-white/50 backdrop-blur-md inline-block px-8 py-4 rounded-2xl border border-white/50 shadow-sm">
               👋 Chọn dự án và thành viên để bắt đầu review nhé
             </p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-16 text-center pb-8">
        <p className="text-xs font-semibold text-[#075985]/60 uppercase tracking-widest bg-white/30 backdrop-blur-sm inline-block px-4 py-1 rounded-full">
          Secure & Anonymous Feedback System
        </p>
      </footer>
    </div>
  );
};

export default App;