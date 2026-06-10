export type CardSet = { eyebrow: string; cards: string[] };

// Six well-formed affirmations per set — present tense, first person, believable,
// no toxic positivity or guaranteed outcomes (the affirmation-craft gate). Shared
// by the printable cards, the coloring set, and the Pinterest pin so they never drift.
export const SETS: CardSet[] = [
  {
    eyebrow: 'Self-Love',
    cards: [
      'I am enough, exactly as I am.',
      'I deserve the same kindness I give others.',
      'I am worthy of love, including my own.',
      'I am allowed to take up space.',
      'I am proud of how far I have come.',
      'I am learning to be my own friend.',
    ],
  },
  {
    eyebrow: 'Gratitude',
    cards: [
      'I have enough, and I am enough.',
      'I notice the good, even on hard days.',
      'I am grateful for this breath, this moment.',
      'So much is already right in my life.',
      'I meet today with an open heart.',
      'Small joys are everywhere when I look.',
    ],
  },
  {
    eyebrow: 'Calm',
    cards: [
      'I am safe in this moment.',
      'I breathe in calm and breathe out tension.',
      'This feeling will pass, as feelings do.',
      'I can handle this one step at a time.',
      'I let go of what I cannot control.',
      'My mind is allowed to rest now.',
    ],
  },
  {
    eyebrow: 'Morning',
    cards: [
      'Today is a fresh start.',
      'I move through today with intention.',
      'I have what I need to begin.',
      'I greet today with curiosity, not fear.',
      'I choose how I show up today.',
      'Today, I am on my own side.',
    ],
  },
];

/** The single hero line used on the Pinterest pin + landing preview. */
export const HERO_AFFIRMATION = 'I am enough, exactly as I am.';
