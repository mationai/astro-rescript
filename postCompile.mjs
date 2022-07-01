#!/usr/local/bin/node

import fs from 'node:fs'
import path from 'node:path'

const srcPath = '../../src/components'
const filePath = process.argv[2]
const fname = path.basename(filePath, '.js')
const relPath = path.dirname(filePath).split(srcPath)[0]
const astroPath = path.resolve(srcPath, relPath, fname+'.astro')
const insertSep = '// End Codegen'
const srcSep = 'export {'

const srcTxt = fs.readFileSync(filePath, 'utf8')
const astroTxt = fs.readFileSync(astroPath, 'utf8')
const keepSrc = srcTxt.split(srcSep)[0]
const keep = astroTxt.split(insertSep)[1]
fs.writeFileSync(astroPath, `---\n${keepSrc}\n${insertSep}${keep}`)