const ThumbsDown = ({
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
      <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
    </svg>
  );
};

export default ThumbsDown;
