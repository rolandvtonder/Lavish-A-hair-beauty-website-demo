import {useEffect, useState, type CSSProperties} from 'react';
import {brand, media} from '../content';
import {wait} from '../lib/math';
import {registerCurtain} from '../lib/router';

type Phase = 'idle' | 'cover' | 'reveal';

/** Slab travel time; keep in step with the duration class below. */
const WIPE = 700;
/** Gap between the gold slab and the ink slab. */
const STAGGER = 90;

/**
 * The page transition: a gold slab then an ink slab (carrying the logo) wipe
 * across from the right; the page swaps behind them; then they carry on out
 * to the left, ink first. The same wipe as the menu, at full width.
 */
export function Curtain({enabled}: {enabled: boolean}) {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (!enabled) {
      registerCurtain(null);
      return;
    }
    registerCurtain({
      cover: async () => {
        setPhase('cover');
        await wait(WIPE + STAGGER + 60);
      },
      reveal: async () => {
        await wait(140);
        setPhase('reveal');
        await wait(WIPE + STAGGER + 40);
        setPhase('idle');
      },
    });
    return () => registerCurtain(null);
  }, [enabled]);

  const pos = phase === 'cover' ? 'translate-x-0' : phase === 'reveal' ? '-translate-x-full' : 'translate-x-full';
  // Idle snaps back to the right with no transition, ready for the next wipe.
  const motion = phase === 'idle' ? 'transition-none' : 'transition-transform duration-[700ms] ease-wipe';
  const delay = (k: number): CSSProperties => ({transitionDelay: `${(phase === 'cover' ? k : 1 - k) * STAGGER}ms`});

  return (
    <div aria-hidden className={`fixed inset-0 z-[58] overflow-hidden ${phase === 'idle' ? 'pointer-events-none' : ''}`}>
      <div className={`gilt-bg absolute inset-0 ${pos} ${motion}`} style={delay(0)} />
      <div className={`absolute inset-0 flex items-center justify-center bg-ink ${pos} ${motion}`} style={delay(1)}>
        <div className={`flex flex-col items-center gap-5 transition-opacity duration-500 ${phase === 'cover' ? 'opacity-100 delay-300' : 'opacity-0'}`}>
          <img src={media('logo.jpg')} alt="" className="size-24 rounded-full shadow-[0_0_60px_rgb(201_162_74/0.25)]" />
          <span className="display gilt text-[22px] tracking-[0.3em]">{brand.name}</span>
        </div>
      </div>
    </div>
  );
}
