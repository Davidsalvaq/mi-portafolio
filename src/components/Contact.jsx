import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { AnimatedSection, AnimatedItem, AnimatedFade } from './AnimatedSection'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

const SERVICE_ID = 'service_q4ynfne'
const TEMPLATE_ID = 'template_yasa00j'
const PUBLIC_KEY = '2Zv6CPcCglG4ME_ez'

const t = {
  es: {
    label: 'Contacto',
    title1: 'Hablemos.',
    title2: 'Construyamos.',
    sub: '¿Tienes un proyecto en mente o quieres colaborar? Estoy disponible.',
    formLabel: 'Envíame un mensaje',
    name: 'Tu nombre',
    email: 'Tu correo',
    message: 'Tu mensaje',
    tooltip: 'Asegúrate de que tu correo sea válido para que pueda contactarte.',
    btn: 'Enviar mensaje',
    sending: 'Enviando...',
    success: '✓ Mensaje enviado correctamente.',
    error: '✗ Error al enviar. Intenta de nuevo.',
    links: [
      { name: 'GitHub', handle: 'Davidsalvaq', url: 'https://github.com/Davidsalvaq' },
      { name: 'LinkedIn', handle: 'David Quijada', url: 'https://www.linkedin.com/in/david-quijada-242775380/' },
      { name: 'Instagram', handle: '@davi_sqg', url: 'https://www.instagram.com/davi_sqg/' },
    ]
  },
  en: {
    label: 'Contact',
    title1: "Let's talk.",
    title2: "Let's build.",
    sub: 'Have a project in mind or want to collaborate? I am available.',
    formLabel: 'Send me a message',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    tooltip: 'Make sure your email is valid so I can get back to you.',
    btn: 'Send message',
    sending: 'Sending...',
    success: '✓ Message sent successfully.',
    error: '✗ Error sending. Please try again.',
    links: [
      { name: 'GitHub', handle: 'Davidsalvaq', url: 'https://github.com/Davidsalvaq' },
      { name: 'LinkedIn', handle: 'David Quijada', url: 'https://www.linkedin.com/in/david-quijada-242775380/' },
      { name: 'Instagram', handle: '@davi_sqg', url: 'https://www.instagram.com/davi_sqg/' },
    ]
  }
}

function Contact() {
  const formRef = useRef()
  const { lang } = useLang()
  const tx = t[lang]
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('')
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        <div>
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#c9a96e]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">{tx.label}</span>
            </div>
            <h2 className="font-black leading-none tracking-tight mb-6" style={{fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 3vw, 60px)'}}>
              {tx.title1}<br />
              <span className="text-transparent block" style={{WebkitTextStroke: '1px rgba(240,236,228,0.2)'}}>{tx.title2}</span>
            </h2>
            <p className="text-[#6b6760] text-sm leading-loose mb-10">{tx.sub}</p>
          </AnimatedSection>

          <div className="flex flex-col">
            {tx.links.map(({ name, handle, url }, i) => (
              <AnimatedItem key={name} delay={i * 0.1}>
                <motion.a
                  href={url}
                  target="_blank"
                  className="flex justify-between items-center py-5 border-b border-[#1e1e1e]"
                  whileHover={{ paddingLeft: '12px' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm text-white">{name}</span>
                  <motion.span className="text-xs uppercase tracking-widest text-[#6b6760]" whileHover={{ color: '#e8d5b0' }}>
                    {handle} →
                  </motion.span>
                </motion.a>
              </AnimatedItem>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="bg-[#161616] border border-[#1e1e1e] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.15em] text-[#6b6760] mb-6">{tx.formLabel}</p>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required name="from_name" placeholder={tx.name} value={form.from_name}
                onChange={e => setForm({...form, from_name: e.target.value})}
                className="bg-[#0a0a0a] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#3a3a3a]"
              />
              <div className="relative">
                <input
                  required type="email" name="from_email" placeholder={tx.email} value={form.from_email}
                  onChange={e => setForm({...form, from_email: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-[#1e1e1e] px-4 py-3 pr-10 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#3a3a3a]"
                />
                <button type="button"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                  onClick={() => setTooltipVisible(!tooltipVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-[#3a3a3a] text-[#6b6760] text-xs flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200"
                >?</button>
                {tooltipVisible && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-3 text-xs text-[#a0a0a0] leading-relaxed shadow-xl">
                    {tx.tooltip}
                  </motion.div>
                )}
              </div>
              <textarea
                required name="message" placeholder={tx.message} value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                rows={5}
                className="bg-[#0a0a0a] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#3a3a3a] resize-none"
              />
              <motion.button type="submit" disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-colors duration-200 w-fit disabled:opacity-50">
                {status === 'sending' ? tx.sending : tx.btn}
                {status !== 'sending' && (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </motion.button>
              {status === 'success' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-400 uppercase tracking-widest">{tx.success}</motion.p>}
              {status === 'error' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 uppercase tracking-widest">{tx.error}</motion.p>}
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default Contact