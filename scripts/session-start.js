#!/usr/bin/env node
/**
 * Session Start Script
 * Run this at the beginning of every working session.
 * It loads context, checks environment, and sets focus.
 *
 * Usage: node scripts/session-start.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

function log(title, message, color = 'reset') {
  console.log(`${colors.bright}${colors[color]}[${title}]${colors.reset} ${message}`)
}

function readFile(relPath) {
  try {
    return fs.readFileSync(path.join(ROOT, relPath), 'utf-8')
  } catch {
    return null
  }
}

function run(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', stdio: 'pipe' }).trim()
  } catch {
    return null
  }
}

console.log(`
${colors.cyan}${colors.bright}╔══════════════════════════════════════════════════════════════╗
║           BRASIL GLOBAL — SESSION START                      ║
║           Marketing Machine Agent Protocol                   ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
`)

// ── 1. Git Status ──
log('GIT', 'Checking repository status...', 'cyan')
const gitStatus = run('git status --short')
if (gitStatus === null) {
  log('WARN', 'Not a git repository. Run: git init', 'yellow')
} else if (gitStatus === '') {
  log('OK', 'Working tree clean', 'green')
} else {
  log('WARN', `${gitStatus.split('\n').length} uncommitted changes`, 'yellow')
  console.log(colors.dim + gitStatus + colors.reset)
}

// ── 2. Node Modules ──
log('DEPS', 'Checking node_modules...', 'cyan')
const hasNodeModules = fs.existsSync(path.join(ROOT, 'node_modules'))
if (!hasNodeModules) {
  log('WARN', 'node_modules missing. Run: npm install', 'yellow')
} else {
  log('OK', 'node_modules exists', 'green')
}

// ── 3. Environment ──
log('ENV', 'Checking .env.local...', 'cyan')
const hasEnv = fs.existsSync(path.join(ROOT, '.env.local'))
if (!hasEnv) {
  log('WARN', '.env.local missing. Copy from .env.example', 'yellow')
} else {
  log('OK', '.env.local exists', 'green')
}

// ── 4. Load Agent Memory ──
log('MEMORY', 'Loading agent context...', 'cyan')
const context = readFile('.kimi/context.md')
if (context) {
  const lastUpdated = context.match(/LAST UPDATED: ([\d-]+)/)?.[1] || 'unknown'
  log('OK', `Context last updated: ${lastUpdated}`, 'green')

  // Extract current blockers
  const blockersMatch = context.match(/## 🚧 Active Blockers[\s\S]*?(?=## |$)/)
  if (blockersMatch) {
    const lines = blockersMatch[0].split('\n').filter(l => l.startsWith('|') && !l.includes('Blocker') && !l.includes('---'))
    if (lines.length > 0) {
      console.log(colors.dim + '    Blockers:' + colors.reset)
      lines.forEach(line => {
        const parts = line.split('|').filter(Boolean).map(s => s.trim())
        if (parts.length >= 2) {
          console.log(`      ${colors.red}•${colors.reset} ${parts[0]}. ${parts[1]}${parts[2] ? ` (${parts[2]})` : ''}`)
        }
      })
    }
  }

  // Extract next steps
  const nextSteps = context.match(/## 🔧 Immediate Next Steps[\s\S]*?(?=## |$)/)
  if (nextSteps) {
    console.log(colors.dim + '    Next steps:' + colors.reset)
    const lines = nextSteps[0].split('\n').filter(l => l.trim().startsWith('###') || l.trim().startsWith('- ['))
    lines.slice(0, 5).forEach(line => {
      console.log(`      ${colors.cyan}→${colors.reset} ${line.replace(/^#+ /, '').replace(/^- \[.\] /, '').trim()}`)
    })
  }
} else {
  log('WARN', '.kimi/context.md not found', 'yellow')
}

// ── 5. Check Last Session ──
log('HISTORY', 'Checking recent changes...', 'cyan')
const changelog = readFile('docs/operations/CHANGELOG.md')
if (changelog) {
  const lastEntry = changelog.match(/## \[.*?\][\s\S]*?(?=## \[|$)/)?.[0]
  if (lastEntry) {
    const lines = lastEntry.split('\n').slice(0, 8)
    lines.forEach(l => console.log(colors.dim + '    ' + l + colors.reset))
  }
}

// ── 6. Print Reminders ──
console.log(`
${colors.bright}REMINDERS:${colors.reset}
  1. Read AGENTS.md if rules changed
  2. Read .kimi/context.md for current state
  3. Update todo list before starting
  4. Run typecheck + test before ending
  5. Update CHANGELOG before commit
`)

console.log(`${colors.green}${colors.bright}✓ Session loaded. Ready to work.${colors.reset}\n`)
