import path from 'node:path'
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { referralContent as c } from '@/src/lib/referral-content'

/*
 * Fonts are read from public/fonts at render time. react-pdf cannot parse
 * woff2, so these are TTF copies of the same Google Fonts faces next/font
 * loads for the site. next.config.mjs traces the directory into the
 * /referral/pdf function bundle so the files exist on Vercel.
 */
const fontDir = path.join(process.cwd(), 'public', 'fonts')

Font.register({
  family: 'Space Grotesk',
  fonts: [
    { src: path.join(fontDir, 'SpaceGrotesk-Bold.ttf'), fontWeight: 700 },
  ],
})

Font.register({
  family: 'Source Sans 3',
  fonts: [
    { src: path.join(fontDir, 'SourceSans3-Regular.ttf'), fontWeight: 400 },
    { src: path.join(fontDir, 'SourceSans3-SemiBold.ttf'), fontWeight: 600 },
  ],
})

// react-pdf hyphenates by default; a one-pager reads better with whole words.
Font.registerHyphenationCallback(word => [word])

// Mirrors the @theme tokens in app/globals.css.
const color = {
  bg: '#0e0f11',
  panel: '#1a1b1f',
  border: '#2a2b30',
  text: '#e8e6e3',
  muted: '#a8a8ac',
  accent: '#b5f542',
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: color.bg,
    color: color.text,
    fontFamily: 'Source Sans 3',
    fontSize: 8.5,
    paddingTop: 36,
    paddingBottom: 32,
    paddingHorizontal: 36,
    lineHeight: 1.4,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  label: {
    fontFamily: 'Courier',
    fontSize: 7,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: color.accent,
  },
  meta: {
    fontFamily: 'Courier',
    fontSize: 7,
    letterSpacing: 0.6,
    color: color.muted,
  },
  heroHeadline: {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 1.02,
    letterSpacing: -0.5,
    maxWidth: 470,
    marginBottom: 10,
  },
  heroBody: {
    fontSize: 10,
    lineHeight: 1.45,
    color: color.muted,
    maxWidth: 440,
  },
  rule: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    marginVertical: 16,
  },
  columns: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
  },
  section: {
    flexDirection: 'column',
    gap: 6,
  },
  h2: {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 1.1,
    letterSpacing: -0.2,
    marginTop: 2,
  },
  body: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: color.muted,
  },
  strong: {
    fontWeight: 600,
    color: color.text,
  },
  list: {
    flexDirection: 'column',
    gap: 3,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: color.accent,
    marginTop: 4.5,
  },
  cards: {
    flexDirection: 'column',
    gap: 5,
    marginTop: 2,
  },
  card: {
    backgroundColor: color.panel,
    borderWidth: 1,
    borderColor: color.border,
    paddingVertical: 7,
    paddingHorizontal: 9,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  numberBox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: 'rgba(181, 245, 66, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  number: {
    fontFamily: 'Courier',
    fontSize: 6,
    color: color.accent,
  },
  cardTitle: {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 9.5,
    lineHeight: 1.15,
    letterSpacing: -0.15,
    marginBottom: 2,
  },
  quotes: {
    flexDirection: 'column',
    gap: 3,
    marginTop: 3,
  },
  quote: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(181, 245, 66, 0.4)',
    paddingLeft: 6,
    fontSize: 8,
    lineHeight: 1.35,
    color: color.muted,
  },
  steps: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: color.border,
    marginTop: 2,
  },
  step: {
    backgroundColor: color.panel,
    paddingVertical: 7,
    paddingHorizontal: 9,
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: color.border,
  },
  stepFirst: {
    borderTopWidth: 0,
  },
  stepNumber: {
    fontFamily: 'Courier',
    fontSize: 7,
    letterSpacing: 1,
    color: color.accent,
    width: 16,
    marginTop: 1.5,
  },
  callout: {
    backgroundColor: color.panel,
    borderWidth: 1,
    borderColor: color.accent,
    padding: 10,
    flexDirection: 'column',
    gap: 8,
  },
  button: {
    backgroundColor: color.accent,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textDecoration: 'none',
  },
  buttonText: {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 7.5,
    letterSpacing: 0.8,
    color: color.bg,
    textDecoration: 'none',
  },
  footer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerCompany: {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 9.5,
    letterSpacing: -0.15,
    marginBottom: 1,
  },
  footerMuted: {
    fontSize: 8,
    color: color.muted,
  },
  footerLink: {
    fontFamily: 'Courier',
    fontSize: 7,
    letterSpacing: 0.6,
    color: color.muted,
    textDecoration: 'none',
  },
  contact: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 3,
  },
  contactName: {
    fontSize: 8,
    fontWeight: 600,
    color: color.text,
  },
})

function Label({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>
}

export function ReferralDocument({ date }: { date: string }) {
  return (
    <Document
      title={`${c.meta.title} | Place To Stand`}
      author='Place To Stand'
      subject={c.hero.headline}
      creator='placetostandagency.com'
      producer='placetostandagency.com'
    >
      <Page size='LETTER' style={styles.page}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Label>{c.hero.label}</Label>
          <Text style={styles.meta}>
            {c.footer.site}/referral · {date}
          </Text>
        </View>

        {/* Hero */}
        <Text style={styles.heroHeadline}>{c.hero.headline}</Text>
        <Text style={styles.heroBody}>{c.hero.body}</Text>

        <View style={styles.rule} />

        {/* Two columns */}
        <View style={styles.columns}>
          {/* Left column */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Label>{c.whoWeAre.label}</Label>
              <Text style={styles.h2}>{c.whoWeAre.headline}</Text>
              <Text style={styles.body}>{c.whoWeAre.body}</Text>
              <View style={styles.list}>
                {c.whoWeAre.services.map(service => (
                  <View key={service.name} style={styles.bulletRow}>
                    <View style={styles.bullet} />
                    <Text style={styles.body}>
                      <Text style={styles.strong}>{service.name}</Text>
                      {' — '}
                      {service.detail}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Label>{c.howItWorks.label}</Label>
              <View style={styles.steps}>
                {c.howItWorks.steps.map((step, index) => (
                  <View
                    key={step.number}
                    style={
                      index === 0
                        ? [styles.step, styles.stepFirst]
                        : styles.step
                    }
                  >
                    <Text style={styles.stepNumber}>{step.number}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{step.title}</Text>
                      <Text style={styles.body}>{step.body}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Label>{c.howWeWork.label}</Label>
              <View style={styles.list}>
                {c.howWeWork.points.map(point => (
                  <Text key={point.title} style={styles.body}>
                    <Text style={styles.strong}>{point.title}</Text>{' '}
                    {point.body}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Label>{c.whoToSend.label}</Label>
              <View style={styles.cards}>
                {c.whoToSend.cards.map(card => (
                  <View key={card.number} style={styles.card}>
                    <View style={styles.numberBox}>
                      <Text style={styles.number}>{card.number}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{card.title}</Text>
                      <Text style={styles.body}>{card.body}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.body, { color: color.text }]}>
                {c.whoToSend.leadIn}
              </Text>
              <View style={styles.quotes}>
                {c.whoToSend.quotes.map(quote => (
                  <Text key={quote} style={styles.quote}>
                    “{quote}”
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.callout}>
              <Text style={[styles.body, { color: color.text }]}>
                {c.audit.body}
              </Text>
              <Link src={c.audit.url} style={styles.button}>
                <Text style={styles.buttonText}>{c.audit.buttonLabel}</Text>
              </Link>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerCompany}>{c.footer.company}</Text>
            <Text style={styles.footerMuted}>{c.footer.locations}</Text>
            <Link src={c.footer.siteUrl} style={styles.footerLink}>
              {c.footer.site}
            </Link>
          </View>
          <View>
            {c.footer.contacts.map(contact => (
              <View key={contact.email} style={styles.contact}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Link src={`mailto:${contact.email}`} style={styles.footerLink}>
                  {contact.email}
                </Link>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}
