const AlertCircle = ({
  width = 24,
  height = 24,
  color = "var(--geist-foreground)",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color }}
    >
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)" />
      <path d="M12 8v4" stroke="var(--geist-stroke)" />
      <path d="M12 16h.01" stroke="var(--geist-stroke)" />
    </svg>
  );
};

export default AlertCircle;
