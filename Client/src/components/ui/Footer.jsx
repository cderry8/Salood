import { salonInfo } from '../../data/mockData'

function Footer() {
  return (
    <footer className="mx-auto mt-14 w-[95%] max-w-6xl rounded-2xl border border-white/10 bg-black/40 p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{salonInfo.name}</h3>
          <p className="mt-3 text-sm text-slate-300">{salonInfo.address}</p>
          <p className="mt-1 text-sm text-slate-300">Call: {salonInfo.phone}</p>
          <p className="text-sm text-slate-300">Email: {salonInfo.email}</p>
          <div className="mt-3 flex gap-3 text-sm">
            {salonInfo.socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10">
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Working Hours</h4>
          <p className="mt-3 text-sm text-slate-300">Mon - Fri: 08:00 - 20:00</p>
          <p className="text-sm text-slate-300">Saturday: 09:00 - 19:00</p>
          <p className="text-sm text-slate-300">Sunday: 10:00 - 17:00</p>
          <p className="mt-3 text-sm text-slate-300">Emergency Support: +250 788 123 456</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Find Us</h4>
          <iframe
            title="Salood map"
            src="https://maps.google.com/maps?q=Kigali%20Rwanda&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="mt-3 h-40 w-full rounded-xl border border-white/10"
            loading="lazy"
          />
        </div>
      </div>
      <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
        © {new Date().getFullYear()} Salood. Premium salon booking experience.
      </p>
    </footer>
  )
}

export default Footer
