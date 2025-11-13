import { useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live 3D
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
          Skill Portfolio / Resume Builder
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
          Fill a quick form and instantly generate a clean, modern resume you can copy or download.
        </p>
      </div>
    </section>
  )
}

function Field({ label, children, required = false }) {
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
    </label>
  )
}

function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (!v) return
    onChange([...(value || []), v])
    setInput('')
  }
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-200 bg-white p-2">
        {(value || []).map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
            {tag}
            <button type="button" onClick={() => remove(i)} className="text-blue-500 hover:text-blue-700">×</button>
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
          className="flex-1 min-w-[140px] border-0 p-1 text-sm outline-none"
        />
        <button type="button" onClick={add} className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700">
          Add
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-500">Press Enter or click Add to include items.</p>
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
        <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Role" required>
              <input value={it.role} onChange={(e) => update(idx, 'role', e.target.value)} className="input" placeholder="e.g., Frontend Developer" />
            </Field>
            <Field label="Company" required>
              <input value={it.company} onChange={(e) => update(idx, 'company', e.target.value)} className="input" placeholder="e.g., Acme Inc." />
            </Field>
            <Field label="Start">
              <input value={it.start} onChange={(e) => update(idx, 'start', e.target.value)} className="input" placeholder="Jan 2023" />
            </Field>
            <Field label="End">
              <input value={it.end} onChange={(e) => update(idx, 'end', e.target.value)} className="input" placeholder="Present" />
            </Field>
            <Field label="Highlights">
              <textarea value={it.details} onChange={(e) => update(idx, 'details', e.target.value)} className="input min-h-[90px]" placeholder="3–5 bullet points or a short paragraph" />
            </Field>
          </div>
          <div className="mt-3 text-right">
            <button type="button" onClick={() => remove(idx)} className="text-sm text-rose-600 hover:text-rose-700">Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="w-full rounded-md border border-dashed border-gray-300 bg-white py-2 text-sm font-semibold text-gray-700 hover:border-gray-400">
        + Add Experience
      </button>
    </div>
  )
}

function EducationEditor({ items, onChange }) {
  const addItem = () => onChange([...
    items,
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
        <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="School" required>
              <input value={it.school} onChange={(e) => update(idx, 'school', e.target.value)} className="input" placeholder="e.g., State University" />
            </Field>
            <Field label="Degree / Program">
              <input value={it.degree} onChange={(e) => update(idx, 'degree', e.target.value)} className="input" placeholder="e.g., B.Sc. Computer Science" />
            </Field>
            <Field label="Years / Period">
              <input value={it.period} onChange={(e) => update(idx, 'period', e.target.value)} className="input" placeholder="2019 — 2023" />
            </Field>
            <Field label="Details">
              <textarea value={it.details} onChange={(e) => update(idx, 'details', e.target.value)} className="input min-h-[80px]" placeholder="Achievements, GPA, clubs, coursework" />
            </Field>
          </div>
          <div className="mt-3 text-right">
            <button type="button" onClick={() => remove(idx)} className="text-sm text-rose-600 hover:text-rose-700">Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="w-full rounded-md border border-dashed border-gray-300 bg-white py-2 text-sm font-semibold text-gray-700 hover:border-gray-400">
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
    :root { --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; --pill:#eef2ff; --pill-ink:#3730a3; }
    *{box-sizing:border-box}
    body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0;color:var(--ink);}
    .wrap{max-width:880px;margin:40px auto;padding:0 24px}
    header{display:flex;flex-wrap:wrap;align-items:flex-end;gap:16px 28px;border-bottom:1px solid var(--line);padding-bottom:16px}
    h1{font-size:32px;line-height:1.1;margin:0}
    h2{font-size:16px;color:var(--muted);font-weight:600;margin:0}
    .contact{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;font-size:13px;color:var(--muted)}
    .section{padding:18px 0;border-bottom:1px solid var(--line)}
    .row{display:flex;justify-content:space-between;gap:16px}
    .item h3{margin:0;font-size:16px}
    .sub{color:var(--muted);font-weight:500;margin-top:2px}
    .muted{color:var(--muted)}
    .bullets{padding-left:18px;margin:8px 0}
    .pill{display:inline-block;background:var(--pill);color:var(--pill-ink);padding:4px 10px;border-radius:999px;font-size:12px;margin:4px 6px 0 0}
    .mt{margin-top:8px}
    .summary{white-space:pre-wrap}
    @media print { .wrap{margin:0} header{border:none;padding-bottom:0} .section{padding:12px 0} }
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

    ${data.summary ? `<section class="section"><h3>Summary</h3><p class="summary">${sanitize(data.summary)}</p></section>` : ''}

    ${skills ? `<section class="section"><h3>Skills</h3><div>${skills}</div></section>` : ''}

    ${experiences ? `<section class="section"><h3>Experience</h3>${experiences}</section>` : ''}

    ${education ? `<section class="section"><h3>Education</h3>${education}</section>` : ''}
  </div>
</body>
</html>`

    return html
  }, [data])
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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Hero />

      <main className="mx-auto max-w-6xl px-6 pb-24 -mt-10">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Your Details</h2>
            <p className="mt-1 text-sm text-slate-600">Fill the form. Your resume updates in real-time.</p>

            <div className="mt-6 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" required>
                  <input value={data.name} onChange={(e) => update('name', e.target.value)} className="input" placeholder="Jane Doe" />
                </Field>
                <Field label="Headline / Title" required>
                  <input value={data.title} onChange={(e) => update('title', e.target.value)} className="input" placeholder="Software Engineer" />
                </Field>
                <Field label="Email">
                  <input value={data.email} onChange={(e) => update('email', e.target.value)} className="input" placeholder="jane@domain.com" />
                </Field>
                <Field label="Phone">
                  <input value={data.phone} onChange={(e) => update('phone', e.target.value)} className="input" placeholder="+1 555 123 4567" />
                </Field>
                <Field label="Location">
                  <input value={data.location} onChange={(e) => update('location', e.target.value)} className="input" placeholder="City, Country" />
                </Field>
                <Field label="Website / Portfolio">
                  <input value={data.website} onChange={(e) => update('website', e.target.value)} className="input" placeholder="https://example.com" />
                </Field>
              </div>

              <Field label="Summary">
                <textarea value={data.summary} onChange={(e) => update('summary', e.target.value)} className="input min-h-[110px]" placeholder="Brief overview of your strengths and goals" />
              </Field>

              <Field label="Skills">
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
                <button onClick={copyHtml} className="btn primary">Copy HTML</button>
                <button onClick={downloadHtml} className="btn">Download HTML</button>
                <button onClick={printResume} className="btn ghost">Print</button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-2">
              <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
              <span className="text-xs text-slate-500">Auto-generated</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <iframe ref={iframeRef} title="Resume Preview" srcDoc={resumeHtml} className="h-[700px] w-full bg-white" />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/60 py-6 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          Simplifies resume creation for job seekers.
        </div>
      </footer>

      {/* Styles for form controls */}
      <style>{`
        .input { @apply w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder-slate-400 focus:border-blue-500; }
        .btn { @apply inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50; }
        .btn.primary { @apply border-transparent bg-blue-600 text-white hover:bg-blue-700; }
        .btn.ghost { @apply border-transparent bg-transparent text-slate-700 hover:bg-slate-100; }
      `}</style>
    </div>
  )
}

export default App
