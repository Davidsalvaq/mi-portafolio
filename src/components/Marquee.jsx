function Marquee() {
  const items = ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express', 'Git', 'JavaScript', 'Java', 'C++', 'Vite']

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
        .marquee-track {
          animation: marquee 25s linear infinite;
        }
        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 15s;
          }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="border-y border-[#1e1e1e] py-4 overflow-hidden bg-[#0a0a0a]">
        <div className="marquee-track flex">
          <Row /><Row /><Row /><Row />
        </div>
      </div>
    </>
  )
}

export default Marquee