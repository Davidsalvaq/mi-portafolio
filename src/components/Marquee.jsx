function Marquee() {
  const items = ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express', 'Git', 'JavaScript', 'Vite', 'REST APIs', 'TypeScript']

  const Row = () => (
    <div className="flex shrink-0 gap-8 pr-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-[#6b6760]">
          {item}
          <span className="text-[#c9a96e]">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="border-y border-[#1e1e1e] py-4 overflow-hidden bg-[#0a0a0a]">
        <div className="flex" style={{animation: 'marquee 25s linear infinite'}}>
          <Row />
          <Row />
          <Row />
          <Row />
        </div>
      </div>
    </>
  )
}

export default Marquee