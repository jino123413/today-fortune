import React, { useState, useCallback, useEffect } from 'react';
import { GoogleAdMob, generateHapticFeedback } from '@apps-in-toss/web-framework';
import { FortuneResult, StreakData } from './types';
import { getDailyFortune } from './utils/fortune-engine';
import { updateStreak } from './utils/storage';
import { DeviceViewport } from './components/DeviceViewport';
import ResultScreen from './components/ResultScreen';

const AD_GROUP_ID = 'ait.v2.live.9e5ea8f20f984bc9';

function useInterstitialAd(adGroupId: string = AD_GROUP_ID) {
  const [loading, setLoading] = useState(true);
  const [adSupported, setAdSupported] = useState(true);
  const dismissCallbackRef = React.useRef<(() => void) | undefined>();

  useEffect(() => {
    try {
      const isAdUnsupported = GoogleAdMob?.loadAppsInTossAdMob?.isSupported?.() === false;
      if (isAdUnsupported) {
        setAdSupported(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      const cleanup = GoogleAdMob.loadAppsInTossAdMob({
        options: { adGroupId },
        onEvent: (event: any) => {
          if (event.type === 'loaded') {
            setLoading(false);
          }
        },
        onError: () => {
          setLoading(false);
        },
      });
      return cleanup;
    } catch {
      setAdSupported(false);
      setLoading(false);
    }
  }, [adGroupId]);

  const reloadAd = useCallback(() => {
    if (!adSupported) return;
    setLoading(true);
    GoogleAdMob.loadAppsInTossAdMob({
      options: { adGroupId },
      onEvent: (event: any) => {
        if (event.type === 'loaded') {
          setLoading(false);
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, [adSupported, adGroupId]);

  const showInterstitialAd = useCallback(({ onDismiss }: { onDismiss?: () => void }) => {
    try {
      const isAdUnsupported = GoogleAdMob?.showAppsInTossAdMob?.isSupported?.() === false;
      if (isAdUnsupported) throw new Error('unsupported');
    } catch {
      onDismiss?.();
      return;
    }

    if (!adSupported || loading) {
      onDismiss?.();
      return;
    }

    dismissCallbackRef.current = onDismiss;

    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId },
      onEvent: (event: any) => {
        switch (event.type) {
          case 'requested':
            setLoading(true);
            break;
          case 'dismissed':
            dismissCallbackRef.current?.();
            dismissCallbackRef.current = undefined;
            reloadAd();
            break;
          case 'failedToShow':
            dismissCallbackRef.current?.();
            dismissCallbackRef.current = undefined;
            break;
        }
      },
      onError: () => {
        dismissCallbackRef.current?.();
        dismissCallbackRef.current = undefined;
      },
    });
  }, [loading, adSupported, adGroupId, reloadAd]);

  return { loading, showInterstitialAd };
}

type AppScreen = 'home' | 'loading' | 'result';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    lastVisitDate: '',
    totalVisits: 0,
  });
  const { loading: adLoading, showInterstitialAd } = useInterstitialAd();

  const todayDate = new Date();
  const dateStr = `${todayDate.getFullYear()}년 ${todayDate.getMonth() + 1}월 ${todayDate.getDate()}일`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayStr = dayNames[todayDate.getDay()];

  useEffect(() => {
    const loadStreak = async () => {
      const streakData = await updateStreak();
      setStreak(streakData);
    };
    loadStreak();
  }, []);

  const handleCheckFortune = useCallback(() => {
    setScreen('loading');
    try {
      generateHapticFeedback({ type: 'softMedium' });
    } catch {}

    setTimeout(() => {
      const result = getDailyFortune(0);
      setFortuneResult(result);
      try {
        generateHapticFeedback({ type: 'softMedium' });
      } catch {}
      setScreen('result');
    }, 1800);
  }, []);

  const handleUnlockPremium = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => {
        setPremiumUnlocked(true);
        try {
          generateHapticFeedback({ type: 'softMedium' });
        } catch {}
      },
    });
  }, [showInterstitialAd]);

  const handleRefresh = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => {
        setScreen('loading');
        setPremiumUnlocked(false);

        const newCount = refreshCount + 1;
        setRefreshCount(newCount);

        setTimeout(() => {
          const result = getDailyFortune(newCount);
          setFortuneResult(result);
          try {
            generateHapticFeedback({ type: 'softMedium' });
          } catch {}
          setScreen('result');
        }, 1200);
      },
    });
  }, [showInterstitialAd, refreshCount]);

  return (
    <>
      <DeviceViewport />
      <div className="app">
        {screen === 'home' && (
          <div className="home-screen">
            <div className="home-content">
              <img src="/mascot/mascot-main.png" alt="마스코트" className="home-mascot" />
              <h1 className="home-title">오늘 어때</h1>
              <p className="home-date">{dateStr} ({dayStr})</p>
              {streak.currentStreak > 0 && (
                <div className="home-streak">
                  <img src="/mascot/streak-fire-xs.png" alt="" className="home-streak-icon" />
                  <span>{streak.currentStreak}일 연속 방문</span>
                </div>
              )}
            </div>
            <div className="home-bottom">
              <button className="btn-check-fortune" onClick={handleCheckFortune}>
                오늘의 운세 확인하기
              </button>
              <p className="home-hint">매일 새로운 운세가 기다리고 있어요</p>
            </div>
          </div>
        )}
        {screen === 'loading' && (
          <div className="loading-screen">
            <img src="/mascot/crystal-ball.png" alt="운세 보는 중" className="loading-mascot" />
            <p className="loading-text">운세를 읽고 있어요...</p>
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        {screen === 'result' && fortuneResult && (
          <ResultScreen
            result={fortuneResult}
            streak={streak}
            premiumUnlocked={premiumUnlocked}
            onUnlockPremium={handleUnlockPremium}
            onRefresh={handleRefresh}
            adLoading={adLoading}
          />
        )}
      </div>
    </>
  );
};

export default App;
