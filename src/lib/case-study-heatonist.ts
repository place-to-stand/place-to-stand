/**
 * Copy for the Heatonist case study. Approved by Heatonist (Ty Bostain) on
 * Oct 22, 2026. Keep hard traffic, order and dollar figures out of it.
 */

export const heatonistCaseStudy = {
  path: '/clients/heatonist',
  company: 'Heatonist',
  title: 'Heatonist Case Study',
  description:
    'How Place To Stand runs engineering for Heatonist and hotones.com: two busy Shopify stores, no full-time hire, and hotones.com built in under three months.',
  headline: 'A tech team without the hire',
  intro:
    'Heatonist is the hot sauce shop behind the award-winning show Hot Ones, selling online and in its own stores. Since 2023, Place To Stand has run engineering for both of its Shopify storefronts. Heatonist pays only for the hours we work, and never has to hire.',
  stats: [
    '3.5 years and counting',
    '2 storefronts: heatonist.com and hotones.com',
    'hotones.com built and launched in under 3 months',
    'Millions of visits a year across both stores',
    'About a third less than one junior engineer',
    'Up and running through every holiday rush and new season of the show',
  ],
  problem:
    "In 2023 Heatonist's long-time developer was moving on, and no one was there to take over. The business needed steady engineering every week: promotions, search, tracking, checkout changes, and new pages for each season of the show. Hiring a full-time engineer would mean salary, benefits, months of searching, and someone to manage them.",
  howWeWork:
    'Heatonist pays for the hours we work, never a salary. We log every hour and keep them posted as we go, so they can speed up for a big launch or slow down in a quiet month. Because Heatonist pays for work done, not time at a desk, every hour goes into something that ships.',
  whatWeDidIntro:
    'We took over in April 2023 and have shipped work every month since, more than 1,400 changes in all.',
  whatWeDid: [
    {
      title: 'Search and filters',
      body: 'We rebuilt search so it finds the right sauce, and put filters on every collection and search page.',
    },
    {
      title: 'Modern tooling',
      body: 'We added a proper build system, then moved the store to Vite and Tailwind, so new pages take hours, not days.',
    },
    {
      title: 'Promotions without a developer',
      body: 'The team can now run five kinds of promotion and change the banner, hero, prices and search settings themselves.',
    },
    {
      title: 'Tracking and ads',
      body: "We set up analytics events and ad pixels, so Heatonist's ad agency works in its own dashboards instead of waiting on code.",
    },
    {
      title: 'Testing',
      body: 'We check every change on phone and desktop before it goes live.',
    },
    {
      title: 'Design to code',
      body: "We turn the team's designs into working pages that match the mockups.",
    },
    {
      title: 'Behind the scenes',
      body: 'Checkout migration, email security (DMARC), SEO fixes, and custom blocks for the mobile app.',
    },
  ],
  beyondShopifyIntro:
    'Shopify covers most of what a store needs. For the rest, we build our own.',
  beyondShopify: [
    {
      title: 'Order routing',
      body: 'Wholesale and retail orders ship from different warehouses. Our custom function sends each order to the right one at checkout, so no one sorts them by hand.',
    },
    {
      title: 'Cart rules',
      body: "Our checkout function enforces Heatonist's rules for each shopper: purchase limits during Heat Week, one subscription box per order, and case minimums for wholesale buyers.",
    },
    {
      title: 'Checkout and order pages',
      body: 'We added links so customers can view and manage their orders, and a text-message sign-up, right on the order confirmation pages.',
    },
    {
      title: "Heatonist's own server",
      body: "Heatonist also ran a custom server for jobs Shopify couldn't do. We moved everything we could onto Shopify's own features, so there's less to maintain, and keep the server running for the rest.",
    },
  ],
  hotOnes:
    'In 2025 Heatonist wanted a home for Hot Ones fans. We built hotones.com in under three months, from the first line of code to launch day on May 15, 2025. It now draws more visits than heatonist.com.',
  result:
    'Heatonist runs two busy stores with the output of a dedicated team, for about a third less than one junior engineer. Both stores have stayed up through every holiday rush and every new season of the show, and the team changes most of the site without us.',
  quote: {
    text: 'Feels like an extension of our own team.',
    name: 'Ty Bostain',
    company: 'Heatonist',
  },
} as const
