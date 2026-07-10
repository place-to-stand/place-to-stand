import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const fieldNotesDirectory = path.join(process.cwd(), 'content/field-notes')

export type FieldNote = {
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  repo?: string
  externalUrl?: string
  contentHtml: string
}

function parseFieldNote(slug: string, fileContents: string, renderBody: boolean): FieldNote {
  const { data, content } = matter(fileContents)

  let contentHtml = ''
  if (renderBody) {
    const result = remark().use(html).processSync(content)
    contentHtml = result.toString()
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags ?? [],
    date: data.date,
    repo: data.repo ?? undefined,
    externalUrl: data.externalUrl ?? undefined,
    contentHtml,
  }
}

export function getAllFieldNotes(): FieldNote[] {
  const fileNames = fs.readdirSync(fieldNotesDirectory).filter(f => f.endsWith('.md'))

  const notes = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(fieldNotesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return parseFieldNote(slug, fileContents, false)
  })

  // Sort by date, newest first
  return notes.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getFieldNoteBySlug(slug: string): FieldNote | null {
  const fullPath = path.join(fieldNotesDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return parseFieldNote(slug, fileContents, true)
}
