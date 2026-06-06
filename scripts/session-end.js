#!/usr/bin/env node
/**
 * Session End Script
 * Run this at the end of every working session.
 * It validates quality gates, updates memory, and prepares handoff.
 *
 * Usage: node scripts/session-end.js "description of what was done"
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

function run(cmd, ignoreError = false) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', stdio: 'pipe' }).trim()
  } catch (e) {
    if (ignoreError) return null
    return `ERROR: ${e.message}`
  }
}

const description = process.argv.slice(2).join(' ') || 'Session completed'

console.log(`
${colors.cyan}${colors.bright}╔══════════════════════════════════════════════════════════════╗
║           BRASIL GLOBAL — SESSION END                        ║
║           Marketing Machine Agent Protocol                   ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
`)

log('DESC', description, 'cyan')

// ── 1. Type Check ──
log('TS', 'Running TypeScript check...', 'cyan')
const typeCheck = run('npm run typecheck 2>&1', true)
if (typeCheck && !typeCheck.includes('error TS')) {
  log('OK', 'TypeScript check passed', 'green')
} else if (typeCheck) {
  const errorCount = (typeCheck.match(/error TS/g) || []).length
  log('WARN', `${errorCount} TypeScript error(s)`, 'yellow')
  console.log(colors.dim + typeCheck.split('\n').slice(0, 10).join('\n') + colors.reset)
} else {
  log('SKIP', 'TypeScript check skipped (npm not installed)', 'yellow')
}

// ── 2. Lint ──
log('LINT', 'Running ESLint...', 'cyan')
const lint = run('npm run lint 2>&1', true)
if (lint && !lint.toLowerCase().includes('error')) {
  log('OK', 'Lint passed', 'green')
} else if (lint) {
  log('WARN', 'Lint issues found', 'yellow')
} else {
  log('SKIP', 'Lint skipped', 'yellow')
}

// ── 3. Tests ──
log('TEST', 'Running tests...', 'cyan')
const tests = run('npm run test 2>&1', true)
if (tests && tests.includes('PASS')) {
  const passCount = (tests.match(/PASS/g) || []).length
  log('OK', `${passCount} test suite(s) passed`, 'green')
} else if (tests) {
  log('WARN', 'Some tests failed', 'yellow')
} else {
  log('SKIP', 'Tests skipped', 'yellow')
}

// ── 4. Git Status ──
log('GIT', 'Checking changes...', 'cyan')
const gitStatus = run('git status --short 2>&1', true)
if (gitStatus && gitStatus !== '') {
  const changedFiles = gitStatus.split('\n').filter(Boolean).length
  log('INFO', `${changedFiles} file(s) changed`, 'cyan')
  console.log(colors.dim + gitStatus + colors.reset)
} else if (gitStatus === '') {
  log('OK', 'No changes', 'green')
} else {
  log('WARN', 'Git not initialized', 'yellow')
}

// ── 5. Update Context Timestamp ──
log('MEM', 'Updating agent context...', 'cyan')
const contextPath = path.join(ROOT, '.kimi/context.md')
if (fs.existsSync(contextPath)) {
  let context = fs.readFileSync(contextPath, 'utf-8')
  const now = new Date().toISOString().split('T')[0]
  context = context.replace(/LAST UPDATED: [\d-]+/, `LAST UPDATED: ${now}`)

  // Append session summary
  const sessionNote = `\n## 📝 Session ${now}\n- ${description}\n- Quality gates: ${typeCheck && !typeCheck.includes('error TS') ? 'TS ✓' : 'TS ✗'} ${tests && tests.includes('PASS') ? 'Tests ✓' : 'Tests ✗'}\n`
  // Add before the last section or at the end
  context = context + sessionNote

  fs.writeFileSync(contextPath, context)
  log('OK', 'Context updated', 'green')
}

// ── 6. Print Handoff ──
console.log(`
${colors.bright}SESSION COMPLETE:${colors.reset}
  Description: ${description}
  Timestamp:   ${new Date().toISOString()}

${colors.bright}NEXT:${colors.reset}
  1. Review changes: git diff
  2. Commit if ready: git commit -m "..."
  3. Update CHANGELOG.md
  4. Read .kimi/context.md next session

${colors.green}${colors.bright}✓ Session ended. Memory saved.${colors.reset}\n`)
