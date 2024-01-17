function BlackButton({ text, isInput = false, onClick, width = null }) {
  return (
    <button
      className="bg-black text-white w-fit px-5 py-2 rounded cursor-pointer"
      style={{ width: width }}
      onClick={onClick}
    >
      {isInput && (
        <input type="submit" value={text} className="cursor-pointer" />
      )}
      {!isInput && text}
    </button>
  );
}

export default BlackButton;
