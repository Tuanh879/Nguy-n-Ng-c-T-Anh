import React, { useState, useEffect } from 'react';
import { PROJECTS, MEMBERS } from './constants';
import { ReviewFormData, SentimentLevel } from './types';
import { SelectionHeader } from './components/SelectionHeader';
import { TextArea } from './components/ui/TextArea';
import { WillingnessSelect } from './components/WillingnessSelect';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

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

  // Derived state to check if form is valid (All fields optional or required? User said "free style", implying text is important but didn't strict require all. Let's make text fields encouraged but maybe not strictly blocking if they have something, but usually feedback requires at least one input. Let's assume text is required for quality.)
  // Actually, usually in these frameworks, at least one text field or all should be filled. Let's require at least Keep or Start or Stop, + Sentiment.
  const hasTextFeedback = formData.keepDoing.trim().length > 0 || formData.startDoing.trim().length > 0 || formData.stopDoing.trim().length > 0;
  const isValid = projectId && memberId && hasTextFeedback && formData.sentiment;

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-brand-100">
        <div className="max-w-md w-full bg-white p-12 rounded-2xl shadow-lg border border-brand-100 text-center fade-enter-active">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-brand-900 mb-3">Đánh giá thành công</h2>
          <p className="text-brand-700/70 mb-8 leading-relaxed">
            Cảm ơn bạn đã dành thời gian. Những chia sẻ thẳng thắn của bạn sẽ giúp đồng đội phát triển tốt hơn mỗi ngày.
          </p>
          <button 
            onClick={handleReset}
            className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors shadow-md shadow-brand-200"
          >
            Review thành viên khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-brand-50 to-brand-100 py-12 px-4 sm:px-6">
      <main className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-brand-100 mb-4">
             <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mr-3">
               <Sparkles size={16} />
             </div>
             <span className="text-sm font-semibold text-brand-800 tracking-tight">Internal Peer Review</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-3 tracking-tight">
            Đánh giá đồng đội
          </h1>
          <p className="text-lg text-brand-700/80 font-light max-w-lg mx-auto">
            Chia sẻ chân thành, cởi mở để cùng nhau tiến bộ.
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
          <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-md shadow-brand-100/50 border border-brand-100 fade-enter-active">
            
            <div className="space-y-4">
              <TextArea
                label="Keep Doing (Tiếp tục phát huy)"
                placeholder="Điều gì người này đang làm tốt và nên duy trì? Ví dụ: Tinh thần trách nhiệm, code clean, hỗ trợ team..."
                value={formData.keepDoing}
                onChange={(e) => setFormData({...formData, keepDoing: e.target.value})}
                rows={4}
              />

              <TextArea
                label="Start Doing (Nên bắt đầu làm)"
                placeholder="Điều gì người này chưa làm nhưng nếu làm sẽ tốt hơn? Ví dụ: Chủ động đặt câu hỏi, document kỹ hơn..."
                value={formData.startDoing}
                onChange={(e) => setFormData({...formData, startDoing: e.target.value})}
                rows={4}
              />

              <TextArea
                label="Stop Doing (Cần thay đổi / Dừng lại)"
                placeholder="Điều gì đang ảnh hưởng không tốt đến công việc chung và nên dừng lại?"
                value={formData.stopDoing}
                onChange={(e) => setFormData({...formData, stopDoing: e.target.value})}
                rows={4}
              />

              <div className="border-t border-brand-100 my-8"></div>

              <WillingnessSelect 
                value={formData.sentiment} 
                onChange={(val) => setFormData({...formData, sentiment: val})} 
              />
            </div>

            {/* Submit Action */}
            <div className="mt-12 flex justify-end flex-col sm:flex-row items-center gap-4">
              {!isValid && (
                <span className="text-sm text-brand-400 order-2 sm:order-1">
                  * Vui lòng điền ít nhất một nhận xét và chọn cảm nhận chung.
                </span>
              )}
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`
                  flex items-center justify-center py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 min-w-[200px] order-1 sm:order-2 w-full sm:w-auto
                  ${!isValid 
                    ? 'bg-brand-50 text-brand-300 cursor-not-allowed border border-brand-100' 
                    : 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20 transform hover:-translate-y-0.5'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Đang gửi...
                  </>
                ) : (
                  'Gửi đánh giá'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Empty State / Prompt */}
        {(!projectId || !memberId) && (
          <div className="text-center py-12 px-4 opacity-70">
            <p className="text-brand-400 font-medium">Vui lòng chọn Dự án và Thành viên để bắt đầu.</p>
          </div>
        )}
      </main>
      
      {/* Footer / Trust signal */}
      <footer className="mt-12 text-center pb-8">
        <p className="text-xs text-brand-300">
          Thông tin đánh giá được bảo mật và chỉ chia sẻ với quản lý trực tiếp.
        </p>
      </footer>
    </div>
  );
};

export default App;