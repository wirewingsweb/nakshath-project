// src/components/TimePicker.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiClock, FiChevronDown } from 'react-icons/fi';
import { EASE_SECONDARY, DURATION } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const formatTime = (value) => {
  if (!value) return 'Choose a time slot';
  const [hourText, minute] = value.split(':');
  const hour = Number(hourText);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${period}`;
};

const createSlots = (startHour, endHour) => {
  const slots = [];
  for (let minutes = startHour * 60; minutes < endHour * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
  }
  return slots;
};

const TIME_GROUPS = [
  { label: 'Morning', slots: createSlots(6, 10) },
  { label: 'Afternoon', slots: createSlots(10, 16) },
  { label: 'Evening', slots: createSlots(16, 19) },
];

// ─── Variants ────────────────────────────────────────────────

const popoverVariants = (prefersReduced) => ({
  hidden: {
    opacity: 0,
    scale: prefersReduced ? 1 : 0.98,
    y: prefersReduced ? 0 : -4,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : DURATION.popover,
      ease: EASE_SECONDARY,
    },
  },
  exit: {
    opacity: 0,
    scale: prefersReduced ? 1 : 0.98,
    y: prefersReduced ? 0 : -4,
    transition: {
      duration: prefersReduced ? 0 : DURATION.popover,
      ease: EASE_SECONDARY,
    },
  },
});

// ─── Component ───────────────────────────────────────────────

const TimePicker = ({
  name = 'time',
  value = '',
  onChange,
  theme = 'light',
  ariaLabel = 'Select time',
}) => {
  const pickerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === 'dark';
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideInteraction = (event) => {
      if (!pickerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideInteraction);
    document.addEventListener('keydown', closeOnEscape, true);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideInteraction);
      document.removeEventListener('keydown', closeOnEscape, true);
    };
  }, [isOpen]);

  const selectTime = (time) => {
    onChange?.(time);
    setIsOpen(false);
  };

  const surfaceClasses = isDark
    ? 'border-[#C9A227]/55 bg-[#0C0922] text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)]'
    : 'border-[#C9A227]/35 bg-[#FDFCFA] text-[#1A1A1A] shadow-[0_24px_60px_rgba(12,9,34,0.2)]';
  const fieldClasses = isDark
    ? 'border-white/20 bg-[#0C0922] text-white hover:border-[#C9A227]/70'
    : 'border-[#5A5A66]/25 bg-white text-[#1A1A1A] hover:border-[#C9A227]/70';

  return (
    <div ref={pickerRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-label={value ? `${ariaLabel}: ${formatTime(value)}` : ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:border-[#C9A227] ${fieldClasses}`}
      >
        <span className="flex items-center gap-3">
          <FiClock className="shrink-0 text-[#C9A227]" aria-hidden="true" />
          <span className={value ? '' : isDark ? 'text-white/55' : 'text-[#5A5A66]'}>
            {formatTime(value)}
          </span>
        </span>
        <FiChevronDown
          className={`shrink-0 text-[#C9A227] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Available trial ride times"
            className={`modal-scrollbar absolute left-0 z-[80] mt-2 max-h-[19rem] w-full overflow-y-auto rounded-2xl border p-3 ${surfaceClasses}`}
            variants={popoverVariants(prefersReduced)}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              transformOrigin: 'top left',
              willChange: 'transform, opacity',
            }}
          >
            {TIME_GROUPS.map((group) => (
              <div key={group.label} className="mb-3 last:mb-0">
                <p className="px-2 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {group.slots.map((time) => {
                    const isSelected = time === value;
                    return (
                      <button
                        key={time}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => selectTime(time)}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                          isSelected
                            ? 'bg-[#C9A227] font-semibold text-[#0C0922]'
                            : 'hover:bg-[#C9A227]/15 hover:text-[#C9A227]'
                        }`}
                      >
                        <span>{formatTime(time)}</span>
                        {isSelected && <FiCheck aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimePicker;