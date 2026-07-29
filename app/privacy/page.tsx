import type { Metadata } from 'next'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import {
  LegalHeader,
  LegalList,
  LegalSection,
} from '@/src/components/legal/legal-prose'

const UPDATED = 'July 29, 2026'
const CONTACT_EMAIL = 'hello@placetostandagency.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Place To Stand collects, uses, shares, and protects personal information submitted through our website, contact form, and opportunity audit.',
}

export default function PrivacyPage() {
  return (
    <main className='flex-1 pb-grid-4'>
      <AnimatedSection priority>
        <div className='flex flex-col gap-grid-2'>
          <LegalHeader
            title='Privacy Policy'
            updated={UPDATED}
            summary='This policy explains what we collect when you use placetostandagency.com, why we collect it, who we share it with, and the choices you have.'
          />

          <div className='flex flex-col gap-grid-2'>
            <LegalSection index={1} title='Who this policy covers'>
              <p>
                Place To Stand is a software studio operating from Austin, Texas
                and Brooklyn, New York. This policy applies to
                placetostandagency.com and to the forms and tools hosted on it,
                including our contact form and the Opportunity Audit.
              </p>
              <p>
                It does not cover work we perform under a signed client
                agreement. Data we process on a client&apos;s behalf during an
                engagement is governed by that agreement, not by this policy.
              </p>
            </LegalSection>

            <LegalSection index={2} title='Information you give us'>
              <p>We collect information only when you choose to send it.</p>
              <LegalList
                items={[
                  <>
                    <strong className='text-text'>Contact form:</strong> your
                    name, email address, and message, plus your company name and
                    website if you provide them.
                  </>,
                  <>
                    <strong className='text-text'>Opportunity Audit:</strong>{' '}
                    your name, email address, optional company name, the answers
                    you select during the audit, and the recommendations we
                    generate from them.
                  </>,
                  <>
                    <strong className='text-text'>
                      Direct correspondence:
                    </strong>{' '}
                    anything you send us by email.
                  </>,
                ]}
              />
              <p>
                We do not ask for payment card details, government identifiers,
                or any special category data through this website. Please do not
                send sensitive personal information through our forms.
              </p>
            </LegalSection>

            <LegalSection index={3} title='Information collected automatically'>
              <p>
                When you browse the site we collect usage data through analytics
                tools. This includes pages viewed, referring pages, approximate
                location derived from IP address, device and browser type, and
                interactions such as clicks and scroll depth.
              </p>
              <p>
                Our product analytics run through a first-party subdomain
                (t.placetostandagency.com). We create a persistent analytics
                profile only for visitors who identify themselves by submitting
                a form. Everyone else is measured anonymously.
              </p>
              <p>
                We also run automated bot detection on form submissions to block
                spam, and our hosting provider keeps standard server logs
                including IP addresses.
              </p>
            </LegalSection>

            <LegalSection index={4} title='Cookies and similar technologies'>
              <p>
                We use cookies and browser storage for three purposes: to make
                the site work, to measure how it is used, and to measure the
                performance of our advertising.
              </p>
              <LegalList
                items={[
                  <>
                    <strong className='text-text'>Analytics:</strong> PostHog
                    and Vercel Analytics, used to understand which pages and
                    features people actually use.
                  </>,
                  <>
                    <strong className='text-text'>Advertising:</strong> a Google
                    Ads conversion tag, used to attribute enquiries to the ads
                    that produced them.
                  </>,
                ]}
              />
              <p>
                You can block or delete cookies through your browser settings.
                Doing so will not prevent you from using the site. We honour
                Global Privacy Control signals where your browser sends them.
              </p>
            </LegalSection>

            <LegalSection index={5} title='How we use your information'>
              <LegalList
                items={[
                  'To reply to your enquiry and send you a copy of what you submitted.',
                  'To generate and deliver your Opportunity Audit results.',
                  'To evaluate whether we are a good fit for your project and to prepare a proposal.',
                  'To send occasional updates about our work, if you have opted in.',
                  'To understand how the site is used and improve it.',
                  'To detect and block spam and abuse.',
                  'To meet our legal and accounting obligations.',
                ]}
              />
              <p>
                We do not sell your personal information, and we do not share it
                with third parties for their own marketing.
              </p>
            </LegalSection>

            <LegalSection index={6} title='Who we share it with'>
              <p>
                We share personal information with a small number of service
                providers who process it on our instructions:
              </p>
              <LegalList
                items={[
                  <>
                    <strong className='text-text'>Vercel:</strong> website
                    hosting, traffic analytics, and bot detection.
                  </>,
                  <>
                    <strong className='text-text'>Resend:</strong> delivery of
                    transactional and marketing email, and storage of our
                    mailing list.
                  </>,
                  <>
                    <strong className='text-text'>PostHog:</strong> product
                    analytics.
                  </>,
                  <>
                    <strong className='text-text'>Google:</strong> advertising
                    conversion measurement.
                  </>,
                  <>
                    <strong className='text-text'>
                      Our own client portal:
                    </strong>{' '}
                    infrastructure we operate to track enquiries through to
                    proposal.
                  </>,
                ]}
              />
              <p>
                We may also disclose information where required by law, or in
                connection with a merger or sale of the business. In that case
                we will tell you before your information becomes subject to a
                different policy.
              </p>
            </LegalSection>

            <LegalSection index={7} title='Email and marketing'>
              <p>
                When you submit the contact form or complete the audit, we add
                your name and email address to our mailing list so we can follow
                up and share occasional updates. Every marketing email includes
                an unsubscribe link, and unsubscribing takes effect immediately.
              </p>
              <p>
                Unsubscribing does not stop transactional messages such as
                replies to your enquiry or your audit results. You can ask us to
                remove you entirely by emailing {CONTACT_EMAIL}.
              </p>
            </LegalSection>

            <LegalSection index={8} title='How long we keep it'>
              <p>
                Enquiry and audit records are kept for three years from your
                last contact with us, so we have context if you return. Mailing
                list entries are kept until you unsubscribe. Analytics data is
                kept according to our providers&apos; standard retention
                periods. Records we need for tax and accounting are kept as long
                as the law requires.
              </p>
            </LegalSection>

            <LegalSection index={9} title='Your rights'>
              <p>
                Wherever you live, you can ask us to give you a copy of the
                personal information we hold about you, correct it, or delete
                it. Email {CONTACT_EMAIL} and we will respond within 30 days.
              </p>
              <p>
                If you are in the European Economic Area or the United Kingdom,
                you also have the right to object to or restrict processing, to
                data portability, and to lodge a complaint with your data
                protection authority. We process your information on the basis
                of your consent (for marketing and non-essential cookies), our
                legitimate interest in operating and improving our business (for
                analytics and responding to enquiries), and our legal
                obligations.
              </p>
              <p>
                If you are a California resident, you have the right to know
                what we collect, to request deletion or correction, and to opt
                out of sale or sharing. We do not sell or share personal
                information as those terms are defined under California law. We
                will not discriminate against you for exercising any of these
                rights.
              </p>
            </LegalSection>

            <LegalSection index={10} title='International transfers'>
              <p>
                We are based in the United States and our service providers
                process data in the United States. If you contact us from
                outside the US, your information will be transferred there. We
                rely on standard contractual clauses with our providers where
                those transfers involve personal data protected under European
                or UK law.
              </p>
            </LegalSection>

            <LegalSection index={11} title='Security'>
              <p>
                Data is transmitted over encrypted connections and held with
                established providers that maintain their own security
                programmes. Access within our team is limited to the people who
                need it. No system is perfectly secure, and we cannot guarantee
                absolute security, but we will notify affected people and
                regulators as required if a breach occurs.
              </p>
            </LegalSection>

            <LegalSection index={12} title="Children's privacy">
              <p>
                This site is intended for businesses and is not directed at
                anyone under 16. We do not knowingly collect information from
                children. If you believe a child has sent us personal
                information, contact us and we will delete it.
              </p>
            </LegalSection>

            <LegalSection index={13} title='Changes to this policy'>
              <p>
                We will update this page when our practices change and revise
                the date at the top. If a change materially affects how we use
                information you already gave us, we will contact you directly.
              </p>
            </LegalSection>

            <LegalSection index={14} title='Contact us'>
              <p>
                Questions about this policy or a request about your data can go
                to{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='text-accent underline-offset-4 hover:underline'
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </LegalSection>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
