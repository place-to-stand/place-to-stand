import type { Metadata } from 'next'
import {
  PageHeader,
  Section,
  SectionHeading,
} from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import {
  AuditLink,
  BookCallButton,
  BookCallGroup,
  NoteLink,
} from '@/src/components/primitives/cta'
import { LogoLockup } from '@/src/components/primitives/logo-mark'
import { SocialIcon } from '@/src/components/primitives/social-icon'
import { FooterSubscribe } from '@/src/components/sections/footer-subscribe'
import { Button } from '@/src/components/primitives/button'
import { Input } from '@/src/components/primitives/input'
import { FieldError } from '@/src/components/primitives/field-error'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { MediaFrame } from '@/src/components/patterns/media-frame'
import { ArrowRight, Check, Icon, Menu } from '@/src/components/primitives/icon'
import { TagRow } from '@/src/components/patterns/tag-row'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { StepsSection } from '@/src/components/sections/process'
import { ResultsSection } from '@/src/components/sections/results'
import { ClientsSection } from '@/src/components/sections/clients-section'
import { FAQ } from '@/src/lib/offers'
import { team } from '@/src/lib/team'
import {
  ChangeLogPiece,
  ProductCardPiece,
} from '@/src/components/patterns/pieces/heatonist'
import { ClientLogoWall } from '@/src/components/patterns/client-logo-wall'
import Image from 'next/image'
import { DesignIndex } from './_components/design-index'
import { DesignGroup, DesignSection, Specimen } from './_components/specimen'
import { SplitSection } from '@/src/components/patterns/split-section'
import { TeamChat } from '@/src/components/patterns/team-chat'
import { Quote } from '@/src/components/patterns/quote'
import { RuledLabel } from '@/src/components/patterns/ruled-label'
import {
  BLOCK_AVATAR_NAMES,
  BlockAvatar,
} from '@/src/components/patterns/block-avatars'
import {
  Callout,
  Card,
  Chip,
  LinkCard,
  Panel,
  RuledList,
  RuledRow,
  SideNote,
  StatTile,
} from '@/src/components/boxes'
import {
  LiveVar,
  SpaceBar,
  Swatch,
  TypeSample,
} from './_components/live-values'
import { Hero } from '@/src/components/sections/hero'

/**
 * /design: the design system, rendered from the real tokens and components
 * (docs/design-system.md). Public so it can be shared, but noindex and in
 * neither the sitemap nor llms.txt.
 */
export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

const COLORS = [
  '--color-bg',
  '--color-bg-card',
  '--color-bg-elevated',
  '--color-text',
  '--color-text-muted',
  '--color-accent',
  '--color-accent-line',
  '--color-accent-subtle',
  '--color-border',
  '--color-border-light',
  '--color-line',
  '--color-danger',
]

const TYPE = [
  { cls: 'type-page-title', sample: 'Software you own.' },
  { cls: 'type-section-title', sample: 'You own all of it.' },
  { cls: 'type-item-title', sample: 'Run your business' },
  { cls: 'type-card-title', sample: 'Discovery session' },
  { cls: 'type-stat', sample: '1,400+' },
  { cls: 'type-quote', sample: '“A tech team without the hire.”' },
  {
    cls: 'type-voice',
    sample: '“We run this on spreadsheets and it’s breaking.”',
    proposed: true,
  },
  { cls: 'type-lead', sample: 'Reading text one step up, in the text color.' },
  { cls: 'type-intro', sample: 'The paragraph under a page or section title.' },
  { cls: 'text-base', sample: 'Body text: reading text at 16px.' },
  { cls: 'type-fine', sample: 'Short fine print and tags' },
  { cls: 'bp-label font-mono', sample: 'Section label' },
]

const SPACING = [
  '--spacing-grid-half',
  '--spacing-intro',
  '--spacing-eyebrow',
  '--spacing-card',
  '--spacing-label',
  '--spacing-stack',
  '--spacing-header',
  '--spacing-page-top',
  '--spacing-callout',
  '--spacing-band-pad',
  '--spacing-band',
  '--spacing-edge',
  '--spacing-section',
]

export default function DesignPage() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Hero
        variant='page'
        sectionClassName='pb-header'
        label='Design System'
        title='Place To Stand, piece by piece.'
        intro='The colors, type, spacing and building blocks behind placetostandagency.com, shown live.'
      />

      <Section className='grid gap-section pb-section lg:grid-cols-12 lg:gap-x-grid-2'>
        <div className='min-w-0 lg:col-span-3'>
          <DesignIndex />
        </div>
        <div className='flex min-w-0 flex-col gap-band lg:col-span-9'>
          {/* ── Tokens ── */}
          <DesignGroup title='Tokens' />
          <DesignSection
            id='color'
            label='Tokens'
            title='Color'
            when='Tokens only, solid colors. The left stage is a dark band, the right a light band: the same names resolve differently, so components never need a light variant.'
          >
            <Specimen
              names={['bg-*', 'text-*', 'border-*', 'accent-line']}
              note='lime on dark, ink on light'
              tones
            >
              <div className='grid gap-grid-1 sm:grid-cols-2'>
                {COLORS.map(name => (
                  <Swatch key={name} name={name} />
                ))}
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='type'
            label='Tokens'
            title='Type'
            when='One role per text block. Sizes shown are live for this window width; resize to see each step.'
          >
            <Specimen names={TYPE.map(t => t.cls.split(' ')[0])}>
              <div className='flex flex-col gap-grid-1'>
                {TYPE.map(t => (
                  <TypeSample
                    key={t.cls}
                    cls={t.cls}
                    sample={t.sample}
                    proposed={'proposed' in t}
                  />
                ))}
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='spacing'
            label='Tokens'
            title='Spacing'
            when='Every structural gap is one of these roles, on the 24px grid (12px half steps). Bars show the live value at this width.'
          >
            <Specimen
              names={['gap-section', 'gap-stack', 'p-card', 'py-band-pad']}
            >
              <div className='flex flex-col gap-grid-half overflow-x-auto'>
                {SPACING.map(name => (
                  <SpaceBar key={name} name={name} />
                ))}
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='motion'
            label='Tokens'
            title='Motion'
            when='Durations and easings by role, as tokens. The Home hero intro is the reference choreography: content wipes and rises in a short, staged sequence, the drawing builds after it, and reduced motion shows the end state.'
          >
            <Specimen
              names={[
                '--motion-fast',
                '--motion-base',
                '--motion-enter',
                '--motion-slow',
                '--motion-spin',
                '--ease-standard',
                '--ease-enter',
                '--ease-in-out',
                '--ease-exit',
              ]}
            >
              <div className='flex flex-col'>
                {[
                  '--motion-fast',
                  '--motion-base',
                  '--motion-enter',
                  '--motion-slow',
                  '--motion-spin',
                  '--ease-standard',
                  '--ease-enter',
                  '--ease-in-out',
                  '--ease-exit',
                ].map(name => (
                  <LiveVar key={name} name={name} />
                ))}
              </div>
            </Specimen>
            <Specimen
              names={['hero-section.tsx', '.hero-line', '.hero-reveal']}
              note={'the Home hero intro, the reference choreography'}
            >
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>0s</dt>
                  <dd className='text-base text-text-muted'>
                    Corner marks snap in (0.4s, ease-enter).
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>0s, 0.12s, 0.24s</dt>
                  <dd className='text-base text-text-muted'>
                    The three headline lines settle 10px and a curtain slides
                    off each (0.5s). The text paints opaque from the first
                    frame.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>0.85s</dt>
                  <dd className='text-base text-text-muted'>
                    The description rises 14px and fades in (0.6s).
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>1s</dt>
                  <dd className='text-base text-text-muted'>
                    The buttons rise and fade in (0.6s).
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>0.8s on</dt>
                  <dd className='text-base text-text-muted'>
                    The drawing builds group by group (0 to 1.75s after its
                    start), bars grow from 1.9s, the live detail at 3.2s.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Up to 3s</dt>
                  <dd className='text-base text-text-muted'>
                    Sections already in view under the hero wait for the intro
                    to finish before they reveal.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Reduced motion</dt>
                  <dd className='text-base text-text-muted'>
                    Every step shows its end state at once.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          {/* ── Primitives ── */}
          <DesignGroup title='Primitives' />
          <DesignSection
            id='buttons'
            label='Primitives'
            title='Buttons and the call to action'
            when='Primary is always the lime Book a call, which goes to the calendar on Contact (/contact#call); secondary is the outline that draws itself on hover. The CTA unit puts one quiet line under the button: or Take the free audit, or send us a note.'
          >
            <Specimen names={['Button', 'variant="outline"']} tones>
              <div className='flex flex-wrap items-center gap-grid-1'>
                <Button size='lg'>Primary</Button>
                <Button size='lg' variant='outline'>
                  Secondary
                </Button>
                <Button size='sm'>Small</Button>
              </div>
            </Specimen>
            <Specimen
              names={['BookCallButton', 'BookCallGroup', 'secondary']}
              note='header size, then the CTA unit with audit and note'
            >
              <div className='flex flex-wrap items-start gap-stack'>
                <BookCallButton location='design' size='sm' />
                <BookCallGroup location='design' />
                <BookCallGroup location='design' secondary='note' />
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='links'
            label='Primitives'
            title='Links'
            when='Three roles only. Nav and action links get the sliding bar; inline links sit in sentences with a quiet underline.'
          >
            <Specimen names={['link-nav', 'link-icon', 'SocialIcon']} tones>
              <div className='flex flex-wrap items-center gap-grid-1'>
                <a href='#links' className='link-nav'>
                  Platform
                </a>
                <a href='#links' className='link-nav' aria-current='page'>
                  Current page
                </a>
                <SocialIcon
                  network='linkedin'
                  href='https://www.linkedin.com/company/placetostandagency/'
                  label='Place To Stand on LinkedIn'
                />
                <SocialIcon
                  network='github'
                  href='https://github.com/place-to-stand'
                  label='Place To Stand on GitHub'
                />
              </div>
            </Specimen>
            <Specimen
              names={['link-action', 'ArrowLink', 'AuditLink', 'NoteLink']}
              tones
            >
              <div className='flex flex-wrap items-center gap-grid-1'>
                <ArrowLink href='/platform'>See the platform</ArrowLink>
                <AuditLink location='design' />
                <NoteLink location='design' />
              </div>
            </Specimen>
            <Specimen names={['link-inline']} tones>
              <p className='text-base text-text-muted'>
                Links inside sentences, like{' '}
                <a href='#links' className='link-inline'>
                  this one
                </a>
                , wrap with the text.
              </p>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='marks'
            label='Primitives'
            title='Labels, bullets and chips'
            when='Lime on a light band is only ever a fill behind dark text (the label marker). Bullets and rules use the accent line.'
          >
            <Specimen
              names={['bp-label', 'bg-accent-line', 'TagRow', 'border-t']}
              tones
            >
              <div className='flex flex-col items-start gap-grid-1'>
                <span className='bp-label font-mono'>Section label</span>
                <span className='flex items-center gap-2 text-base'>
                  <span aria-hidden className='h-1.5 w-1.5 bg-accent-line' />A
                  bullet
                </span>
                <TagRow label='Instead of' tags={['HubSpot', 'Asana']} />
                <span className='w-full border-t border-border-light' />
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='logo'
            label='Primitives'
            title='Logo'
            when='The lockup spins on hover or focus: a half turn each way with a small overshoot, always finishing.'
          >
            <Specimen names={['LogoLockup']}>
              <LogoLockup />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='forms'
            label='Primitives'
            title='Forms'
            when='Inputs and the newsletter form. The full contact form lives on /contact.'
          >
            <Specimen names={['Input', 'Button']} tones>
              <div className='flex max-w-xl flex-col gap-grid-half sm:flex-row'>
                <Input placeholder='you@company.com' />
                <Button size='lg'>Send</Button>
              </div>
            </Specimen>
            <Specimen names={['FooterSubscribe']}>
              <div className='max-w-sm'>
                <FooterSubscribe />
              </div>
            </Specimen>
          </DesignSection>

          {/* ── Boxes ── */}
          <DesignGroup title='Boxes' />
          <DesignSection
            id='boxes'
            label='Boxes'
            title='Boxes and strokes'
            when='Every box on the site is one of these, and each owns its stroke: box lines are 1px, and 2px is only for selected and focus. Pages never draw a border themselves (lint: design/no-raw-border).'
          >
            <Specimen
              names={['Card', 'LinkCard', 'StatTile']}
              note='always a 1px stroke; a link card changes fill on hover'
              tones
              stack
            >
              <div className='grid gap-grid-1 sm:grid-cols-2 xl:grid-cols-3'>
                <Card className='flex flex-col gap-grid-half'>
                  <span className='type-card-title'>Card</span>
                  <span className='text-base text-text-muted'>
                    Modules, steps, facets, after-launch.
                  </span>
                </Card>
                <LinkCard href='#boxes' className='flex flex-col gap-grid-half'>
                  <span className='type-card-title'>LinkCard</span>
                  <span className='text-base text-text-muted'>
                    The whole card is one link.
                  </span>
                </LinkCard>
                <ul>
                  <StatTile value='3.5 yrs' label='One stat, one style.' />
                </ul>
              </div>
            </Specimen>
            <Specimen
              names={['Callout', 'Callout band']}
              note='the page’s one ask, or a quote: no stroke, 20px corner marks at 2px, solid accent-line'
            >
              <Callout className='flex flex-col gap-grid-half'>
                <span className='type-card-title'>Callout</span>
                <span className='text-base text-text-muted'>
                  Closing bands, the Heatonist quote, the newsletter box.
                </span>
              </Callout>
            </Specimen>
            <Specimen
              names={['Panel']}
              note='holds a form or a tool: fill only'
            >
              <Panel className='flex flex-col gap-grid-half'>
                <span className='type-card-title'>Panel</span>
                <span className='text-base text-text-muted'>
                  The contact form, audit results.
                </span>
              </Panel>
            </Specimen>
            <Specimen
              names={['RuledList', 'RuledRow', 'RuledRow accent']}
              note='a 1px top rule in the tone’s rule color; accent only on the ownership block'
              tones
            >
              <RuledList className='flex flex-col'>
                <RuledRow className='py-grid-1 text-base'>First row</RuledRow>
                <RuledRow className='py-grid-1 text-base'>Second row</RuledRow>
                <RuledRow accent className='py-grid-1 text-base'>
                  Ownership rule
                </RuledRow>
              </RuledList>
            </Specimen>
            <Specimen
              names={['SideNote', 'Chip']}
              note='a 2px accent-line bar (ink on light, lime on dark); one tag style'
              tones
            >
              <div className='flex flex-col gap-grid-1'>
                <SideNote className='flex flex-col gap-grid-half'>
                  <span className='type-card-title'>SideNote</span>
                  <span className='text-base text-text-muted'>
                    The billing promise, the proof line.
                  </span>
                </SideNote>
                <div className='flex flex-wrap gap-grid-half'>
                  <Chip>HubSpot</Chip>
                  <Chip>#1</Chip>
                </div>
              </div>
            </Specimen>
          </DesignSection>

          {/* ── Patterns ── */}
          <DesignGroup title='Patterns' />
          <DesignSection
            id='headings'
            label='Patterns'
            title='Page and section headings'
            when='PageHeader opens a page (with the dots); SectionHeading opens a section.'
          >
            <Specimen
              names={['PageHeader']}
              className='relative overflow-hidden'
            >
              <PageHeader
                label='Platform'
                title='Software you own.'
                intro='The paragraph under the title uses the intro role.'
              />
            </Specimen>
            <Specimen names={['SectionHeading']} tones stack>
              <SectionHeading
                label='What we build'
                title='Three kinds of work.'
                intro='Intro paragraph, one intro gap under the title.'
              />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='rows'
            label='Patterns'
            title='Ruled rows'
            when='Short items on a rule, in columns: What you own, the footer, the Contact points.'
          >
            <Specimen names={['OwnershipSection']} className='[&_section]:px-0'>
              <OwnershipSection />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='grouped-rows'
            label='Patterns'
            title='Grouped ruled rows'
            when='A group title in the left third and its ruled rows down the rest, the title on top below lg (Clients). One line per client: the name, who they are, what we built, their site.'
          >
            <Specimen
              names={['ClientsSection', 'limit']}
              className='[&_section]:px-0'
            >
              <ClientsSection limit={2} />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='media'
            label='Patterns'
            title='FAQ, logos, media and captions'
            when='Questions as ruled rows, the logo wall, every photo in a fixed frame, and a caption under it in body text.'
          >
            <Specimen names={['FAQ', 'RuledRow as="div"']} tones stack>
              <dl className='grid gap-x-grid-3 md:grid-cols-2'>
                {FAQ.slice(0, 2).map(item => (
                  <RuledRow
                    as='div'
                    key={item.q}
                    className='flex flex-col gap-grid-half py-grid-1'
                  >
                    <dt className='type-card-title'>{item.q}</dt>
                    <dd className='text-base text-text-muted'>{item.a}</dd>
                  </RuledRow>
                ))}
              </dl>
            </Specimen>
            <Specimen
              names={['ClientLogoWall']}
              note='white silhouettes, sized by ink'
            >
              <ClientLogoWall />
            </Specimen>
            <Specimen
              names={['MediaFrame', 'caption']}
              note='work 16:10, person 1:1, wide 21:9, cropped from the center; the caption is body text, the name in the text color'
            >
              <figure className='flex max-w-72 flex-col gap-grid-half'>
                <MediaFrame shape='person'>
                  <Image
                    src={team[0].image}
                    alt={`${team[0].name}, ${team[0].title}`}
                    fill
                    sizes='288px'
                    className='object-cover'
                  />
                </MediaFrame>
                <figcaption className='text-base text-text-muted'>
                  <span className='text-text'>Jason Desiderio.</span>{' '}
                  Co-founder, engineer.
                </figcaption>
              </figure>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='pieces'
            label='Patterns'
            title='Lifted-out UI pieces'
            when='How client work and the portal are shown: one piece of the real screen, enlarged and layered on the blueprint, built as HTML with sample data. Use it instead of a screenshot.'
          >
            <Specimen
              names={['UiPiece', 'patterns/pieces']}
              note='two Heatonist pieces'
            >
              <div className='grid gap-grid-1 md:grid-cols-2'>
                <ProductCardPiece />
                <ChangeLogPiece />
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='quote'
            label='Patterns'
            title='Quote'
            when='A client in their own words: a large opening quote mark, the quote in regular body text, then the name (mono, text color) with optional stars and a quieter source link. A group of quotes can open with a RuledLabel: a mono caps label and a 1px hairline to the group’s right edge. The mark and stars use accent-line, ink on light and lime on dark. No box, bar or rule; stack quotes 24px apart.'
          >
            <Specimen
              names={['Quote', 'rating', 'source', 'RuledLabel']}
              tones
              stack
            >
              <div className='flex max-w-xl flex-col gap-grid-1'>
                <RuledLabel>Don’t just take our word for&nbsp;it</RuledLabel>
                <Quote
                  text='They ask the right questions, understand not just what needs to be built, but why.'
                  name='Dan A.'
                  rating={5}
                  source={
                    <a
                      href='#quote'
                      className='link-action text-text-muted hover:text-text'
                    >
                      <span className='link-label'>Read on Google</span>{' '}
                      <span aria-hidden className='link-out'>
                        ↗
                      </span>
                    </a>
                  }
                />
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='chat'
            label='Patterns'
            title='Team chat'
            when='A short team chat in our own plain chat UI, for showing what people say at work (Home’s warning signs). Where it happens on top, then messages with initials, name, role and time; reactions, replies, a New divider and a typing line are optional. On first view the messages arrive one by one at the bottom and push the earlier ones up, as in Slack.'
          >
            <Specimen
              names={['TeamChat', 'BlockAvatar']}
              note='the fix sits under it'
            >
              <div className='flex max-w-md flex-col gap-grid-1'>
                <TeamChat
                  label='In your store'
                  people={[
                    { name: 'Priya', role: 'Marketing' },
                    { name: 'Leo', role: 'Support' },
                  ]}
                  messages={[
                    {
                      by: 0,
                      time: '2:03 PM',
                      text: 'Our Shopify store can’t do the thing we need.',
                      reactions: [['👀', 4]],
                    },
                    {
                      by: 1,
                      time: '2:05 PM',
                      text: 'Orders come in by DM, text and phone, and we lose track of them.',
                    },
                  ]}
                  newBefore={1}
                  typing={0}
                />
                <div className='flex flex-wrap gap-grid-half'>
                  {BLOCK_AVATAR_NAMES.map(name => (
                    <span
                      key={name}
                      className='flex flex-col items-center gap-1'
                    >
                      <BlockAvatar name={name} className='size-12' />
                      <span className='font-mono text-xs text-text-muted'>
                        {name}
                      </span>
                    </span>
                  ))}
                </div>
                <div className='flex flex-col gap-grid-half px-grid-1'>
                  <p className='text-base text-text'>
                    Custom stores and marketplaces, on Shopify when it fits.
                  </p>
                </div>
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='split'
            label='Patterns'
            title='Split section'
            proposed
            when='One statement held still on the left, a long run of content on the right: columns 1-5 and 7-12, with column 6 as air. Below lg the two stack and nothing sticks. Not used on any page yet.'
          >
            <Specimen
              names={['SplitSection', 'type-voice']}
              note='aside sticks under the nav'
            >
              <SplitSection
                aside={
                  <SectionHeading
                    label='Warning Signs'
                    title='These sound familiar? It’s time to call.'
                  />
                }
              >
                <div className='flex flex-col gap-grid-1'>
                  <span className='type-fine'>In the back office</span>
                  <blockquote className='type-voice'>
                    &ldquo;We run this on spreadsheets and it’s breaking.&rdquo;
                  </blockquote>
                  <blockquote className='type-voice'>
                    &ldquo;We pay for five tools that don’t talk to each
                    other.&rdquo;
                  </blockquote>
                </div>
              </SplitSection>
            </Specimen>
          </DesignSection>

          {/* ── Sections ── */}
          <DesignGroup title='Sections' />
          <DesignSection
            id='cards'
            label='Sections'
            title='Steps'
            when='The steps in their Home variant: five cards, with how billing works under them.'
          >
            <Specimen
              names={['StepsSection', 'showBilling']}
              className='[&_section]:px-0'
            >
              <StepsSection showBilling showLink={false} />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='featured'
            label='Sections'
            title='Results'
            when='The Heatonist case study as one block: heading and intro beside the Hot Ones lineup, then the numbers. It opens Clients.'
          >
            <Specimen names={['ResultsSection']}>
              <ResultsSection />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='cta-band'
            label='Sections'
            title='Closing band'
            when='Last in every page’s main, in its band of dots. Default title “Tell us where it hurts most.” with Book a call and “or send us a note”; pass secondary for a second button in place of the note line. The footer below this page is the real footer.'
          >
            <Specimen names={['CtaBand']} className='[&_section]:px-0'>
              <CtaBand location='design' />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='section-list'
            label='Sections'
            title='Sections and their variants'
            when={
              'Page-level blocks. Each has named variants and a fixed tone, so a page picks a section instead of composing raw pieces.'
            }
          >
            <Specimen
              names={[
                'Hero',
                'ProofSection',
                'SoundFamiliarSection',
                'OfferDetail',
                'ResultsSection',
                'StepsSection',
                'AfterLaunchSection',
                'OwnershipSection',
                'WhoYouWorkWithSection',
                'CtaBand',
              ]}
            >
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Hero</dt>
                  <dd className='text-base text-text-muted'>
                    home (the Home hero), page (an inner page title). Dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Proof</dt>
                  <dd className='text-base text-text-muted'>
                    one layout (Home, #results): the Heatonist and Hot Ones copy
                    beside four lifted-out pieces. Dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Sound familiar</dt>
                  <dd className='text-base text-text-muted'>
                    one layout (Home): three cards of clients&rsquo; own words,
                    each closed by what we build for it. Light.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Offers</dt>
                  <dd className='text-base text-text-muted'>
                    detail: Platform&rsquo;s Run, Sell and Senior help sections
                    and the data block (OfferDetail, SeniorHelpSection,
                    DataHomeSection). Each takes the tone of its band; Platform
                    alternates light and dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Results</dt>
                  <dd className='text-base text-text-muted'>
                    one layout (top of Clients). Dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Steps</dt>
                  <dd className='text-base text-text-muted'>
                    cards (Home, with billing), rows (Process). Light.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>After launch</dt>
                  <dd className='text-base text-text-muted'>
                    one layout (Platform, #after-launch). Light.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Ownership</dt>
                  <dd className='text-base text-text-muted'>
                    full (the six lines, Platform) and short (Home). Dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Who you work with</dt>
                  <dd className='text-base text-text-muted'>
                    one layout (Home): the promise beside the two founders.
                    Dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Logo wall</dt>
                  <dd className='text-base text-text-muted'>
                    one layout under the Home hero. Dark.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Closing band</dt>
                  <dd className='text-base text-text-muted'>
                    call (Book a call with &ldquo;or send us a note&rdquo;, or a
                    second button), audit (audit link only). Dark, last in every
                    page.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Header, footer, audit</dt>
                  <dd className='text-base text-text-muted'>
                    site chrome and the audit tool.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          {/* ── Templates ── */}
          <DesignGroup title='Templates' />
          <DesignSection
            id='templates'
            label='Templates'
            title='Page templates'
            when={
              'Whole-page layouts in src/components/templates. A page file keeps its metadata and data loading and renders its template.'
            }
          >
            <Specimen
              names={[
                'HomeTemplate',
                'OfferPageTemplate',
                'CaseStudyTemplate',
                'ArticleShell',
                'ArticleBody',
                'ContactTemplate',
              ]}
            >
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Home</dt>
                  <dd className='text-base text-text-muted'>
                    Hero home, logos and proof, then light and dark bands: sound
                    familiar, who you work with, steps with billing, ownership
                    short, closing band.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Offer page</dt>
                  <dd className='text-base text-text-muted'>
                    Platform: hero page, Run, Sell, Senior help, the data block
                    with ownership full, after launch, closing band.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Case study</dt>
                  <dd className='text-base text-text-muted'>
                    Heatonist: hero page with the numbers, spec rows, quote, the
                    work beside lifted-out pieces, its own closing band.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Article</dt>
                  <dd className='text-base text-text-muted'>
                    A shell shared by every post (prefetched once) and the post
                    body that streams into it.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Contact</dt>
                  <dd className='text-base text-text-muted'>
                    Hero page with three ways in, the call, the audit, the
                    message form.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>Not templated yet</dt>
                  <dd className='text-base text-text-muted'>
                    Process, About, Clients, Portal, Referral, Blog list,
                    Privacy, Terms, the audit and 404 compose sections directly.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          {/* ── Guidelines ── */}
          <DesignGroup title='Guidelines' />
          <DesignSection
            id='imagery'
            label='Guidelines'
            title='Imagery'
            when='Approved Nov 10, rule 6 Nov 13. Lint keeps every aspect ratio inside MediaFrame (design/no-raw-aspect).'
          >
            <Specimen names={['MediaFrame', 'UiPiece']} note='six rules'>
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>1. Color.</dt>
                  <dd className='text-base text-text-muted'>
                    Natural. No filters on photos or screenshots; logos keep
                    their one-color treatment.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>2. Shapes.</dt>
                  <dd className='text-base text-text-muted'>
                    Three only, through MediaFrame: 16:10 for work, 1:1 for
                    people, 21:9 for full-width moments.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>3. What goes where.</dt>
                  <dd className='text-base text-text-muted'>
                    Photos show the client’s world. Screenshots show software we
                    built, always in a frame. Drawings explain how something
                    works, never decoration.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>4. Founder photos.</dt>
                  <dd className='text-base text-text-muted'>
                    Matching light and background.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>5. Alt text.</dt>
                  <dd className='text-base text-text-muted'>
                    Describe what the work shows; alt=”” only for pure texture.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>6. Lifted-out pieces.</dt>
                  <dd className='text-base text-text-muted'>
                    Approved Nov 13. Client work and the portal are shown as
                    lifted-out pieces of real UI (UiPiece): one piece of the
                    screen, enlarged and layered on the blueprint, built as
                    HTML, sample data only. No full-page screenshots or
                    lifestyle photos in new sections.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='icons'
            label='Guidelines'
            title='Icons'
            when='Approved Nov 10. Lint keeps lucide-react inside the Icon primitive.'
          >
            <Specimen names={['Icon']} note='16 · 24 · 48'>
              <div className='flex flex-wrap items-end gap-grid-2 text-text'>
                {([16, 24, 48] as const).map(size => (
                  <div
                    key={size}
                    className='flex flex-col items-start gap-grid-half'
                  >
                    <div className='flex items-center gap-grid-half'>
                      <Icon icon={ArrowRight} size={size} />
                      <Icon icon={Check} size={size} />
                      <Icon icon={Menu} size={size} />
                    </div>
                    <span className='bp-label font-mono'>
                      {size}px · {size === 48 ? 1 : 2}px line
                    </span>
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen names={['Icon']} note='five rules'>
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>1. One set.</dt>
                  <dd className='text-base text-text-muted'>
                    Lucide, through the Icon primitive. Lint keeps lucide-react
                    inside it.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>2. Sizes.</dt>
                  <dd className='text-base text-text-muted'>
                    16 beside text, 24 for a button that is only an icon (the
                    menu). 48 for a rare feature spot.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>3. Lines.</dt>
                  <dd className='text-base text-text-muted'>
                    A fixed width at every size: 2px at 16 and 24, 1px at 48.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>4. Where.</dt>
                  <dd className='text-base text-text-muted'>
                    Only in working parts: forms, the audit, arrows, the menu.
                    No icons as section decoration.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>
                    5. Brand and social marks.
                  </dt>
                  <dd className='text-base text-text-muted'>
                    Their real shapes, in one color.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='states'
            label='Guidelines'
            title='Interaction states'
            when='Approved Nov 10. Lint (design/no-raw-focus) blocks hand-made focus rings, outlines and opacity-faded disabled states.'
          >
            <Specimen
              names={['focus-ring']}
              note='keyboard focus, shown here held on (tab through the page to see it live)'
            >
              <div className='flex flex-wrap items-start gap-grid-1'>
                <div className='flex flex-col items-start gap-grid-half p-card'>
                  <span className='bp-label font-mono'>Dark band</span>
                  <Button className='focus-ring'>Book a call</Button>
                </div>
                <div className='theme-light flex flex-col items-start gap-grid-half p-card'>
                  <span className='bp-label font-mono'>Light band</span>
                  <Button variant='outline' className='focus-ring'>
                    See the platform
                  </Button>
                </div>
              </div>
            </Specimen>
            <Specimen
              names={['Button']}
              note='rest · pressed (down 1px) · disabled · loading'
            >
              <div className='flex flex-wrap items-center gap-grid-1'>
                <Button>Send message</Button>
                <Button className='translate-y-px'>Send message</Button>
                <Button disabled>Send message</Button>
                <Button loading loadingLabel='Sending…'>
                  Send message
                </Button>
              </div>
              <div className='mt-grid-1 flex flex-wrap items-center gap-grid-1'>
                <Button variant='outline'>Send to the team</Button>
                <Button variant='outline' disabled>
                  Send to the team
                </Button>
                <Button variant='outline' loading loadingLabel='Sending…'>
                  Send to the team
                </Button>
              </div>
            </Specimen>
            <Specimen
              names={['Input', 'FieldError']}
              note='disabled · error under the field'
            >
              <div className='grid max-w-2xl gap-grid-1 md:grid-cols-2'>
                <div className='flex flex-col gap-2'>
                  <Input placeholder='you@company.com' disabled />
                </div>
                <div className='flex flex-col gap-2'>
                  <Input defaultValue='name@' aria-invalid />
                  <FieldError>Please enter a valid email address.</FieldError>
                </div>
              </div>
            </Specimen>
            <Specimen names={['Button']} note='the five rules'>
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>1. Focus.</dt>
                  <dd className='text-base text-text-muted'>
                    One ring: 2px with a 2px gap, on keyboard focus only
                    (:focus-visible). Accent-subtle on dark bands, solid ink on
                    light ones, so it reaches 3:1 on both. Every focusable
                    element gets it from the global focus-ring; nothing sets its
                    own.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>2. Pressed.</dt>
                  <dd className='text-base text-text-muted'>
                    Buttons move down 1px while pressed, nothing else.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>3. Disabled.</dt>
                  <dd className='text-base text-text-muted'>
                    One look: muted text on the muted line, no fill, and a
                    not-allowed cursor. Never faded with opacity.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>4. Loading.</dt>
                  <dd className='text-base text-text-muted'>
                    The button’s label changes (“Sending…”) with a 16px spinner
                    in front, and the button is disabled until it’s done. The
                    audit keeps its progress bar.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>5. Errors and success.</dt>
                  <dd className='text-base text-text-muted'>
                    An error is one plain sentence right under its field, in the
                    danger color, announced as it appears. Success replaces the
                    form in place.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='a11y'
            label='Guidelines'
            title='Accessibility'
            when='Approved Nov 10. npm run test:a11y and npm run test:contrast check it on every page.'
          >
            <Specimen
              names={['Input', 'Checkbox', 'Button']}
              note='control edges at 3:1, next to a soft decorative line'
            >
              <div className='grid max-w-2xl gap-grid-1 md:grid-cols-2'>
                <Input placeholder='Field edge: control' />
                <Card className='flex items-center p-grid-half text-base text-text-muted'>
                  Card edge: border (decorative)
                </Card>
                <Button variant='outline' className='self-start'>
                  Outline button
                </Button>
              </div>
            </Specimen>
            <Specimen names={['SkipLink']} note='the five rules'>
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>1. The bar.</dt>
                  <dd className='text-base text-text-muted'>
                    WCAG 2.2 AA on every page.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>2. Focus.</dt>
                  <dd className='text-base text-text-muted'>
                    The one focus ring from Interaction states, 3:1 on dark and
                    light bands.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>3. Skip to content.</dt>
                  <dd className='text-base text-text-muted'>
                    The first thing Tab reaches on every page, shown only on
                    keyboard focus. It jumps past the header to the page’s main
                    content.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>4. Checked, not hoped.</dt>
                  <dd className='text-base text-text-muted'>
                    An axe scan of every page at 390 and 1440 fails on serious
                    or critical issues, and checks one h1 per page with no
                    skipped heading levels, no repeated ids and the skip link
                    (npm run test:a11y).
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>5. Lines that matter.</dt>
                  <dd className='text-base text-text-muted'>
                    Decorative lines stay soft. The edge of anything you click
                    or type into (fields, checkboxes, outline buttons) reaches
                    3:1, from the control color.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='voice'
            label='Guidelines'
            title='Voice'
            when='How the site sounds. Approved Nov 10. The banned phrases and British spellings fail npm run lint (scripts/voice.mjs).'
          >
            <Specimen names={['scripts/voice.mjs']} note='six rules'>
              <RuledList as='dl' className='flex flex-col'>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>1. Say what we do.</dt>
                  <dd className='text-base text-text-muted'>
                    Describe the work plainly. AI is a tool we use, not who we
                    are. Never “small business” or “Next.js agency”.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>2. Short and active.</dt>
                  <dd className='text-base text-text-muted'>
                    Short words, active verbs. Cut any word that can go.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>3. Concrete or nothing.</dt>
                  <dd className='text-base text-text-muted'>
                    Name tools, times and numbers. Only claim what we can prove;
                    client numbers only with the client’s OK.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>
                    4. Sound like the engineers you’ll meet.
                  </dt>
                  <dd className='text-base text-text-muted'>
                    “We” and “you”, no hype, no stock phrases.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>5. Our own words.</dt>
                  <dd className='text-base text-text-muted'>
                    Never borrow phrasing from another site.
                  </dd>
                </RuledRow>
                <RuledRow
                  as='div'
                  className='grid gap-grid-half py-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-grid-1'
                >
                  <dt className='type-card-title'>6. House style.</dt>
                  <dd className='text-base text-text-muted'>
                    US spelling, sentence case for headings and buttons, no
                    prices.
                  </dd>
                </RuledRow>
              </RuledList>
            </Specimen>
          </DesignSection>
        </div>
      </Section>
    </main>
  )
}
