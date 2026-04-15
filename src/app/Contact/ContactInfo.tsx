import { Mail, Clock, MessageCircle, Globe } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6 justify-center">
      <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight">
        Contact <span className="text-[var(--primary-color)]">Information</span>
      </h3>

      <Info icon={<Mail />} title="Email" value="sk9414681@gmail.com" />
      <Info icon={<Clock />} title="Working Hours" value="Mon–Fri 9–18" />
      <Info icon={<MessageCircle />} title="WhatsApp" value="+91 123 456 789" />
      <Info icon={<Globe />} title="Website" value="www.mywebsite.com" />
    </div>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        group flex items-center gap-4
        p-4 rounded-lg
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        transition-all duration-300
        hover:scale-[1.02]
        hover:border-white/20
        hover:bg-white/10
      "
    >
      {/* ICON WRAPPER */}
      <div
        className="
          p-3 rounded-xl
          bg-black/30
          border border-white/10
          text-[var(--primary-color)]
          transition-all duration-300
          group-hover:text-white
          group-hover:border-white/20
        "
      >
        {icon}
      </div>

      {/* TEXT */}
      <div className="flex flex-col">
        <p className="text-xs text-gray-400 tracking-wide uppercase">{title}</p>

        <p className="text-sm font-medium text-white mt-0.5">{value}</p>
      </div>

      {/* subtle glow line */}
      <div className="ml-auto w-1 h-8 rounded-lg bg-[var(--primary-color)]/0 group-hover:bg-[var(--primary-color)] transition-all duration-300" />
    </div>
  );
}
