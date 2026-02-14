const Option = ({ onClick, text, disabled }) => {
  return (
    <button
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      className={`block cursor-pointer w-full text-right px-3 py-2 rounded-lg transition focus-visible:ring-2 focus-visible:ring-ring
        ${
          disabled
            ? "bg-secondary/50 text-secondary-foreground/50 cursor-not-allowed"
            : "bg-secondary text-secondary-foreground hover:opacity-90"
        }`}
    >
      {text}
    </button>
  );
};

export default Option;
