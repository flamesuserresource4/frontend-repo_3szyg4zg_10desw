import { useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

// Reusable field wrapper
function Field({ label, children, required = false, hint }) {
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-sm font-medium text-slate-800">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  )
}

// Simple, consistent input styles
const inputBase =
  'w-full rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (!v) return
    if ((value || []).includes(v)) return setInput('')
    onChange([...(value || []), v])
    setInput('')
  }
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <div className="rounded-lg border border-slate-300/80 bg-white/90 p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {(value || []).map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">
            {tag}
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded p-0.5 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
          className="min-w-[140px] flex-1 border-0 bg-transparent p-1 text-sm outline-none placeholder-slate-400"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-700 active:translate-y-px"
        >
          Add
        </button>
      </div>
    </div>
  )
}

function ExperienceEditor({ items, onChange }) {
  const addItem = () => {
    onChange([
      ...items,
      { role: '', company: '', start: '', end: '', details: '' },
    ])
  }
  const update = (idx, key, val) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: val } : it))
    onChange(next)
  }
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Role" required>
              <input value={it.role} onChange={(e) => update(idx, 'role', e.target.value)} className={inputBase} placeholder="e.g., Frontend Developer" />
            </Field>
            <Field label="Company" required>
              <input value={it.company} onChange={(e) => update(idx, 'company', e.target.value)} className={inputBase} placeholder="e.g., Acme Inc." />
            </Field>
            <Field label="Start">
              <input value={it.start} onChange={(e) => update(idx, 'start', e.target.value)} className={inputBase} placeholder="Jan 2023" />
            </Field>
            <Field label="End">
              <input value={it.end} onChange={(e) => update(idx, 'end', e.target.value)} className={inputBase} placeholder="Present" />
            </Field>
            <Field label="Highlights" hint="Use new lines, bullets (•), or dashes (-) for lists">
              <textarea value={it.details} onChange={(e) => update(idx, 'details', e.target.value)} className={`${inputBase} min-h-[90px]`} placeholder="3–5 bullet points or a short paragraph" />
            </Field>
          </div>
          <div className="mt-3 text-right">
            <button type="button" onClick={() => remove(idx)} className="text-sm font-medium text-rose-600 hover:text-rose-700">Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="w-full rounded-xl border border-dashed border-slate-300 bg-white/70 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-400">
        + Add Experience
      </button>
    </div>
  )
}

function EducationEditor({ items, onChange }) {
  const addItem = () => onChange([
    ...items,
    { school: '', degree: '', period: '', details: '' },
  ])
  const update = (idx, key, val) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: val } : it))
    onChange(next)
  }
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="School" required>
              <input value={it.school} onChange={(e) => update(idx, 'school', e.target.value)} className={inputBase} placeholder="e.g., State University" />
            </Field>
            <Field label="Degree / Program">
              <input value={it.degree} onChange={(e) => update(idx, 'degree', e.target.value)} className={inputBase} placeholder="e.g., B.Sc. Computer Science" />
            </Field>
            <Field label="Years / Period">
              <input value={it.period} onChange={(e) => update(idx, 'period', e.target.value)} className={inputBase} placeholder="2019 — 2023" />
            </Field>
            <Field label="Details">
              <textarea value={it.details} onChange={(e) => update(idx, 'details', e.target.value)} className={`${inputBase} min-h-[80px]`} placeholder="Achievements, GPA, clubs, coursework" />
            </Field>
          </div>
          <div className="mt-3 text-right">
            <button type="button" onClick={() => remove(idx)} className="text-sm font-medium text-rose-600 hover:text-rose-700">Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="w-full rounded-xl border border-dashed border-slate-300 bg-white/70 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-400">
        + Add Education
      </button>
    </div>
  )
}

function useResumeHtml(data) {
  return useMemo(() => {
    const sanitize = (s) => String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const splitBullets = (txt) => sanitize(txt)
      .split(/\n|•|-/)
      .map((t) => t.trim())
      .filter(Boolean)

    const skills = (data.skills || [])
      .map((s) => `<span class="pill">${sanitize(s)}</span>`) 
      .join(' ')

    const experiences = (data.experiences || []).map((ex) => {
      const bullets = splitBullets(ex.details).map((b) => `<li>${b}</li>`).join('')
      return `
        <section class="item">
          <div class="row">
            <h3>${sanitize(ex.role)}</h3>
            <span class="muted">${sanitize(ex.start)}${ex.start || ex.end ? ' — ' : ''}${sanitize(ex.end)}</span>
          </div>
          <div class="sub">${sanitize(ex.company)}</div>
          ${bullets ? `<ul class="bullets">${bullets}</ul>` : ''}
        </section>
      `
    }).join('')

    const education = (data.education || []).map((ed) => {
      return `
        <section class="item">
          <div class="row">
            <h3>${sanitize(ed.school)}</h3>
            <span class="muted">${sanitize(ed.period)}</span>
          </div>
          <div class="sub">${sanitize(ed.degree)}</div>
          ${ed.details ? `<p class="mt">${sanitize(ed.details)}</p>` : ''}
        </section>
      `
    }).join('')

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${sanitize(data.name || 'Resume')}</title>
  <style>
    :root { --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; --pill:#eef2ff; --pill-ink:#3730a3; --accent:#4f46e5; }
    *{box-sizing:border-box}
    body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0;color:var(--ink);}
    .wrap{max-width:880px;margin:40px auto;padding:0 28px}
    header{display:flex;flex-wrap:wrap;align-items:flex-end;gap:16px 28px;border-bottom:2px solid var(--line);padding-bottom:16px}
    h1{font-size:34px;line-height:1.1;margin:0}
    h2{font-size:16px;color:var(--muted);font-weight:600;margin:0}
    .contact{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;font-size:13px;color:var(--muted)}
    .section{padding:20px 0;border-bottom:1px dashed var(--line)}
    .section > .title{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:800;margin:0 0 8px}
    .row{display:flex;justify-content:space-between;gap:16px}
    .item h3{margin:0;font-size:16px}
    .sub{color:var(--muted);font-weight:500;margin-top:2px}
    .muted{color:var(--muted)}
    .bullets{padding-left:18px;margin:8px 0}
    .pill{display:inline-block;background:var(--pill);color:var(--pill-ink);padding:4px 10px;border-radius:999px;font-size:12px;margin:4px 6px 0 0}
    .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    .summary{white-space:pre-wrap}
    @media (max-width:720px){ .grid{grid-template-columns:1fr} .contact{align-items:flex-start} }
    @media print { .wrap{margin:0} header{border:none;padding-bottom:6px} .section{padding:12px 0;border-bottom:0} }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <h1>${sanitize(data.name)}</h1>
        <h2>${sanitize(data.title)}</h2>
      </div>
      <div class="contact">
        ${data.email ? `<span>${sanitize(data.email)}</span>` : ''}
        ${data.phone ? `<span>${sanitize(data.phone)}</span>` : ''}
        ${data.location ? `<span>${sanitize(data.location)}</span>` : ''}
        ${data.website ? `<span>${sanitize(data.website)}</span>` : ''}
      </div>
    </header>

    ${data.summary ? `<section class="section"><p class="title">Summary</p><p class="summary">${sanitize(data.summary)}</p></section>` : ''}

    ${skills ? `<section class="section"><p class="title">Skills</p><div class="grid">${skills}</div></section>` : ''}

    ${experiences ? `<section class="section"><p class="title">Experience</p>${experiences}</section>` : ''}

    ${education ? `<section class="section"><p class="title">Education</p>${education}</section>` : ''}
  </div>
</body>
</html>`

    return html
  }, [data])
}

function Hero() {
  return (
    <section className="relative h-[56vh] md:h-[64vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Interactive 3D
        </span>
        <h1 className="mt-4 bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-3xl font-extrabold leading-tight text-transparent md:text-5xl">
          Skill Portfolio / Resume Builder
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
          Fill a quick form and instantly generate a clean, modern resume you can copy or download.
        </p>
      </div>
    </section>
  )
}

function App() {
  const [data, setData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    skills: [],
    experiences: [
      { role: '', company: '', start: '', end: '', details: '' },
    ],
    education: [
      { school: '', degree: '', period: '', details: '' },
    ],
  })

  const resumeHtml = useResumeHtml(data)
  const iframeRef = useRef(null)

  const update = (key, val) => setData((d) => ({ ...d, [key]: val }))

  const sampleFill = () => {
    setData({
      name: 'Jordan Lee',
      title: 'Frontend Engineer',
      email: 'jordan.lee@example.com',
      phone: '+1 (555) 867-5309',
      location: 'Seattle, WA',
      website: 'https://jordan.dev',
      summary:
        'Frontend engineer with a passion for delightful UX, performance, and accessible design. Comfortable across React, TypeScript, and design systems.',
      skills: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Node', 'GraphQL', 'Jest', 'Accessibility'],
      experiences: [
        {
          role: 'Senior Frontend Engineer',
          company: 'Acme Corp',
          start: '2022',
          end: 'Present',
          details:
            'Led migration to Vite and modular design system.\nShipped dashboard with 20% faster load times.\nMentored 3 engineers and introduced accessibility checks.',
        },
        {
          role: 'Frontend Engineer',
          company: 'Nimbus Labs',
          start: '2020',
          end: '2022',
          details:
            'Built reusable UI library in React + Tailwind.\nImplemented end-to-end tests and CI quality gates.\nCollaborated closely with design to improve UX.',
        },
      ],
      education: [
        { school: 'State University', degree: 'B.Sc. Computer Science', period: '2016 — 2020', details: 'Graduated with Honors. Clubs: Robotics, Coding Society.' },
      ],
    })
  }

  const downloadHtml = () => {
    const blob = new Blob([resumeHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.name || 'resume'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(resumeHtml)
      alert('Resume HTML copied to clipboard')
    } catch {
      alert('Copy failed. Try the Download option instead.')
    }
  }

  const printResume = () => {
    const iframe = iframeRef.current
    if (!iframe) return
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.08),transparent_40%)]">
      <Hero />

      <main className="mx-auto -mt-12 max-w-7xl px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,480px)]">
          <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-800/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Your Details</h2>
                <p className="mt-1 text-sm text-slate-600">Fill the form. Your resume updates in real-time.</p>
              </div>
              <button onClick={sampleFill} className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-slate-800">
                Fill sample
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" required>
                  <input value={data.name} onChange={(e) => update('name', e.target.value)} className={inputBase} placeholder="Jane Doe" />
                </Field>
                <Field label="Headline / Title" required>
                  <input value={data.title} onChange={(e) => update('title', e.target.value)} className={inputBase} placeholder="Software Engineer" />
                </Field>
                <Field label="Email">
                  <input value={data.email} onChange={(e) => update('email', e.target.value)} className={inputBase} placeholder="jane@domain.com" />
                </Field>
                <Field label="Phone">
                  <input value={data.phone} onChange={(e) => update('phone', e.target.value)} className={inputBase} placeholder="+1 555 123 4567" />
                </Field>
                <Field label="Location">
                  <input value={data.location} onChange={(e) => update('location', e.target.value)} className={inputBase} placeholder="City, Country" />
                </Field>
                <Field label="Website / Portfolio">
                  <input value={data.website} onChange={(e) => update('website', e.target.value)} className={inputBase} placeholder="https://example.com" />
                </Field>
              </div>

              <Field label="Summary">
                <textarea value={data.summary} onChange={(e) => update('summary', e.target.value)} className={`${inputBase} min-h-[120px]`} placeholder="Brief overview of your strengths and goals" />
              </Field>

              <Field label="Skills" hint="Press Enter or click Add to include items">
                <TagInput value={data.skills} onChange={(v) => update('skills', v)} placeholder="e.g., React, Python, SQL" />
              </Field>

              <div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Experience</div>
                <ExperienceEditor items={data.experiences} onChange={(v) => update('experiences', v)} />
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Education</div>
                <EducationEditor items={data.education} onChange={(v) => update('education', v)} />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={copyHtml} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50">
                  Copy HTML
                </button>
                <button onClick={downloadHtml} className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">
                  Download HTML
                </button>
                <button onClick={printResume} className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                  Print
                </button>
              </div>
            </div>
          </section>

          <section className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-800/5 backdrop-blur lg:sticky lg:top-6">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
              <span className="text-xs text-slate-500">Auto-generated</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-inner">
              <iframe ref={iframeRef} title="Resume Preview" srcDoc={resumeHtml} className="h-[760px] w-full bg-white" />
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-500">Tip: Use your browser’s print dialog to export as PDF.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-6 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          Simplifies resume creation for job seekers.
        </div>
      </footer>
    </div>
  )
}

export default App
