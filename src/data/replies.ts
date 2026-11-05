// Verbatim owner replies. Cuts only (greetings, names, signatures, phone numbers). Never reworded.
// Attribution from the companies master. Buy-side rows: industry and size only, never the state.
export type Reply = { n: number; quote: string; who: string; side: 'sell' | 'buy'; date: string; img: string };

export const replies: Reply[] = [
  { n: 1, side: 'sell', date: '2026-05', quote: "Your email caught my attention. I'm traveling at the moment but would be interested in a quick call after the 15th to discuss. Let me know a few dates and times and I'll make it happen.", who: 'Owner, printing and packaging company, Wisconsin', img: '/proof/reply-01.png' },
  { n: 2, side: 'sell', date: '2026-10', quote: "We can certainly talk. I'm usually available in the afternoons between 3 - 4pm.", who: 'Owner, packaging manufacturer, Illinois, about $8M revenue', img: '/proof/reply-02.png' },
  { n: 3, side: 'sell', date: '2026-10', quote: "I just bought out my senior partner and things have been going better than expected. I have been approached by several other firms and I'm always interested in as to how your company vet potential clients?", who: 'Owner, commercial printer, Illinois', img: '/proof/reply-03.png' },
  { n: 4, side: 'sell', date: '2026-10', quote: 'My brother and I are partners, and are both ready for retirement. An after hours telephone conversation would be of interest.', who: 'Owner, privately held company, Wisconsin', img: '/proof/reply-04.png' },
  { n: 5, side: 'sell', date: '2026-06', quote: "I don't have an offer in front of me but would be interested in talking with you if you would like. I did talk to you a few months ago about listing my business but I figured I need a couple of more years to raise my EBITDA.", who: 'Owner, manufacturing company, Wisconsin', img: '/proof/reply-05.png' },
  { n: 6, side: 'sell', date: '2026-09', quote: 'Pick a day and come se us. A factory tour and face to face meeting might be useful.', who: 'Owner, consumer products manufacturer, Wisconsin', img: '/proof/reply-06.png' },
  { n: 7, side: 'sell', date: '2026-06', quote: 'We may have an interest in your service for a certain segment of our company. I would be open to a conversation. What works for you?', who: 'Owner, metal fabrication company, Wisconsin', img: '/proof/reply-07.png' },
  { n: 8, side: 'sell', date: '2026-09', quote: 'I am on a vacation, which is oddly enough really the only time that I have to see these types of emails. I would be open to a conversation with you next week when I am in. Send me a couple of dates/times that work for you and we can find a match.', who: 'Owner, privately held company, Wisconsin', img: '/proof/reply-08.png' },
  { n: 9, side: 'buy', date: '2026-07', quote: 'Sure. I can make time today or tomorrow for a 15-minute call.', who: 'Vice President, trucking company, about $35M revenue, 175 employees', img: '/proof/reply-09.png' },
  { n: 10, side: 'buy', date: '2026-10', quote: 'Whats a good number to call you at?', who: 'Owner, office equipment dealer, about $35M revenue', img: '/proof/reply-10.png' },
  { n: 11, side: 'buy', date: '2026-09', quote: "[Company] is not currently for sale. However, I would be willing to entertain a reasonable offer should one be made. If you would like to send me your client's preliminary proposal, I would be more than happy to take a look.", who: 'Owner, laboratory equipment supplier', img: '/proof/reply-11.png' },
  { n: 12, side: 'buy', date: '2026-08', quote: "I'm interested in seeing what your firm has to say. I'm booked out for about three weeks. Please send over a few times you have in three weeks. Looking forward to the conversation.", who: 'Owner, environmental services company', img: '/proof/reply-12.png' },
  { n: 13, side: 'buy', date: '2026-06', quote: 'Were not interested in selling as were experiencing rapid growth but I still would like to chat. I am interested in discussing what the present valuation metrics look like.', who: 'Owner, logistics company', img: '/proof/reply-13.png' },
  { n: 14, side: 'buy', date: '2026-10', quote: "I'd be open to a conversation. Please throw out some dates and times mid to late next week.", who: 'Owner, aviation services company', img: '/proof/reply-14.png' },
];

export const testimonials = [
  { quote: "I'm really happy with the types of leads coming through - the quality is what stood out. I don't know what you're doing, but your AI system is really hitting the target we're trying to reach.", who: 'Joe Braier', role: 'CEO, M&A advisor, Wisconsin' },
  { quote: "We'd been burned by two agencies before Konverrt. The difference was they actually qualified everything before it reached us.", who: 'Janet', role: 'Founder, Bartoli Consulting' },
  { quote: "What sold me was how they handle replies. Nothing reaches me until it's been checked - it protects the brand.", who: 'Dylan', role: 'Founder, email marketing agency' },
];
