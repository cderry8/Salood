import { Link } from 'react-router-dom'
import FloatingStack from '../../components/3d/FloatingStack'
import ServiceCard from '../../components/cards/ServiceCard'
import TestimonialCard from '../../components/cards/TestimonialCard'
import GlowButton from '../../components/ui/GlowButton'
import PageMotion from '../../components/ui/PageMotion'
import { salonGallery, services, team, testimonials } from '../../data/mockData'

function LandingPage() {
  return (
    <PageMotion>
      <section className="grid items-center gap-8 py-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Premium salon in Kigali</p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-6xl">
            Elevate beauty routines with <span className="gradient-text">Salood</span>
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Book services, pay instantly, and manage your beauty journey with a premium 3D-inspired experience.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/services">
              <GlowButton>Book Now</GlowButton>
            </Link>
            <Link to="/services">
              <button type="button" className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
        <FloatingStack />
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <img
          src={salonGallery[0]}
          alt="Salon interior"
          className="h-80 w-full rounded-2xl border border-white/15 object-cover"
        />
        <div className="rounded-2xl border border-white/15 bg-black/40 p-6">
          <h2 className="text-2xl font-semibold text-white">About Salood</h2>
          <p className="mt-3 text-slate-300">
            Salood is a modern beauty and grooming studio focused on premium service, smooth bookings,
            and trusted specialists. We combine design, comfort, and consistency to give every client a
            memorable in-salon experience.
          </p>
          <p className="mt-3 text-slate-300">
            From haircut and styling to spa and nail care, every service is crafted for quality.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-semibold text-white">Services Preview</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl p-6 glass">
        <h2 className="text-2xl font-semibold text-white">How it works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {['Book', 'Pay', 'Get Ticket'].map((item, index) => (
            <div key={item} className="rounded-xl border border-white/15 bg-slate-950/40 p-4">
              <p className="text-xs text-slate-300">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item}</h3>
              <p className="mt-2 text-sm text-slate-300">Simple and smooth flow with zero friction.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-semibold text-white">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-semibold text-white">Our Team</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.id} className="overflow-hidden rounded-2xl border border-white/15 bg-black/40">
              <img src={member.image} alt={member.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-sm text-slate-300">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-semibold text-white">Inside Our Salon</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {salonGallery.slice(1).map((image) => (
            <img key={image} src={image} alt="Salood real life gallery" className="h-72 w-full rounded-2xl border border-white/15 object-cover" />
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl p-8 text-center glass glow-border">
        <h2 className="text-3xl font-semibold text-white">Ready to transform your salon experience?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">Step into a premium booking experience built for speed, beauty, and confidence.</p>
        <Link to="/auth/register" className="mt-6 inline-block">
          <GlowButton>Create your account</GlowButton>
        </Link>
      </section>
    </PageMotion>
  )
}

export default LandingPage
