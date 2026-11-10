import type { Metadata } from 'next'
import {
  PageHeader,
  Section,
  SectionHeading,
} from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
import {
  AuditLink,
  BookCallButton,
  BookCallGroup,
} from '@/src/components/layout/cta'
import { LogoLockup } from '@/src/components/layout/logo-mark'
import { SocialIcon } from '@/src/components/layout/social-icon'
import { FooterSubscribe } from '@/src/components/layout/footer-subscribe'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import {
  ArrowLink,
  OfferCard,
  OwnershipSection,
  StepsSection,
  TagRow,
} from '@/src/components/sections/home-story'
import {
  ClientsSection,
  FeaturedCaseStudy,
} from '@/src/components/sections/clients-section'
import { OFFERS } from '@/src/lib/offers'
import { DesignIndex } from './_components/design-index'
import { DesignSection, Specimen } from './_components/specimen'
import {
  LiveVar,
  SpaceBar,
  Swatch,
  TypeSample,
} from './_components/live-values'

/**
 * /design: the design system, rendered from the real tokens and components
 * (docs/design-system.md). Public so it can be shared, but noindex and in
 * neither the sitemap nor llms.txt.
 */
export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

const COLOURS = [
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
  { cls: 'type-lead', sample: 'Reading text one step up, in the text colour.' },
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
    <main className='flex-1 pt-page-start'>
      <Section priority className='pb-section'>
        <PageHeader
          label='Design System'
          title='Place To Stand, piece by piece.'
          // NEW copy, for Jason's sign-off.
          intro='The colours, type, spacing and building blocks behind placetostandagency.com, shown live. Everything here is the real piece the site uses, so this page always matches the site.'
        />
      </Section>

      <Section className='grid gap-section pb-section lg:grid-cols-12 lg:gap-x-grid-2'>
        <div className='lg:col-span-3'>
          <DesignIndex />
        </div>
        <div className='flex flex-col gap-section lg:col-span-9'>
          {/* ── Foundations ── */}
          <DesignSection
            id='colour'
            label='Foundations'
            title='Colour'
            when='Tokens only, solid colours. The left stage is a dark band, the right a light band: the same names resolve differently, so components never need a light variant.'
          >
            <Specimen
              names={['bg-*', 'text-*', 'border-*', 'accent-line']}
              note='lime on dark, ink on light'
              tones
            >
              <div className='grid gap-grid-1 sm:grid-cols-2'>
                {COLOURS.map(name => (
                  <Swatch key={name} name={name} />
                ))}
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='type'
            label='Foundations'
            title='Type'
            when='One role per text block. Sizes shown are live for this window width; resize to see each step.'
          >
            <Specimen names={TYPE.map(t => t.cls.split(' ')[0])}>
              <div className='flex flex-col gap-grid-1'>
                {TYPE.map(t => (
                  <TypeSample key={t.cls} cls={t.cls} sample={t.sample} />
                ))}
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='spacing'
            label='Foundations'
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
            label='Foundations'
            title='Motion'
            when='Three hover timings and one easing for the whole site; the logo spin has its own. Hover the buttons and links below to feel them.'
          >
            <Specimen
              names={[
                '--link-dur',
                '--hover-dur',
                '--hover-ease',
                '--spin-dur',
              ]}
            >
              <div className='flex flex-col'>
                {[
                  '--link-dur',
                  '--hover-dur',
                  '--hover-ease',
                  '--spin-dur',
                ].map(name => (
                  <LiveVar key={name} name={name} />
                ))}
              </div>
            </Specimen>
          </DesignSection>

          {/* ── Components ── */}
          <DesignSection
            id='buttons'
            label='Components'
            title='Buttons and the call to action'
            when='Primary is always the lime Book a call; secondary is the outline that draws itself on hover. The CTA unit pairs Book a call with the audit link.'
          >
            <Specimen names={['Button', 'variant="outline"']} tones>
              <div className='flex flex-wrap items-center gap-grid-1'>
                <Button size='lg'>Primary</Button>
                <Button size='lg' variant='outline' className='border-2'>
                  Secondary
                </Button>
                <Button size='sm'>Small</Button>
              </div>
            </Specimen>
            <Specimen
              names={['BookCallButton', 'BookCallGroup']}
              note='header size, then the CTA unit'
            >
              <div className='flex flex-wrap items-start gap-stack'>
                <BookCallButton location='design' size='sm' />
                <BookCallGroup location='design' buttonClassName='min-w-60' />
              </div>
            </Specimen>
          </DesignSection>

          <DesignSection
            id='links'
            label='Components'
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
            <Specimen names={['link-action', 'ArrowLink', 'AuditLink']} tones>
              <div className='flex flex-wrap items-center gap-grid-1'>
                <ArrowLink href='/platform'>See the platform</ArrowLink>
                <AuditLink location='design' />
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
            label='Components'
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
            label='Components'
            title='Logo'
            when='The lockup spins on hover or focus: a half turn each way with a small overshoot, always finishing.'
          >
            <Specimen names={['LogoLockup']}>
              <LogoLockup />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='forms'
            label='Components'
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

          {/* ── Patterns ── */}
          <DesignSection
            id='headings'
            label='Patterns'
            title='Page and section headings'
            when='PageHeader opens a page (with the dots); SectionHeading opens a section.'
          >
            <Specimen names={['PageHeader']}>
              <PageHeader
                label='Platform'
                title='Software you own.'
                intro='The paragraph under the title uses the intro role.'
              />
            </Specimen>
            <Specimen names={['SectionHeading']} tones>
              <SectionHeading
                label='What we build'
                title='Two kinds of work.'
                intro='Intro paragraph, one intro gap under the title.'
              />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='cards'
            label='Patterns'
            title='Offer cards and steps'
            when='Cards sit 24px apart on the grid; steps carry a time marker.'
          >
            <Specimen names={['OfferCard']} tones>
              <OfferCard offer={OFFERS[0]} />
            </Specimen>
            <Specimen names={['StepsSection']} className='[&_section]:px-0'>
              <StepsSection showLink={false} />
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
            id='alt-row'
            label='Patterns'
            title='Alternating row'
            when='A big image beside its text, switching sides each row (Clients, About). One shared grid, ALT_ROW.'
          >
            <Specimen
              names={['ALT_ROW', 'ClientsSection']}
              className='[&_section]:px-0'
            >
              <ClientsSection limit={2} />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='featured'
            label='Patterns'
            title='Featured case study'
            when='The case study block that opens Clients.'
          >
            <Specimen names={['FeaturedCaseStudy']}>
              <FeaturedCaseStudy />
            </Specimen>
          </DesignSection>

          <DesignSection
            id='cta-band'
            label='Patterns'
            title='Closing band'
            when='Last in every page’s main, in its band of dots. The footer below this page is the real footer.'
          >
            <Specimen names={['CtaBand']} className='[&_section]:px-0'>
              <CtaBand location='design' />
            </Specimen>
          </DesignSection>
        </div>
      </Section>
    </main>
  )
}
