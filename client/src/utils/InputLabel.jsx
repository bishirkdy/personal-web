export const inputLabel = (text, isFocused) => {
  return text.split("").map((letter, idx) => (
    <span
      key={idx}
      className={`
        inline-block transition-transform duration-300
        ${isFocused ? 'animate-slide-up' : ''}
      `}
      style={{ transitionDelay: `${idx * 50}ms` }}
    >
      {letter}
    </span>
  ));
};
