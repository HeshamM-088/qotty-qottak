const Bubble = ({ text }) => {
  return (
    <div className="bg-muted text-foreground font-bold p-3 rounded-lg w-fit max-w-[90%] animate-fade">
      {text}
    </div>
  );
};

export default Bubble;
