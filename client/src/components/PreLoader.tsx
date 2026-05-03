function PreLoader() {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div role="status" className="w-10 h-10 rounded-full bg-blue-600 relative">
        <div className="absolute w-full h-full bg-blue-300 rounded-full animate-ping"></div>
        <div className="absolute w-full h-full bg-gray-300 rounded-full animate-ping delay-200"></div>
        <span className="sr-only">Loading…</span>
      </div>
    </section>
  );
}

export default PreLoader;
