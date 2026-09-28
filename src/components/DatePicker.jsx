import { useEffect, useMemo, useRef, useState } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getLocalToday } from '../utils/dateInput';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const toDateValue = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
].join('-');

const formatDate = (value) => {
  if (!value) return 'dd-mm-yyyy';
  const [year, month, day] = value.split('-');
  return `${day}-${month}-${year}`;
};

const buildCalendarDays = (monthDate) => {
  const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
};

const DatePicker = ({ name = 'date', value = '', onChange, theme = 'light', ariaLabel = 'Select date' }) => {
  const pickerRef = useRef(null);
  const selectedDate = parseDate(value);
  const todayValue = getLocalToday();
  const today = parseDate(todayValue);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate || today);
  const isDark = theme === 'dark';

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const visibleMonthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const canGoBack = visibleMonthStart > currentMonthStart;

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

  const openPicker = () => {
    setVisibleMonth(selectedDate || today);
    setIsOpen((open) => !open);
  };

  const changeMonth = (offset) => {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1));
  };

  const selectDate = (date) => {
    const nextValue = toDateValue(date);
    if (nextValue < todayValue) return;
    onChange?.(nextValue);
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
        aria-label={value ? `${ariaLabel}: ${formatDate(value)}` : ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={openPicker}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:border-[#C9A227] ${fieldClasses}`}
      >
        <span className={value ? '' : isDark ? 'text-white/55' : 'text-[#5A5A66]'}>{formatDate(value)}</span>
        <FiCalendar className="shrink-0 text-[#C9A227]" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose a booking date"
          className={`absolute left-0 z-[80] mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border p-4 ${surfaceClasses}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              disabled={!canGoBack}
              onClick={() => changeMonth(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#C9A227] transition-colors hover:bg-[#C9A227]/15 disabled:cursor-not-allowed disabled:opacity-20"
            >
              <FiChevronLeft aria-hidden="true" />
            </button>
            <p className="font-serif text-lg tracking-wide">
              {visibleMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#C9A227] transition-colors hover:bg-[#C9A227]/15"
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
            {WEEKDAYS.map((day) => <span key={day} className="py-2">{day}</span>)}
          </div>

          <div className="grid grid-cols-7 place-items-center gap-y-1">
            {calendarDays.map((date) => {
              const dateValue = toDateValue(date);
              const isPast = dateValue < todayValue;
              const isSelected = dateValue === value;
              const isToday = dateValue === todayValue;
              const isOutsideMonth = date.getMonth() !== visibleMonth.getMonth();

              return (
                <button
                  key={dateValue}
                  type="button"
                  disabled={isPast}
                  aria-label={date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  aria-current={isToday ? 'date' : undefined}
                  onClick={() => selectDate(date)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                    isSelected
                      ? 'bg-[#C9A227] font-semibold text-[#0C0922]'
                      : isPast
                        ? 'cursor-not-allowed opacity-20'
                        : 'hover:bg-[#C9A227]/15 hover:text-[#C9A227]'
                  } ${isOutsideMonth && !isSelected ? 'opacity-40' : ''} ${isToday && !isSelected ? 'ring-1 ring-inset ring-[#C9A227]/70' : ''}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className={`mt-4 flex items-center justify-between border-t pt-3 text-xs ${isDark ? 'border-white/10' : 'border-[#5A5A66]/15'}`}>
            <span className={isDark ? 'text-white/55' : 'text-[#5A5A66]'}>Past dates are unavailable</span>
            <button type="button" onClick={() => selectDate(today)} className="font-semibold uppercase tracking-[0.12em] text-[#C9A227]">
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
