import React from 'react';
import { useCMS } from '../context/CMSContext';

const ONE_ON_ONE_CAL_LINK = 'https://cal.com/melissa-anchelia-54kwyd/1-1-class';
const CONVERSATION_CAL_LINK = 'https://cal.com/melissa-anchelia-54kwyd/conversation-class-40-min';

export const HomeFeaturedPrograms: React.FC = () => {
  const { setActiveView } = useCMS();

  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('group-lessons');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FFF6EC] border-b border-[#E9DCCB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22334A] tracking-tight mb-8">
          Choose your class
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: 1:1 Class */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E9DCCB] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#C8553D]">
                1:1 Class
              </h3>
              <p className="text-sm font-medium text-[#22334A]/65 mt-1 tabular-nums">
                50 min · $25
              </p>
              <p className="mt-4 text-sm text-[#22334A]/85 leading-relaxed">
                Your goals, your pace. A personalized plan to speak with confidence
              </p>
            </div>

            <div className="mt-7">
              <a
                href={ONE_ON_ONE_CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] w-full inline-flex items-center justify-center py-3 px-6 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer"
              >
                Book now
              </a>
            </div>
          </div>

          {/* Card 2: Conversation Class */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E9DCCB] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#C8553D]">
                Conversation Class
              </h3>
              <p className="text-sm font-medium text-[#22334A]/65 mt-1 tabular-nums">
                40 min · $15
              </p>
              <p className="mt-4 text-sm text-[#22334A]/85 leading-relaxed">
                Fun, engaging chats on a new topic every class
              </p>
            </div>

            <div className="mt-7">
              <a
                href={CONVERSATION_CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] w-full inline-flex items-center justify-center py-3 px-6 text-sm font-semibold text-white bg-[#C8553D] hover:bg-[#B14630] rounded-full transition-colors cursor-pointer"
              >
                Book now
              </a>
            </div>
          </div>

          {/* Card 3: Group Lessons (Mustard border & button) */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#F2B134] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#C8553D]">
                Group Lessons
              </h3>
              <p className="text-sm font-medium text-[#22334A]/65 mt-1">
                Coming soon
              </p>
              <p className="mt-4 text-sm text-[#22334A]/85 leading-relaxed">
                Small, friendly groups.
              </p>
            </div>

            <div className="mt-7">
              <a
                href="/group-lessons"
                onClick={handleJoinWaitlist}
                className="min-h-[46px] w-full inline-flex items-center justify-center py-3 px-6 text-sm font-semibold text-white bg-[#F2B134] hover:bg-[#de9f23] rounded-full transition-colors cursor-pointer"
              >
                Join waitlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
