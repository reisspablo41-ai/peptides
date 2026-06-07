'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FlaskConical, Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/admin'

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push(from)
      router.refresh()
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071a14] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#1a6b58] rounded-xl flex items-center justify-center mb-3">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white font-bold text-lg">
            Clarion<span className="text-[#3db896]">Peptides</span>
          </h1>
          <p className="text-[#64748b] text-xs mt-1">Admin Access</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-[#64748b]" />
            <span className="text-sm font-semibold text-white">Sign In</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-[#64748b] mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter password…"
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-[#1a6b58] rounded-lg bg-[#071a14] text-white focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#334155]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a6b58] hover:bg-[#228070] disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Verifying…' : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#334155] mt-4">
          Authorised personnel only.
        </p>
      </div>
    </div>
  )
}
