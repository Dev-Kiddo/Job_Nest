function Loader({ margin = "mx-2px", colour = "text-white", size = "6" }) {
  return (
    <div
      className={`w-${size} h-${size} animate-spin rounded-full border-2 border-solid border-current border-e-transparent text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${colour} ${margin}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  );
}

export default Loader;
