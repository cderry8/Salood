import { useState } from 'react'
import PageMotion from '../../components/ui/PageMotion'
import { salonInfo } from '../../data/mockData'

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Client User',
    phone: '+250 789 000 111',
    email: 'client@salood.rw',
    notes: '',
  })
  const [review, setReview] = useState({ rating: 5, message: '' })

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">My Profile</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h2 className="text-xl font-semibold text-white">Personal Information</h2>
          <div className="mt-4 space-y-3">
            <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm" />
            <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm" />
            <input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm" />
            <textarea rows="3" value={profile.notes} onChange={(event) => setProfile({ ...profile, notes: event.target.value })} placeholder="Preference notes..." className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm" />
          </div>
          <button type="button" className="mt-4 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm">
            Save Profile (UI only)
          </button>
        </section>

        <section className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h2 className="text-xl font-semibold text-white">Leave a Review</h2>
          <div className="mt-4 space-y-3">
            <select
              value={review.rating}
              onChange={(event) => setReview({ ...review, rating: Number(event.target.value) })}
              className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm"
            >
              {[5, 4, 3, 2, 1].map((item) => (
                <option key={item} value={item}>
                  {item} Star{item > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <textarea
              rows="4"
              value={review.message}
              onChange={(event) => setReview({ ...review, message: event.target.value })}
              placeholder="Share your experience..."
              className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm"
            />
          </div>
          <button type="button" className="mt-4 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm">
            Submit Review (UI only)
          </button>
          <p className="mt-4 text-sm text-slate-300">Need help right away? Call {salonInfo.phone}</p>
        </section>
      </div>
    </PageMotion>
  )
}

export default ProfilePage
