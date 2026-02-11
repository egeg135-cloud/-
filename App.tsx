
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';

import HomeScreen from './components/HomeScreen';
import FeedScreen from './components/FeedScreen';
import ReportScreen from './components/ReportScreen';
import MyScreen from './components/MyScreen';
import CheckInModal from './components/CheckInModal';
import BottomNav from './components/BottomNav';
import SuccessCelebration from './components/SuccessCelebration';
import LoginScreen from './components/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen'; // New
import ClubCurriculumView from './components/ClubCurriculumView';
import InviteFriendScreen from './components/InviteFriendScreen';
import RoutineResuscitation from './components/RoutineResuscitation';
import ExploreScreen from './components/ExploreScreen';
import ChatModal from './components/ChatModal';
import WelcomeGuide from './components/WelcomeGuide'; 
import DevicePreview from './components/DevicePreview'; 
import { BaseModal, Toast, LevelUpModal } from './components/UIComponents';
import { NotificationManager } from './components/NotificationManager';
import { MOCK_CLUBS } from './constants';
import { Club } from './types';
import { ChevronRight, Camera } from 'lucide-react';

const MainContent = () => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    isCheckInModalOpen, 
    setIsCheckInModalOpen, 
    isClubSelectorOpen,
    setIsClubSelectorOpen,
    isDevicePreviewOpen,
    setIsDevicePreviewOpen,
    isNewUser, // New
    openCheckInModal,
    addPost,
    showResuscitation,
    setShowResuscitation,
    shieldCount,
    useShield,
    myClubs,
    joinClub,
    setActiveClubId,
    toast,
    showToast,
    newLevel,
    closeLevelUpModal
  } = useApp();
  
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  
  if (!user) {
    return <LoginScreen />;
  }

  // Show onboarding for new users right after signup
  if (isNewUser) {
    return <OnboardingScreen />;
  }

  const handleClubSelect = (club: Club) => {
    setSelectedClub(club);
  };

  const handleBackToExplore = () => {
    setSelectedClub(null);
    if (activeTab !== 'explore') setActiveTab('explore');
  };

  const renderExploreContent = () => {
    if (selectedClub) {
      return (
        <ClubCurriculumView 
          club={selectedClub} 
          onPaymentComplete={() => {
            joinClub(selectedClub); 
            setActiveTab('invite');
          }}
          onBack={handleBackToExplore}
        />
      );
    }
    return <ExploreScreen clubs={MOCK_CLUBS} onSelectClub={handleClubSelect} />;
  };

  return (
    <>
      <WelcomeGuide /> 
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}
      
      {newLevel && <LevelUpModal level={newLevel} onClose={closeLevelUpModal} />}

      <div className="h-full relative">
        {activeTab === 'home' && <HomeScreen />}
        
        <div className={`h-full ${activeTab === 'explore' ? 'block' : 'hidden'}`}>
           {renderExploreContent()}
        </div>

        {activeTab === 'invite' && (
          <InviteFriendScreen 
            clubName={selectedClub ? selectedClub.title : 'MOTIDAY 챌린지'}
            onSkip={() => {
              if (selectedClub) {
                  setActiveClubId(selectedClub.id);
                  setActiveTab('feed');
              } else {
                  setActiveTab('home');
              }
              setSelectedClub(null);
            }}
          />
        )}
        {activeTab === 'feed' && <FeedScreen />}
        {activeTab === 'report' && <ReportScreen />}
        {activeTab === 'my' && <MyScreen />}
      </div>
      
      <NotificationManager />
      
      {isCheckInModalOpen && (
        <CheckInModal 
          onClose={() => setIsCheckInModalOpen(false)} 
          onSubmit={addPost} 
        />
      )}

      {/* Device Preview Modal */}
      {isDevicePreviewOpen && (
          <DevicePreview onClose={() => setIsDevicePreviewOpen(false)} />
      )}

      <ChatModal />

      <BaseModal
        isOpen={isClubSelectorOpen}
        onClose={() => setIsClubSelectorOpen(false)}
        title="인증할 클럽 선택"
      >
        <div className="space-y-3">
          <p className="text-xs text-gray-500 mb-2">오늘 인증할 챌린지 룸을 선택해주세요.</p>
          {myClubs.map((club) => (
            <button
              key={club.id}
              onClick={() => {
                setIsClubSelectorOpen(false);
                openCheckInModal(club.id);
              }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary active:bg-[#FFF9E6] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm border border-gray-100">
                  {club.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-[#333333] group-hover:text-primary transition-colors">{club.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate max-w-[180px]">{club.mission}</p>
                </div>
              </div>
              <Camera size={20} className="text-gray-300 group-hover:text-primary" />
            </button>
          ))}
        </div>
      </BaseModal>
      
      {showResuscitation && (
        <RoutineResuscitation 
          missedDay="어제"
          shieldCount={shieldCount}
          onUseShield={useShield}
          onSkip={() => setShowResuscitation(false)}
        />
      )}
      
      {(!selectedClub || activeTab !== 'explore') && <BottomNav />}
      <SuccessCelebration />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="max-w-md mx-auto h-screen bg-white relative shadow-2xl overflow-hidden font-sans text-[#333333]">
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;
