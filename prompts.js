function clampText(value) {
  return String(value || '').trim();
}

function num(value, fallback = 50) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function bucket(value, lowLabel, midLabel, highLabel) {
  const n = num(value);
  if (n <= 33) return lowLabel;
  if (n >= 67) return highLabel;
  return midLabel;
}

function inferInstagramGoal(mode, tone, polish, energy, selfFeel) {
  const text = `${mode} ${selfFeel}`.toLowerCase();

  if (mode === 'Polished lifestyle voice') return 'appeal, clarity, and tasteful social polish';
  if (mode === 'Soft personal storyteller') return 'emotional closeness, warmth, and believable intimacy';
  if (mode === 'Trend-aware curator') return 'cultural relevance, expressive timing, and social freshness';
  if (mode === 'Smart playful creator') return 'clear point of view, light wit, and memorable phrasing';
  if (text.includes('reflective') || text.includes('thoughtful')) return 'reflection, warmth, and quiet distinctiveness';
  if (num(polish) >= 65) return 'caption appeal, tasteful polish, and post-readiness';
  if (num(tone) <= 35) return 'warmth, intimacy, and emotional resonance';
  return 'Instagram fit, memorability, and an intentional voice';
}

function inferReaderEffect(mode, tone, polish, energy) {
  const softSharp = bucket(tone, 'gently invited in', 'naturally engaged', 'lightly intrigued');
  const personalPolished = bucket(polish, 'close to the writer', 'clear about the feeling', 'drawn to the curation');
  const calmExpressive = bucket(energy, 'settled into the moment', 'carried through the caption', 'given a little spark');

  if (mode === 'Soft personal storyteller') {
    return `make the reader feel ${softSharp}, emotionally close, and ${calmExpressive}`;
  }
  if (mode === 'Polished lifestyle voice') {
    return `make the reader feel ${personalPolished}, visually oriented, and quietly interested`;
  }
  if (mode === 'Trend-aware curator') {
    return 'make the reader feel current, socially tuned, and interested enough to keep reading';
  }
  if (mode === 'Smart playful creator') {
    return 'make the reader feel entertained, clear, and pleasantly surprised';
  }
  return `make the reader feel ${softSharp}, ${personalPolished}, and ${calmExpressive}`;
}

function inferDistinctivenessStrategy(mode, tone, polish, energy, selfFeel, vibes) {
  const items = [];
  const vibesText = (vibes || []).join(', ').toLowerCase();
  const selfText = String(selfFeel || '').toLowerCase();

  items.push('use concrete detail instead of generic summary');
  items.push('make each caption different in angle, opening, and emotional shape');
  items.push('make the caption feel like something a creator would actually post, not a generic AI answer');
  items.push('keep the writing skimmable, personal, and native to Instagram captions');

  if (num(tone) <= 35) {
    items.push('use softness through implication, warmth, and restraint');
  } else if (num(tone) >= 67) {
    items.push('use sharper framing, cleaner claims, and a more confident point of view');
  } else {
    items.push('balance warmth with clarity so the caption feels legible and human');
  }

  if (num(polish) >= 67) {
    items.push('make the caption feel curated and aesthetically controlled without sounding like an ad');
  } else if (num(polish) <= 33) {
    items.push('keep a little lived-in texture so the caption feels unforced');
  }

  if (num(energy) >= 67) {
    items.push('increase rhythm and lift without becoming loud or performative');
  } else if (num(energy) <= 33) {
    items.push('keep the pacing calm, measured, and quietly confident');
  }

  if (mode === 'Thoughtful sharer') {
    items.push('build distinction through reflection, observation, and a small internal shift');
  }
  if (mode === 'Polished lifestyle voice') {
    items.push('build distinction through tasteful curation, clarity, and understated desirability');
  }
  if (mode === 'Soft personal storyteller') {
    items.push('build distinction through tenderness, closeness, and specific emotional detail');
  }
  if (mode === 'Trend-aware curator') {
    items.push('build distinction through cultural framing and expressive timing');
  }
  if (mode === 'Smart playful creator') {
    items.push('build distinction through clever framing, crisp insight, and light charm');
  }

  if (vibesText.includes('clean') || vibesText.includes('refined')) {
    items.push('favor cleaner structure and tasteful restraint');
  }
  if (vibesText.includes('cozy') || vibesText.includes('dreamy')) {
    items.push('favor warmth, atmosphere, and gentle sensory detail');
  }
  if (vibesText.includes('playful')) {
    items.push('favor charm, surprise, and lightly expressive rhythm');
  }

  if (selfText.includes('real') || selfText.includes('personal')) {
    items.push('make the caption feel personal without oversharing');
  }
  if (selfText.includes('polished')) {
    items.push('make the caption edited and appealing without losing human texture');
  }
  if (selfText.includes('warm')) {
    items.push('translate warmth into specificity and pacing, not sentimental wording');
  }

  return items;
}

function inferRestraintRules(mode, tone, polish) {
  const items = [
    'avoid generic motivational language',
    'avoid obvious AI cadence and overly symmetrical phrasing',
    'avoid clichés, filler, and vague universal statements',
    'avoid caption language that sounds like a brand campaign unless the user asks for it',
    'do not overexplain the feeling or lesson',
    'do not use bullet lists, numbered lists, dash-line formatting, or em dashes in the caption body',
    'do not use emojis unless the user explicitly asks for them',
    'do not use hashtags unless the user explicitly asks for them'
  ];

  if (mode === 'Soft personal storyteller' || num(tone) <= 35) {
    items.push('avoid melodrama, forced vulnerability, or over-sharing');
  }

  if (mode === 'Polished lifestyle voice' || num(polish) >= 67) {
    items.push('avoid sterile perfection or ad-like polish');
  }

  if (mode === 'Smart playful creator') {
    items.push('avoid trying too hard to be funny');
  }

  if (mode === 'Trend-aware curator') {
    items.push('avoid trend-chasing language that feels borrowed or hollow');
  }

  return items;
}

function inferStructureStrategies(mode, energy) {
  const base = [
    'Draft 1: resonance-first, with emotional clarity and a natural caption rhythm',
    'Draft 2: appeal-first, with a stronger opening and higher post-likelihood',
    'Draft 3: distinctiveness-first, with a more original angle or framing move'
  ];

  if (mode === 'Smart playful creator') {
    base[0] = 'Draft 1: clear and charming';
    base[1] = 'Draft 2: sharper and more engaging';
    base[2] = 'Draft 3: most original framing';
  }

  if (mode === 'Polished lifestyle voice') {
    base[0] = 'Draft 1: soft and caption-native';
    base[1] = 'Draft 2: more curated and visually aware';
    base[2] = 'Draft 3: most distinctive and polished';
  }

  if (num(energy) <= 33) {
    base.push('keep pacing measured and avoid overloading the opening');
  } else if (num(energy) >= 67) {
    base.push('make openings more immediate and vivid');
  }

  return base;
}

function inferFormattingRules(polish, energy) {
  const rules = [
    'make the caption visually clean and easy to scan',
    'prefer short paragraphs over dense blocks',
    'use natural line breaks where they improve rhythm',
    'keep spacing intentional and polished',
    'do not use bullet lists, numbered lists, dash-line formatting, or em dashes in the body',
    'do not over-punctuate for drama',
    'do not make every sentence the same length'
  ];

  if (num(polish) >= 67) {
    rules.push('make the formatting feel neat, tasteful, and socially polished');
  }

  if (num(energy) >= 67) {
    rules.push('allow a little more rhythm and movement, but keep the layout clean');
  }

  return rules;
}

export function compileCharacterStrategy({
  platform,
  task,
  notes,
  mode,
  tone,
  polish,
  energy,
  selfFeel,
  vibes
}) {
  const resolvedMode = clampText(mode) || 'Thoughtful sharer';
  const resolvedFeel = clampText(selfFeel);
  const resolvedVibes = Array.isArray(vibes) ? vibes : [];

  return {
    social_goal: inferInstagramGoal(resolvedMode, tone, polish, energy, resolvedFeel),
    reader_effect: inferReaderEffect(resolvedMode, tone, polish, energy),
    distinctiveness_strategy: inferDistinctivenessStrategy(
      resolvedMode, tone, polish, energy, resolvedFeel, resolvedVibes
    ),
    restraint_rules: inferRestraintRules(resolvedMode, tone, polish),
    structure_strategies: inferStructureStrategies(resolvedMode, energy),
    formatting_rules: inferFormattingRules(polish, energy),
    voice_posture: {
      tone_axis: bucket(tone, 'soft / intimate / implied', 'balanced / natural / clear', 'sharp / crisp / assertive'),
      polish_axis: bucket(polish, 'personal / lived-in / human', 'balanced / edited / natural', 'curated / aesthetic / polished'),
      energy_axis: bucket(energy, 'calm / measured / restrained', 'steady / dynamic / controlled', 'expressive / lively / lifted')
    }
  };
}

export function buildDirectPrompt({ platform, task, notes }) {
  return `
You are helping write an Instagram caption.

Write exactly 3 distinct caption drafts.
The drafts should feel natural, human, clear, and usable for Instagram.
They should be personal, skimmable, and caption-native.
Prefer short paragraphs and natural line breaks when helpful.
Avoid generic AI phrasing, clichés, filler, and overly polished inspirational language.
Do not use emojis unless the user explicitly asks for them.
Do not use hashtags unless the user explicitly asks for them.
Do not use bullet lists, numbered lists, dash-line formatting, or em dashes in the caption body.

Return only valid JSON in this shape:
{
  "drafts": [
    { "title": "Short option name", "body": "Caption text", "tone": "Tone label" },
    { "title": "Short option name", "body": "Caption text", "tone": "Tone label" },
    { "title": "Short option name", "body": "Caption text", "tone": "Tone label" }
  ]
}

User wants to post about:
${clampText(task)}

Optional notes or angle:
${clampText(notes)}
`.trim();
}

export function buildCharacterPrompt({
  platform,
  task,
  notes,
  mode,
  tone,
  polish,
  energy,
  selfFeel,
  vibes
}) {
  const strategy = compileCharacterStrategy({
    platform,
    task,
    notes,
    mode,
    tone,
    polish,
    energy,
    selfFeel,
    vibes
  });

  return `
You are helping write an Instagram caption.

This is the identity-mode generation path.
Your job is to make the caption feel more socially intentional, more appealing, more distinctive, and more aligned to the intended version of the user.

Write exactly 3 distinct caption drafts.

Important:
- Draft 1 should optimize for resonance and emotional fit.
- Draft 2 should optimize for appeal and post-likelihood.
- Draft 3 should optimize for distinctiveness and originality.
- All 3 should still feel natural, believable, and ready to post.
- Make the writing feel curated and thoughtful, not generic.
- Do not make the captions sound like AI templates.
- Do not mention sliders, hidden strategy, identity settings, or modes.
- Avoid clichés, filler, forced vulnerability, generic life lessons, and corporate tone.
- Make the writing socially legible: something that feels intentional and attractive to encounter on Instagram.
- Use specific detail, framing, rhythm, restraint, and formatting to create effect.
- Make the identity-mode path meaningfully stronger than direct generation through curation and fit, not loudness.
- Do not use bullet lists, numbered lists, dash-line formatting, or em dashes in the caption body.
- Do not use emojis unless the user explicitly asks for them.
- Do not use hashtags unless the user explicitly asks for them.
- Make the formatting visually clean and polished.
- Prefer short paragraphs and intentional spacing.
- Use line breaks only when they genuinely improve flow, emphasis, or readability.

Return only valid JSON in this shape:
{
  "drafts": [
    { "title": "Short option name", "body": "Caption text", "tone": "Tone label" },
    { "title": "Short option name", "body": "Caption text", "tone": "Tone label" },
    { "title": "Short option name", "body": "Caption text", "tone": "Tone label" }
  ]
}

Platform:
Instagram

User wants to post about:
${clampText(task)}

Optional notes or angle:
${clampText(notes)}

Identity mode:
${clampText(mode)}

What this version should feel like on Instagram:
${clampText(selfFeel)}

Vibes:
${(vibes || []).join(', ')}

Voice posture:
- Tone axis: ${strategy.voice_posture.tone_axis}
- Polish axis: ${strategy.voice_posture.polish_axis}
- Energy axis: ${strategy.voice_posture.energy_axis}

Instagram goal:
${strategy.social_goal}

Desired reader effect:
${strategy.reader_effect}

Distinctiveness strategy:
- ${strategy.distinctiveness_strategy.join('\n- ')}

Restraint rules:
- ${strategy.restraint_rules.join('\n- ')}

Draft structure strategy:
- ${strategy.structure_strategies.join('\n- ')}

Formatting rules:
- ${strategy.formatting_rules.join('\n- ')}
`.trim();
}

export function parseDraftsFromText(text, fallback) {
  try {
    const parsed = JSON.parse(text);
    if (parsed && Array.isArray(parsed.drafts) && parsed.drafts.length) {
      return parsed.drafts.slice(0, 3).map((d, i) => ({
        title: d.title || `Option ${i + 1}`,
        body: d.body || '',
        tone: d.tone || 'Generated'
      }));
    }
  } catch (e) {}

  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (parsed && Array.isArray(parsed.drafts) && parsed.drafts.length) {
        return parsed.drafts.slice(0, 3).map((d, i) => ({
          title: d.title || `Option ${i + 1}`,
          body: d.body || '',
          tone: d.tone || 'Generated'
        }));
      }
    } catch (e) {}
  }

  return fallback;
}

export function fallbackDraftsA(task, platform) {
  return [
    {
      title: 'Simple caption',
      body: `A small moment I keep thinking about: ${task}.\n\nNothing dramatic, just the kind of thing that stays with you a little longer than expected.`,
      tone: 'Direct · Natural'
    },
    {
      title: 'Warm reflection',
      body: `There was something quietly nice about ${task}.\n\nI wanted to remember it before it turned into another normal day.`,
      tone: 'Warm · Reflective'
    },
    {
      title: 'Clean note',
      body: `${task}\n\nA simple reminder that some moments do not need to be bigger to matter.`,
      tone: 'Simple · Skimmable'
    }
  ];
}

export function fallbackDraftsB(task, platform, mode) {
  return [
    {
      title: `${mode} resonance`,
      body: `I keep coming back to ${task}.\n\nNot because it was loud or perfect, but because it felt like a softer version of the day. The kind I usually almost miss.`,
      tone: 'Resonant · Identity-shaped'
    },
    {
      title: `${mode} appeal`,
      body: `${task}\n\nA small scene, a clear feeling, and a little more proof that the best parts of a day are usually the ones that do not announce themselves.`,
      tone: 'Appealing · Caption-ready'
    },
    {
      title: `${mode} distinctiveness`,
      body: `I used to think ${task} had to become a bigger story before it was worth sharing.\n\nMaybe it is enough that it felt real while it was happening.`,
      tone: 'Distinctive · Personal'
    }
  ];
}
