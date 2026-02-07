import React, { useState, useCallback, useEffect } from 'react';
import { GoogleAdMob, generateHapticFeedback } from '@apps-in-toss/web-framework';
import { FortuneResult, StreakData } from './types';
import { getDailyFortune } from './utils/fortune-engine';
import { getStreakData, updateStreak } from './utils/storage';
import { DeviceViewport } from './components/DeviceViewport';
import ResultScreen from './components/ResultScreen';

const AD_GROUP_ID = 'ait-ad-test-interstitial-id';

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

type AppScreen = 'loading' | 'result';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('loading');
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    lastVisitDate: '',
    totalVisits: 0,
  });
  const { loading: adLoading, showInterstitialAd } = useInterstitialAd();

  // Initial load: show loading then reveal fortune
  useEffect(() => {
    const loadFortune = async () => {
      // Update streak
      const streakData = await updateStreak();
      setStreak(streakData);

      // Get today's fortune
      const result = getDailyFortune();
      setFortuneResult(result);

      // Show loading animation briefly
      setTimeout(() => {
        try {
          generateHapticFeedback({ type: 'softMedium' });
        } catch {}
        setScreen('result');
      }, 1500);
    };

    loadFortune();
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

        // Re-generate with slight delay for animation
        setTimeout(() => {
          const result = getDailyFortune();
          setFortuneResult(result);
          try {
            generateHapticFeedback({ type: 'softMedium' });
          } catch {}
          setScreen('result');
        }, 1200);
      },
    });
  }, [showInterstitialAd]);

  return (
    <>
      <DeviceViewport />
      <div className="app">
        {screen === 'loading' && (
          <div className="loading-screen">
            <div className="loading-orb"></div>
            <p className="loading-text">오늘의 운세를 읽고 있어요...</p>
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
