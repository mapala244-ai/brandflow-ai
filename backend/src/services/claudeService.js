const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
const CLAUDE_API_VERSION = '2023-06-01'
const DEFAULT_MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022'

export function isConfigured() {
  return Boolean(process.env.CLAUDE_API_KEY)
}

export async function sendMessage(prompt, options = {}) {
  const apiKey = process.env.CLAUDE_API_KEY

  if (!apiKey) {
    const error = new Error('CLAUDE_API_KEY no está configurada en el servidor')
    error.code = 'MISSING_API_KEY'
    throw error
  }

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': CLAUDE_API_VERSION,
    },
    body: JSON.stringify({
      model: options.model || DEFAULT_MODEL,
      max_tokens: options.maxTokens || 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data?.error?.message || 'Error al comunicarse con Claude AI')
    error.code = 'CLAUDE_API_ERROR'
    error.status = response.status
    error.details = data
    throw error
  }

  return {
    id: data.id,
    model: data.model,
    role: data.role,
    content: data.content?.[0]?.text ?? '',
    stopReason: data.stop_reason,
    usage: data.usage,
  }
}
