/**
 * Markdown renditions of the legal pages, served to agents that ask for
 * `text/markdown` (see proxy.ts). The HTML pages in app/privacy and app/terms
 * stay the source of truth for people; when a clause changes there, change it
 * here too. src/lib/markdown/pages.test.ts checks that every clause heading in
 * the page appears in this copy, so a missed edit fails the tests.
 */

export const PRIVACY_UPDATED = 'August 25, 2026'
export const TERMS_UPDATED = 'July 29, 2026'

export const privacyMarkdown = `This policy explains what we collect when you use placetostandagency.com, why we collect it, who we share it with, and the choices you have.

Last updated: August 25, 2026

## Who this policy covers

Place To Stand is a software studio operating from Austin, Texas and Brooklyn, New York. This policy applies to placetostandagency.com and to the forms and tools hosted on it, including our contact form and the Opportunity Audit.

It does not cover work we perform under a signed client agreement. Data we process on a client's behalf during an engagement is governed by that agreement, not by this policy.

## Information you give us

Most of what we hold is information you deliberately send us. The Opportunity Audit is the exception, and we spell that out below.

- **Contact form:** your name, email address, and message, plus your company name and website if you provide them.
- **Opportunity Audit:** your answers are recorded as you move through the audit, not only when you finish it. If you stop partway or close the tab, the answers you had given by that point stay with us, along with how far you got. If you finish and ask for your results, we also collect your name, email address, and optional company name, and we store the recommendations we generated for you.
- **Direct correspondence:** anything you send us by email.

We keep unfinished audit responses so we can see where the audit loses people and make it better. They are not used to contact you, and an unfinished audit on its own tells us nothing about who you are.

We do not ask for payment card details, government identifiers, or any special category data through this website. Please do not send sensitive personal information through our forms.

## Information collected automatically

When you browse the site we collect usage data through analytics tools. This includes pages viewed, referring pages, approximate location derived from IP address, device and browser type, and interactions such as clicks and scroll depth.

Our product analytics run through a first-party subdomain (t.placetostandagency.com). We do not build persistent analytics profiles of visitors. Browsing is measured anonymously.

When you send us a form or work through the Opportunity Audit, some of this automatically collected data is stored alongside your submission rather than kept separate. That includes the campaign or link that brought you to the site, such as UTM parameters, a Google Ads click identifier, and the referring page; your browser's user agent, screen size, time zone, and language; and the identifiers our analytics tool uses for that visit. Those identifiers include a link to a session recording of the visit. If you later give us your email address, it is held on the same record as all of the above.

We also run automated bot detection on form submissions to block spam, and our hosting provider keeps standard server logs including IP addresses.

## Cookies and similar technologies

We use cookies and browser storage to make the site work, to hold your place in the Opportunity Audit, to measure how the site is used, and to measure the performance of our advertising.

- **Audit progress:** if you start the Opportunity Audit, your answers are saved in your own browser for up to seven days so you can pick up where you left off. Clearing your browser storage removes that copy from your device.
- **Analytics:** PostHog and Vercel Analytics, used to understand which pages and features people actually use.
- **Advertising:** Google Tag Manager loads a Google Ads conversion tag, used to attribute enquiries to the ads that produced them. When you successfully submit the contact form or the audit, the email address you entered is hashed in your browser and the hash is sent to Google to improve that matching (Google calls this enhanced conversions). Google receives the hash, not the address itself, and can only match it against an account it already knows.

You can block or delete cookies through your browser settings. Doing so will not prevent you from using the site, though clearing your browser storage will discard any saved audit progress.

## How we use your information

- To reply to your enquiry and send you a copy of what you submitted.
- To generate and deliver your Opportunity Audit results.
- To evaluate whether we are a good fit for your project and to prepare a proposal.
- To send occasional updates about our work, if you have opted in.
- To understand how the site is used and improve it.
- To see where the Opportunity Audit loses people, including from responses that were never finished, so we can make it clearer.
- To detect and block spam and abuse.
- To meet our legal and accounting obligations.

We do not sell your personal information, and we do not share it with third parties for their own marketing.

## Who we share it with

We share personal information with a small number of service providers who process it on our instructions:

- **Vercel:** website hosting, traffic analytics, and bot detection.
- **Resend:** delivery of transactional and marketing email, and storage of our mailing list.
- **PostHog:** product analytics.
- **Google:** advertising conversion measurement, including a hashed copy of your email address when you submit a form.
- **Our own client portal:** infrastructure we operate to record enquiries and audit responses, including unfinished ones, and to track them through to proposal.

We may also disclose information where required by law, or in connection with a merger or sale of the business. In that case we will tell you before your information becomes subject to a different policy.

## Email and marketing

We add your name and email address to our mailing list only if you tick the opt-in box on the contact form or the audit. The box is unticked by default, and leaving it that way has no effect on your enquiry or your audit results.

Every marketing email includes an unsubscribe link, and unsubscribing takes effect immediately. Unsubscribing does not stop transactional messages such as replies to your enquiry or your audit results. You can ask us to remove you entirely by emailing hello@placetostandagency.com.

## How long we keep it

Enquiry and completed audit records are kept for three years from your last contact with us, so we have context if you return. An unfinished audit response has no contact to measure from, so we keep it for three years from the date you took it. The copy saved in your own browser expires after seven days. Mailing list entries are kept until you unsubscribe. Analytics data is kept according to our providers' standard retention periods. Records we need for tax and accounting are kept as long as the law requires.

## Your rights

Wherever you live, you can ask us to give you a copy of the personal information we hold about you, correct it, or delete it. Email hello@placetostandagency.com and we will respond within 30 days. If you took the Opportunity Audit without giving us your email address, that response is not linked to your name, so we may need more detail from you before we can find it.

If you are in the European Economic Area or the United Kingdom, you also have the right to object to or restrict processing, to data portability, and to lodge a complaint with your data protection authority. We process your information on the basis of your consent (for marketing and non-essential cookies), our legitimate interest in operating and improving our business (for analytics, for recording audit responses including unfinished ones, and for responding to enquiries), and our legal obligations.

If you are a California resident, you have the right to know what we collect, to request deletion or correction, and to opt out of sale or sharing. We do not sell or share personal information as those terms are defined under California law. We will not discriminate against you for exercising any of these rights.

## International transfers

We are based in the United States and our service providers process data in the United States. If you contact us from outside the US, your information will be transferred there. We rely on standard contractual clauses with our providers where those transfers involve personal data protected under European or UK law.

## Security

Data is transmitted over encrypted connections and held with established providers that maintain their own security programmes. Access within our team is limited to the people who need it. No system is perfectly secure, and we cannot guarantee absolute security, but we will notify affected people and regulators as required if a breach occurs.

## Children's privacy

This site is intended for businesses and is not directed at anyone under 16. We do not knowingly collect information from children. If you believe a child has sent us personal information, contact us and we will delete it.

## Changes to this policy

We will update this page when our practices change and revise the date at the top. If a change materially affects how we use information you already gave us, we will contact you directly.

## Contact us

Questions about this policy or a request about your data can go to [hello@placetostandagency.com](mailto:hello@placetostandagency.com).
`

export const termsMarkdown = `These terms govern your use of placetostandagency.com and the tools on it. Client engagements are governed by a separate signed agreement, which takes precedence over anything here.

Last updated: July 29, 2026

## Agreement to these terms

By using this website you agree to these terms. If you do not agree, please do not use the site. We may update these terms from time to time, and the date at the top reflects the current version. Continuing to use the site after a change means you accept the revised terms.

## What we do

Place To Stand is a software studio. We provide strategy, design, and software development services to businesses. This website describes those services and lets you get in touch or request an Opportunity Audit. Nothing on this site is an offer to enter into a contract, and no engagement begins until both parties sign a written agreement.

## The Opportunity Audit

The Opportunity Audit is a free informational tool. It scores the answers you provide and suggests categories of work that may be relevant to your situation.

It is not professional, legal, financial, or technical advice, and it is not a substitute for a proper discovery process. The recommendations are generated from a short questionnaire and reflect only what you told us. We make no guarantee that acting on them will produce any particular outcome, and you are responsible for any decision you make on the basis of your results.

## Engagements and statements of work

Client work begins with a mutual statement of work that defines scope, deliverables, timeline, and price. Where a statement of work or master services agreement conflicts with these terms, that document controls.

Changes to an agreed scope are handled by written change order. We will tell you the cost and schedule impact before proceeding.

## Fees and payment

Fees, payment schedule, and invoicing terms are set in each statement of work. Unless stated otherwise, invoices are due within 15 days of receipt. We may pause work on overdue accounts after giving written notice. Fees are exclusive of taxes and of third-party costs such as hosting and software licences, which are your responsibility unless we agree otherwise in writing.

## Your responsibilities

Delivery depends on your participation. You agree to:

- Provide timely feedback, decisions, and approvals.
- Give us the access, accounts, credentials, and information we need to do the work.
- Ensure you have the rights to any content, data, or materials you give us.
- Designate someone with authority to make decisions on your behalf.

Delays caused by outstanding feedback or access may shift the schedule and, where they cause us to hold capacity, may affect cost.

## Intellectual property

Ownership of the deliverables we create specifically for you transfers to you once we have received payment in full, unless your agreement says otherwise.

We retain ownership of anything we bring to the project that predates it or that we develop for general use, including our internal tools, libraries, frameworks, and know-how. Where those components are embedded in your deliverables, we grant you a perpetual, worldwide, non-exclusive licence to use them as part of those deliverables.

Third-party and open-source components remain subject to their own licences. We may describe the work publicly and include it in our portfolio unless you ask us in writing not to.

## Confidentiality

Each party will protect the other's confidential information, use it only for the purpose of the engagement, and not disclose it to anyone who does not need it. This does not apply to information that is public, already known, or independently developed, or where disclosure is required by law.

## Acceptable use of this site

Do not use this site to break the law, interfere with its operation, attempt to gain unauthorised access, scrape it at a volume that degrades service, or submit false information through our forms. We may block access for any of these reasons.

## Third-party services

This site and our work rely on third-party providers such as hosting platforms, email services, and analytics tools. We are not responsible for their availability, performance, or acts, and links to third-party sites are provided for convenience without endorsement.

## Disclaimers

This website and the Opportunity Audit are provided "as is" and "as available", without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted or error free.

Warranties covering client deliverables, if any, are set out in the applicable statement of work.

## Limitation of liability

To the fullest extent permitted by law, Place To Stand will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, data, or business opportunity, arising out of your use of this site or the Opportunity Audit.

Our total liability arising out of your use of this site is limited to one hundred US dollars. Liability arising out of a client engagement is limited as set out in the applicable agreement. Nothing here limits liability that cannot be limited by law.

## Indemnification

You agree to indemnify Place To Stand against claims, losses, and reasonable costs arising from your misuse of this site, your breach of these terms, or your infringement of a third party's rights through material you provide to us.

## Termination

You may stop using this site at any time, and we may suspend or end access to it at our discretion. Termination of a client engagement is governed by the applicable agreement. Provisions that by their nature should survive termination, including intellectual property, confidentiality, disclaimers, and limitation of liability, will do so.

## Governing law

These terms are governed by the laws of the State of Texas, without regard to its conflict of law rules. The parties agree to the exclusive jurisdiction of the state and federal courts located there. Before filing a claim, please contact us so we can try to resolve the matter directly.

## Contact us

Questions about these terms can go to [hello@placetostandagency.com](mailto:hello@placetostandagency.com).
`
