import type { Metadata } from 'next'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import {
  LegalHeader,
  LegalList,
  LegalSection,
} from '@/src/components/legal/legal-prose'

const UPDATED = 'July 29, 2026'
const CONTACT_EMAIL = 'hello@placetostandagency.com'
// Texas, confirmed by the business. Place To Stand also operates out of
// Brooklyn, NY, so this is a deliberate choice rather than an inferred default.
const GOVERNING_LAW = 'the State of Texas'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern use of the Place To Stand website and the Opportunity Audit, and the general conditions under which we deliver client work.',
}

export default function TermsPage() {
  return (
    <main className='flex-1 pb-grid-4'>
      <AnimatedSection priority>
        <div className='flex flex-col gap-grid-2'>
          <LegalHeader
            title='Terms of Service'
            updated={UPDATED}
            summary='These terms govern your use of placetostandagency.com and the tools on it. Client engagements are governed by a separate signed agreement, which takes precedence over anything here.'
          />

          <div className='flex flex-col gap-grid-2'>
            <LegalSection index={1} title='Agreement to these terms'>
              <p>
                By using this website you agree to these terms. If you do not
                agree, please do not use the site. We may update these terms
                from time to time, and the date at the top reflects the current
                version. Continuing to use the site after a change means you
                accept the revised terms.
              </p>
            </LegalSection>

            <LegalSection index={2} title='What we do'>
              <p>
                Place To Stand is a software studio. We provide strategy,
                design, and software development services to businesses. This
                website describes those services and lets you get in touch or
                request an Opportunity Audit. Nothing on this site is an offer
                to enter into a contract, and no engagement begins until both
                parties sign a written agreement.
              </p>
            </LegalSection>

            <LegalSection index={3} title='The Opportunity Audit'>
              <p>
                The Opportunity Audit is a free informational tool. It scores
                the answers you provide and suggests categories of work that may
                be relevant to your situation.
              </p>
              <p>
                It is not professional, legal, financial, or technical advice,
                and it is not a substitute for a proper discovery process. The
                recommendations are generated from a short questionnaire and
                reflect only what you told us. We make no guarantee that acting
                on them will produce any particular outcome, and you are
                responsible for any decision you make on the basis of your
                results.
              </p>
            </LegalSection>

            <LegalSection index={4} title='Engagements and statements of work'>
              <p>
                Client work begins with a mutual statement of work that defines
                scope, deliverables, timeline, and price. Where a statement of
                work or master services agreement conflicts with these terms,
                that document controls.
              </p>
              <p>
                Changes to an agreed scope are handled by written change order.
                We will tell you the cost and schedule impact before proceeding.
              </p>
            </LegalSection>

            <LegalSection index={5} title='Fees and payment'>
              <p>
                Fees, payment schedule, and invoicing terms are set in each
                statement of work. Unless stated otherwise, invoices are due
                within 15 days of receipt. We may pause work on overdue accounts
                after giving written notice. Fees are exclusive of taxes and of
                third-party costs such as hosting and software licences, which
                are your responsibility unless we agree otherwise in writing.
              </p>
            </LegalSection>

            <LegalSection index={6} title='Your responsibilities'>
              <p>Delivery depends on your participation. You agree to:</p>
              <LegalList
                items={[
                  'Provide timely feedback, decisions, and approvals.',
                  'Give us the access, accounts, credentials, and information we need to do the work.',
                  'Ensure you have the rights to any content, data, or materials you give us.',
                  'Designate someone with authority to make decisions on your behalf.',
                ]}
              />
              <p>
                Delays caused by outstanding feedback or access may shift the
                schedule and, where they cause us to hold capacity, may affect
                cost.
              </p>
            </LegalSection>

            <LegalSection index={7} title='Intellectual property'>
              <p>
                Ownership of the deliverables we create specifically for you
                transfers to you once we have received payment in full, unless
                your agreement says otherwise.
              </p>
              <p>
                We retain ownership of anything we bring to the project that
                predates it or that we develop for general use, including our
                internal tools, libraries, frameworks, and know-how. Where those
                components are embedded in your deliverables, we grant you a
                perpetual, worldwide, non-exclusive licence to use them as part
                of those deliverables.
              </p>
              <p>
                Third-party and open-source components remain subject to their
                own licences. We may describe the work publicly and include it
                in our portfolio unless you ask us in writing not to.
              </p>
            </LegalSection>

            <LegalSection index={8} title='Confidentiality'>
              <p>
                Each party will protect the other&apos;s confidential
                information, use it only for the purpose of the engagement, and
                not disclose it to anyone who does not need it. This does not
                apply to information that is public, already known, or
                independently developed, or where disclosure is required by law.
              </p>
            </LegalSection>

            <LegalSection index={9} title='Acceptable use of this site'>
              <p>
                Do not use this site to break the law, interfere with its
                operation, attempt to gain unauthorised access, scrape it at a
                volume that degrades service, or submit false information
                through our forms. We may block access for any of these reasons.
              </p>
            </LegalSection>

            <LegalSection index={10} title='Third-party services'>
              <p>
                This site and our work rely on third-party providers such as
                hosting platforms, email services, and analytics tools. We are
                not responsible for their availability, performance, or acts,
                and links to third-party sites are provided for convenience
                without endorsement.
              </p>
            </LegalSection>

            <LegalSection index={11} title='Disclaimers'>
              <p>
                This website and the Opportunity Audit are provided &quot;as
                is&quot; and &quot;as available&quot;, without warranties of any
                kind, whether express or implied, including implied warranties
                of merchantability, fitness for a particular purpose, and
                non-infringement. We do not warrant that the site will be
                uninterrupted or error free.
              </p>
              <p>
                Warranties covering client deliverables, if any, are set out in
                the applicable statement of work.
              </p>
            </LegalSection>

            <LegalSection index={12} title='Limitation of liability'>
              <p>
                To the fullest extent permitted by law, Place To Stand will not
                be liable for indirect, incidental, special, consequential, or
                punitive damages, or for lost profits, revenue, data, or
                business opportunity, arising out of your use of this site or
                the Opportunity Audit.
              </p>
              <p>
                Our total liability arising out of your use of this site is
                limited to one hundred US dollars. Liability arising out of a
                client engagement is limited as set out in the applicable
                agreement. Nothing here limits liability that cannot be limited
                by law.
              </p>
            </LegalSection>

            <LegalSection index={13} title='Indemnification'>
              <p>
                You agree to indemnify Place To Stand against claims, losses,
                and reasonable costs arising from your misuse of this site, your
                breach of these terms, or your infringement of a third
                party&apos;s rights through material you provide to us.
              </p>
            </LegalSection>

            <LegalSection index={14} title='Termination'>
              <p>
                You may stop using this site at any time, and we may suspend or
                end access to it at our discretion. Termination of a client
                engagement is governed by the applicable agreement. Provisions
                that by their nature should survive termination, including
                intellectual property, confidentiality, disclaimers, and
                limitation of liability, will do so.
              </p>
            </LegalSection>

            <LegalSection index={15} title='Governing law'>
              <p>
                These terms are governed by the laws of {GOVERNING_LAW}, without
                regard to its conflict of law rules. The parties agree to the
                exclusive jurisdiction of the state and federal courts located
                there. Before filing a claim, please contact us so we can try to
                resolve the matter directly.
              </p>
            </LegalSection>

            <LegalSection index={16} title='Contact us'>
              <p>
                Questions about these terms can go to{' '}
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
