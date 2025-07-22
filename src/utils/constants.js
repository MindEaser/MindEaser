// src/utils/constants.js
export const questions = [
  "Do you feel overwhelmed by daily responsibilities?",
  "Do you have trouble sleeping, either too much or too little?",
  "Do you find it difficult to concentrate or stay focused?",
  "Do you often feel sad or down without a clear reason?",
  "Do you feel anxious, worried, or on edge?",
  "Do you avoid social situations or spending time with others?",
  "Do you feel hopeless about your future?",
  "Do you experience sudden changes in your mood?",
  "Do you feel like you're not good enough or that you're a failure?",
  "Do you struggle to enjoy activities you used to find enjoyable?",
  "Do you experience physical symptoms (like headaches or fatigue) without a medical reason?",
  "Do you feel disconnected from yourself or your surroundings?",
  "Do you feel more irritated or angry than usual?",
  "Do you find it difficult to relax or calm yourself down?",
  "Do you feel like your emotions are out of your control?",
  "Do you often overthink or dwell on past events?",
  "Do you feel like a burden to others?",
  "Do you lack motivation to complete everyday tasks?",
  "Do you struggle to maintain healthy relationships with others?",
  "Do you feel safe and secure in your current environment?"
];

export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const CRISIS_KEYWORDS = [
'suicide',
'kms',
'kill',
'end my life',
'kill myself',
'kill me',
'unalive',
'ending it',
'i want to die',
'don\'t want to live',
'dont want to live',
'want to disappear',
'i want to disappear',
'die',
'sucide', // misspelling
'suicid', // misspelling
'suicde', // misspelling

// Self-Harm & Mental Health
'sh',
'self harm',
'hurt myself',
'cut myself',
'overdose',
'burn myself',
'depressed',
'depression',
'worthless',
'hopeless',
'broken',
'numb',
'empty inside',
'crying all day',
'always tired',
'nothing matters',
'can\'t go on',
'cant go on',
'no way out',
'give up',
'pain',
'hurts too much',

// Abuse & Violence
'abuse',
'abused',
'molest',
'molested',
'assault',
'raped',
'rape',
'beaten',
'violence',
'hit',
'hit me',
'threatened',
'harassed',
'bullied',
'harassment',
'groomed',
'forced',
'touch me',
'touched me',
'groom',
'threat',
'force',
'assault', // misspelling

// Crisis & Danger
'unsafe',
'danger',
'crisis',
'jump off',
'bridge',
'cliff',
'roof',
'bleeding',
'blood',
'no one cares',
'nobody loves me',
'help',

// Physical Items/Actions
'scar',
'knife',
'nife' // misspelling
];

export const CRISIS_ALERT_EMAIL = 'manit2010kshettry@gmail.com'; // TODO: Replace with real email

