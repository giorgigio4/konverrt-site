export type FaqGroup = 'pricing' | 'leads' | 'safety' | 'process' | 'compare';
export type Faq = { q: string; a: string; g: FaqGroup; home?: boolean };

export const faqGroups: { id: FaqGroup; label: string }[] = [
  { id: 'pricing', label: 'Pricing and guarantee' },
  { id: 'leads', label: 'Leads and targeting' },
  { id: 'safety', label: 'Safety, reputation and confidentiality' },
  { id: 'process', label: 'Process and getting started' },
  { id: 'compare', label: 'Compared with the alternatives' },
];

export const faqs: Faq[] = [
  { home: true, g: 'pricing', q: 'What does it cost, and is it a retainer or per lead?', a: 'Per lead, in prepaid batches of ten. $350 to $700 per lead depending on the search type and the size of your market. No retainer, no setup fee. We quote after sizing your market, and the quote is the price.' },
  { home: true, g: 'pricing', q: 'What happens if you do not deliver the ten?', a: 'Each lead we miss in the 30 days is refunded or credited to your next batch, your choice. The definition of a lead is written down before launch, so there is no argument about what counts.' },
  { home: true, g: 'leads', q: 'What exactly counts as a lead?', a: 'A business owner (or the person who controls the sale) who replied to our email and said they are open to a conversation, whose company fits the criteria you signed off, verified by us before forwarding. Out-of-office replies, brokers, "remove me" and companies outside the criteria never count.' },
  { g: 'leads', q: 'Can you target our specific mandate - industry, EBITDA band, geography?', a: 'Yes, that is the whole job. We build the list from your mandate, not from a database we already own. If the mandate is narrow we tell you how many companies exist before you buy a batch.' },
  { g: 'process', q: 'Do we approve the copy before anything goes out?', a: 'Every word. If you are regulated, your compliance reviewer approves it too. Nothing changes after approval without you seeing it.' },
  { g: 'process', q: 'How are leads handed to us?', a: 'Forwarded email with the thread and a fit note by default. CC a partner, a shared sheet, or your CRM if you prefer. We keep all communication over email. Tell us how your firm works and we fit it.' },
  { g: 'process', q: 'Can you fit a custom workflow, like introducing the owner straight to our partner?', a: "Yes. One client's partner takes every first call; we introduce the owner directly to him and log it in their sheet. If your process is unusual, describe it in the application." },
  { home: true, g: 'safety', q: 'Whose name and domain do the emails go out from?', a: "By default, our own aged, warmed sending domains and a sender who works for us, so your firm's domain and reputation never touch cold outreach and there is no warm-up wait. If you prefer the emails under your own name, we build a dedicated estate for you as a one-time investment." },
  { g: 'safety', q: 'Will this hurt our reputation or land in spam?', a: "Not if it is done the way we do it: short, specific emails at human volumes from our own aged domains and warmed mailboxes, never from your firm's own. We have sent 2.5M+ cold emails and no client's domain has ever been involved." },
  { g: 'safety', q: 'How do you keep a sale process confidential?', a: 'Owners talk to us under our name until they agree to an introduction. One owner, one introduction. Mutual NDAs are the default before work starts.' },
  { g: 'process', q: 'How fast until the first lead?', a: 'Our sending estate is already aged and warm, so the first emails go out within days of copy approval. First owner replies usually land in week two or three. A batch of ten is delivered within 30 days of launch; any lead we miss is refunded or credited.' },
  { g: 'leads', q: 'Do you work with our competitors in the same vertical?', a: 'We tell you on the first call who else we are running in your space, and we never send the same owner to two clients. If you want exclusivity on a market, ask - it is priced per search, not promised to everyone.' },
  { g: 'pricing', q: 'How many leads per month can we expect?', a: 'Ten qualified owners in 30 days per batch, and we refund the shortfall. If your market is too small to run a batch every month, sizing tells you that before you pay.' },
  { g: 'leads', q: 'Is our market big enough? Will you run out of owners?', a: 'We count it before we quote. If the market only supports one batch, we say so and you buy one batch.' },
  { g: 'safety', q: 'Who owns the list and the data when we stop?', a: 'You do. Lists, replies, the "not now" owners with follow-up dates, campaign learnings - all transfer to you.' },
  { g: 'compare', q: 'How is this different from Axial, SourceScrub or a data tool?', a: 'Those give you companies or listings. We give you an owner who already replied to a message about their specific company. Many clients run both; the tool finds the universe, we find the ones who will talk.' },
  { g: 'compare', q: 'Why not hire an in-house BDR instead?', a: 'A business development hire costs $150K to $200K loaded, ramps for months, and still needs lists, domains and copy. A batch of ten costs a fraction of one month of that and can be stopped at any time.' },
  { g: 'compare', q: 'We tried another agency and it failed. Why would this work?', a: 'Usually it failed on one of three things: the list was bought not built, the emails sounded like an agency, or "leads" were anyone who replied. We fix all three and refund what we miss, so the risk of trying again sits with us.' },
  { g: 'leads', q: 'Do you reach owners directly or through brokers?', a: "Directly. We find the owner's own email, not a role inbox or an intermediary. Brokers and listings are excluded by default." },
  { g: 'pricing', q: 'Do you take a success fee?', a: 'No. We are not a licensed broker-dealer and do not take a share of your fee or a percentage of the transaction. Finder\'s fees tied to a deal closing are regulated activity in the US; charging a flat price per qualified conversation keeps you and us on the right side of that line and keeps our incentive on quality, not on pushing a deal.' },
  { g: 'process', q: 'What do you need from us to start, and how much of our time does it take?', a: 'A mandate call, a look at the list sample, and copy approval - about two hours in the first week, then fifteen minutes a week. Four questions on the apply page start it.' },
];
