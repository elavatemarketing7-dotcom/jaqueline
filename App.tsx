
import React, { useState, useEffect, useRef } from 'react';
import { EXPERT_DATA, IMAGES, QUIZ_QUESTIONS } from './constants';
import { 
  ChevronRight, 
  MessageCircle, 
  Play, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Award, 
  Heart,
  User,
  Image as ImageIcon,
  Instagram,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- Sub-components ---

const FloatingWA = () => (
  <a 
    href={EXPERT_DATA.whatsapp} 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl animate-bounce md:hidden"
  >
    <MessageCircle size={32} />
  </a>
);

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="w-full bg-white/10 h-1.5 rounded-full mb-8 overflow-hidden">
    <div 
      className="gold-gradient h-full transition-all duration-500 ease-out" 
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

// --- Main Views ---

const WelcomeView = ({ onStartQuiz, onGoToSite }: { onStartQuiz: () => void, onGoToSite: () => void }) => (
  <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
    {/* Background layer with high-impact image */}
    <div className="absolute inset-0 z-0">
      <div 
        className="absolute inset-0 bg-cover bg-[center_top] scale-105 animate-[slowZoom_20s_infinite_alternate]" 
        style={{ backgroundImage: `url(${IMAGES.hero})` }} 
      />
      {/* Premium Gradients for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
    </div>
    
    <div className="relative z-10 flex flex-col h-full justify-between pt-12 pb-16 px-8 max-w-lg mx-auto w-full flex-1">
      {/* Header element */}
      <div className="text-center space-y-2 animate-[fadeInDown_1s_ease-out]">
        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase block mb-1">Exclusive Experience</span>
        <h2 className="font-signature text-5xl text-white opacity-90">{EXPERT_DATA.name}</h2>
      </div>

      {/* Center Content / Call to Action area */}
      <div className="space-y-8 animate-[fadeInUp_1s_ease-out]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Sparkles size={14} className="text-gold" />
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Harmonização Facial de Luxo</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] text-white">
            Onde a ciência e a <span className="italic text-gold">arte se encontram</span> para revelar você.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            Descubra o plano personalizado ideal para realçar sua beleza natural com exclusividade.
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
          <button 
            onClick={onStartQuiz}
            className="w-full gold-gradient text-black font-bold py-6 rounded-2xl shadow-[0_15px_40px_rgba(197,160,89,0.3)] flex items-center justify-center gap-3 group transition-all active:scale-95"
          >
            INICIAR AVALIAÇÃO EXCLUSIVA
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onGoToSite}
            className="w-full text-white/60 hover:text-white font-medium py-2 text-sm transition-all tracking-widest uppercase flex items-center justify-center gap-2"
          >
            Acessar o site oficial
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>

    <style>{`
      @keyframes slowZoom {
        from { transform: scale(1); }
        to { transform: scale(1.15); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

const QuizView = ({ onComplete }: { onComplete: (results: string[]) => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setAnalyzing(true);
      setTimeout(() => onComplete(newAnswers), 3000);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-black text-center">
        <div className="w-24 h-24 mb-8 relative">
           <div className="absolute inset-0 border-4 border-[#c5a059]/20 rounded-full" />
           <div className="absolute inset-0 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
           <img src={IMAGES.hero} className="w-16 h-16 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover" />
        </div>
        <h2 className="text-2xl font-serif mb-2">Analisando suas respostas...</h2>
        <p className="text-gray-400">Dra. Jaqueline está avaliando seu perfil.</p>
        <div className="mt-8 w-64 bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="gold-gradient h-full animate-[loading_3s_ease-in-out_infinite]" style={{ width: '100%' }} />
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 relative overflow-hidden flex flex-col px-6 py-12">
      <div className="absolute top-10 left-10 opacity-20 hidden md:block">
        <span className="font-serif text-6xl text-white/5 whitespace-nowrap">{EXPERT_DATA.name}</span>
      </div>

      <div className="max-w-md mx-auto w-full relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#c5a059] overflow-hidden p-0.5 animate-float">
              <img src={IMAGES.hero} className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-black" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-widest text-gold uppercase">{EXPERT_DATA.name}</h4>
            <p className="text-xs text-gray-400">Avaliação exclusiva em andamento</p>
          </div>
        </div>

        <ProgressBar current={step + 1} total={QUIZ_QUESTIONS.length} />

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 leading-tight">
            {QUIZ_QUESTIONS[step].question}
          </h2>

          <div className="space-y-4">
            {QUIZ_QUESTIONS[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className="w-full glass-effect text-left p-6 rounded-2xl hover:border-[#c5a059]/50 transition-all active:scale-95 flex justify-between items-center group"
              >
                <span className="text-gray-200 font-medium">{opt}</span>
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold">
                   <div className="w-2 h-2 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Passo {step + 1} de {QUIZ_QUESTIONS.length}</p>
        </div>
      </div>
    </div>
  );
};

const ResultView = ({ onGoToSite }: { onGoToSite: () => void }) => {
  const handleWACall = (type: string) => {
    const text = `Olá Dra. Jaqueline, acabei de realizar o quiz e meu perfil deu COMPATÍVEL! Gostaria de ${type}.`;
    window.open(`${EXPERT_DATA.whatsapp}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#c5a059]/5 blur-[120px] rounded-full -top-20 -left-20" />
      
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[40px] p-8 relative z-10 text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-[#c5a059] shadow-2xl mx-auto rotate-3">
              <img src={IMAGES.hero} className="w-full h-full object-cover" alt="Dra. Jaqueline" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold text-black p-2 rounded-xl shadow-lg font-bold text-xs uppercase tracking-tighter">
              Aprovado ✓
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <span className="bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
            Perfil Compatível
          </span>
          <h1 className="text-3xl font-serif">Você é a Paciente ideal.</h1>
          <p className="text-gray-400 text-sm leading-relaxed px-4">
            Com base nas suas respostas, o Método da <span className="text-white font-semibold">Dra. Jaqueline Guimarães</span> consegue entregar exatamente a naturalidade e segurança que você procura.
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => handleWACall('enviar minha avaliação')}
            className="w-full gold-gradient text-black font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 animate-pulse"
          >
            1 - Enviar minha avaliação a Dra.
          </button>
          <button 
            onClick={() => handleWACall('chamar sem compromisso')}
            className="w-full bg-white/10 text-white font-bold py-5 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            2 - Chamar no WhatsApp sem compromisso
          </button>
          <button 
            onClick={onGoToSite}
            className="w-full text-gray-500 font-medium py-4 text-sm underline underline-offset-4"
          >
            3 - Não enviar e continuar no site
          </button>
        </div>
      </div>
    </div>
  );
};

const MainSite = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const NavItems = () => (
    <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
      <button onClick={() => scrollTo('hero')} className="hover:text-gold transition-colors">Início</button>
      <button onClick={() => scrollTo('sobre')} className="hover:text-gold transition-colors">Sobre Mim</button>
      <button onClick={() => scrollTo('resultados')} className="hover:text-gold transition-colors">Prova Visual</button>
      <button onClick={() => scrollTo('metodo')} className="hover:text-gold transition-colors">Harmonização de <span className="text-gold">❤</span></button>
      <button onClick={() => scrollTo('contato')} className="hover:text-gold transition-colors">Onde nos Encontrar</button>
    </div>
  );

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      {/* Navigation Logradouro - Premium Infinite Marquee */}
      <nav className="sticky top-0 z-50 glass-effect py-5 overflow-hidden border-b border-white/5">
        <div className="flex animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          <div className="flex items-center gap-12 px-6">
            <NavItems />
            <NavItems />
            <NavItems />
            <NavItems />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 gold-gradient opacity-10 blur-[100px]" />
            <h4 className="text-gold font-bold tracking-[0.3em] uppercase mb-4">Bem-vinda ao Exclusivo</h4>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-none">
              Sou a <span className="italic block mt-2 underline decoration-[#c5a059]/30">Dra. Jaqueline.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-md leading-relaxed">
              Resgatando sua melhor versão através de uma harmonização facial sensível, técnica e focada na sua naturalidade.
            </p>
            <div className="space-y-4">
              <a 
                href={EXPERT_DATA.whatsapp}
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 gold-gradient text-black font-bold rounded-2xl shadow-[0_20px_40px_rgba(197,160,89,0.2)] hover:scale-105 transition-all"
              >
                Agendar consulta gratuita no WhatsApp
                <MessageCircle size={20} />
              </a>
              <p className="text-xs text-gray-500 text-center md:text-left">*Sem compromisso inicial</p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
             <div className="relative z-10 rounded-[60px] overflow-hidden border-2 border-white/5">
                <img src={IMAGES.hero} alt="Dra. Jaqueline" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
             <div className="absolute -bottom-6 -right-6 md:-bottom-12 md:-right-12 z-20 glass-effect p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="bg-gold/20 p-3 rounded-full"><Award className="text-gold" /></div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Referência em</p>
                    <p className="font-serif text-lg italic">Naturalidade</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="relative group rounded-[40px] overflow-hidden shadow-2xl cursor-pointer"
            onClick={toggleMute}
          >
            <video 
              ref={videoRef}
              src={EXPERT_DATA.videoUrl} 
              autoPlay 
              muted={isMuted} 
              loop 
              playsInline 
              className="w-full aspect-[9/16] object-cover"
            />
            {/* Audio Toggle indicator - Discretely placed for premium look */}
            <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 transition-opacity">
               {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
            </div>
            <div className="absolute top-6 left-6 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
               <p className="text-[10px] font-bold uppercase tracking-widest text-white">Toque para {isMuted ? 'ativar' : 'desativar'} o som</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-8 leading-tight italic">
              Descubra como a beleza pode ser realçada com técnica e propósito.
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Resultados naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial.
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <p className="text-3xl text-gold font-serif">500+</p>
                 <p className="text-xs text-gray-500 uppercase tracking-widest">Procedimentos realizados</p>
               </div>
               <div className="space-y-2">
                 <p className="text-3xl text-gold font-serif">100%</p>
                 <p className="text-xs text-gray-500 uppercase tracking-widest">Atendimento personalizado</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Sou Eu */}
      <section id="sobre" className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="rounded-[40px] overflow-hidden aspect-square">
                <img src={IMAGES.authority1} className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-[#c5a059]/20 rounded-full -z-10" />
          </div>
          <div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Sua Especialista</span>
            <h2 className="text-4xl font-serif mt-4 mb-8 italic">Prazer, sou a Jaqueline.</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>Minha missão é muito mais que injetar produtos; é restaurar a confiança de mulheres que buscam se sentir bonitas de forma autêntica.</p>
              <p>Acredito que cada rosto tem uma história e meu papel é realçar os pontos fortes sem apagar a essência. Aqui, você não encontrará resultados "padronizados", mas sim uma harmonização feita exclusivamente para você.</p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Biomédica Esteta com foco em anatomia facial",
                  "Especialista em resultados de alta naturalidade",
                  "Atendimento humanizado e individualizado",
                  "Uso das melhores tecnologias e produtos do mercado"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold mt-1 shrink-0" size={18} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Reais */}
      <section id="resultados" className="py-24 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 italic text-gold">Resultados Reais</h2>
            <p className="text-gray-500 max-w-xl mx-auto uppercase tracking-widest text-xs">Transformações que respeitam a sua individualidade</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {IMAGES.results.map((src, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square border border-white/5 bg-white/5 transition-all hover:scale-[1.02]">
                <img src={src} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-zoom-in">
                   <ImageIcon className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center text-xs text-gray-600">
            *Resultados podem variar de pessoa para pessoa. Fotos autorizadas.
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
             {[
               { icon: <Heart size={32} />, title: "Avaliação Honesta", desc: "Só indico o que você realmente precisa." },
               { icon: <ShieldCheck size={32} />, title: "Segurança Total", desc: "Protocolos rigorosos e técnica avançada." },
               { icon: <User size={32} />, title: "Atendimento Comigo", desc: "Do início ao fim, você fala diretamente comigo." },
               { icon: <Smartphone size={32} />, title: "Suporte VIP", desc: "Acompanhamento pós-procedimento dedicado." }
             ].map((item, i) => (
               <div key={i} className="glass-effect p-8 rounded-[30px] border border-white/10 hover:border-gold/30 transition-all">
                 <div className="text-gold mb-6">{item.icon}</div>
                 <h3 className="text-xl font-serif mb-3 italic">{item.title}</h3>
                 <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif mb-16 italic">Sua Jornada até o Resultado Ideal</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent -z-10" />
             {[
               { step: "01", title: "Primeiro Contato", desc: "Clique no botão e fale comigo via WhatsApp." },
               { step: "02", title: "Agendamento", desc: "Escolhemos o melhor horário para sua consulta." },
               { step: "03", title: "Avaliação & Procedimento", desc: "Criamos seu plano personalizado e executamos com arte." }
             ].map((step, i) => (
               <div key={i} className="relative group">
                 <div className="w-16 h-16 bg-black border-2 border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 text-gold font-bold group-hover:bg-gold group-hover:text-black transition-all">
                    {step.step}
                 </div>
                 <h4 className="text-xl font-serif mb-3 italic">{step.title}</h4>
                 <p className="text-sm text-gray-400">{step.desc}</p>
               </div>
             ))}
          </div>
          <div className="mt-16">
             <a 
              href={EXPERT_DATA.whatsapp}
              className="inline-flex items-center justify-center gap-3 px-12 py-6 gold-gradient text-black font-bold rounded-2xl shadow-xl hover:scale-105 transition-all"
             >
              COMEÇAR MINHA TRANSFORMAÇÃO
              <ArrowRight size={20} />
             </a>
          </div>
        </div>
      </section>

      {/* Harmonização de Coração (Lifestyle) */}
      <section id="metodo" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl font-serif italic text-gold">Harmonização de <span className="text-white">❤</span></h2>
            <p className="text-gray-400 max-w-sm text-sm">Um olhar sensível sobre os bastidores e o dia a dia de quem ama o que faz.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {IMAGES.lifestyle.map((src, i) => (
               <div key={i} className="rounded-2xl overflow-hidden aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-500">
                 <img src={src} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Comentários */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Relatos de Gratidão</h2>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
            {IMAGES.testimonials.map((src, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[350px] snap-center rounded-[30px] overflow-hidden border border-white/5">
                <img src={src} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onde nos Encontrar / Mapa */}
      <section id="contato" className="py-24 bg-white/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-8 italic">Onde estamos</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-gold/10 rounded-2xl text-gold"><MapPin size={32} /></div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-1">Endereço</p>
                    <p className="text-xl font-serif italic">{EXPERT_DATA.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-gold/10 rounded-2xl text-gold"><Instagram size={32} /></div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-1">Instagram</p>
                    <a href={EXPERT_DATA.instagram} target="_blank" rel="noreferrer" className="text-xl font-serif italic hover:text-gold transition-colors">@drajaquelineguimaraes</a>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <a href={EXPERT_DATA.whatsapp} className="inline-block w-full py-5 gold-gradient text-black font-bold rounded-2xl text-center shadow-lg">SOLICITAR LOCALIZAÇÃO NO WHATSAPP</a>
              </div>
            </div>
            <div className="h-[400px] rounded-[40px] overflow-hidden border border-white/10 relative grayscale invert">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14197.69769399478!2d-49.0064784!3d-28.473531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9521369792e3a637%3A0xe54959194f4c28f3!2sTubar%C3%A3o%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-signature text-6xl text-gold mb-4 leading-none">{EXPERT_DATA.name}</h2>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">{EXPERT_DATA.role}</p>
          <p className="text-gray-600 text-xs mt-2">{EXPERT_DATA.crbm}</p>
          
          <div className="flex justify-center gap-6 mt-10 mb-10">
            <a href={EXPERT_DATA.instagram} className="p-3 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all"><Instagram size={20} /></a>
            <a href={EXPERT_DATA.whatsapp} className="p-3 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all"><MessageCircle size={20} /></a>
          </div>
          
          <p className="text-[10px] text-gray-700 uppercase tracking-widest">
            © {new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </div>
      </footer>

      <FloatingWA />
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'quiz' | 'result' | 'main'>('welcome');

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-black">
      {currentView === 'welcome' && (
        <WelcomeView 
          onStartQuiz={() => setCurrentView('quiz')} 
          onGoToSite={() => setCurrentView('main')} 
        />
      )}
      {currentView === 'quiz' && (
        <QuizView 
          onComplete={() => setCurrentView('result')} 
        />
      )}
      {currentView === 'result' && (
        <ResultView 
          onGoToSite={() => setCurrentView('main')} 
        />
      )}
      {currentView === 'main' && <MainSite />}
    </div>
  );
}
