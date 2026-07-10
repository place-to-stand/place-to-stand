---
title: "Portal: Open-Source Client Dashboard"
description: "Our internal client management portal — built with Next.js, AI-powered activity tracking, and real-time project visibility."
tags: ["Open Source", "Next.js", "AI"]
date: "2025-06-01"
repo: "https://github.com/placetostand"
externalUrl: "https://github.com/placetostand"
---

## Why We Built Portal

Every agency struggles with the same problem: keeping clients informed without drowning in status update meetings. We tried the existing tools — Notion databases, Monday.com boards, custom Airtable views — and none of them fit the way we actually work.

So we built Portal.

## What It Does

Portal is a real-time client dashboard that gives every stakeholder — internal team members and clients alike — a single source of truth for project status.

### For Clients

- **Project timeline** with milestone tracking and deadline visibility
- **Activity feed** showing what's been done, what's in progress, and what's next
- **Document hub** for deliverables, contracts, and reference materials
- **Direct communication** without switching to email or Slack

### For Our Team

- **AI-powered activity tracking** that automatically generates status updates from git commits, task completions, and deployment events
- **Time and budget dashboards** for real-time project health monitoring
- **Client sentiment tracking** based on communication patterns and feedback signals
- **Automated weekly digests** that compile activity into client-ready summaries

## Technical Stack

Portal is built with the same stack we use for client projects:

- **Next.js** (App Router) for the frontend and API routes
- **PostgreSQL** for persistent data
- **Tailwind CSS** for styling
- **AI integrations** for activity summarization and pattern detection
- **Webhook receivers** for GitHub, Linear, and deployment platforms

## Why Open Source

We believe the best tools are built in the open. Open-sourcing Portal means:

1. **Other agencies can use and adapt it** for their own workflows
2. **Our clients can see exactly how their data is handled** — full transparency
3. **The community can contribute** improvements we haven't thought of
4. **We're accountable** to a higher standard of code quality and documentation

## Lessons Learned

Building an internal tool is deceptively hard. Here's what we learned:

- **Scope creep is real.** We started with a "simple dashboard" and ended up rebuilding half of our operations. Setting hard boundaries on v1 features was critical.
- **Eat your own cooking.** We used Portal internally for three months before opening it up. That shakedown period caught dozens of UX issues that would have been embarrassing in the open.
- **AI summaries need human review.** The automated status updates are good, but not perfect. We added a review step where a team member approves the summary before it goes to the client.

## Try It

Portal is available on [GitHub](https://github.com/placetostand). Clone it, deploy it, make it yours. If you build something cool with it, we'd love to hear about it.
