// src/components/motion/FadeUp.jsx
import Reveal from './Reveal';
import { DURATION } from '../../utils/motion';

const Y_MAP = {
  heading:  { desktop: 50, mobile: 25 },
  subtitle: { desktop: 25, mobile: 15 },
  cta:      { desktop: 25, mobile: 15 },
  text:     { desktop: 40, mobile: 20 },
};

export default function FadeUp({
  size = 'text',
  delay = 0,
  duration = DURATION.normal,
  as = 'div',
  children,
  ...rest
}) {
  const preset = Y_MAP[size] || Y_MAP.text;

  return (
    <Reveal
      y={preset.desktop}
      yMobile={preset.mobile}
      delay={delay}
      duration={duration}
      as={as}
      {...rest}
    >
      {children}
    </Reveal>
  );
}