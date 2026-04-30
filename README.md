# Nomi second-round research prototype (Instagram + Airtable)

This version turns the original broad A/B prototype into a focused second-round test for Instagram written content.

## What this test validates
For Instagram creators, does a lightweight identity mode improve caption quality, reduce editing burden, and increase reuse intent compared with direct generation?

## Flow
1. User enters one Instagram post idea and optional notes.
2. Version A generates captions directly from the idea.
3. User selects and rates the direct caption.
4. User shapes one lightweight version of themselves through identity mode.
5. Version B generates identity-shaped Instagram captions.
6. User selects and rates the identity-shaped caption.
7. User compares A vs B, answers reuse / variation questions, and reacts to Nyla.

## Stack
- GitHub for source control
- Vercel for hosting and serverless API routes
- OpenAI for caption generation
- Airtable for response and waitlist storage

## Files
- `index.html` — prototype UI, CSS, and client-side JS
- `api/generate-a.js` — calls OpenAI for direct Instagram caption generation
- `api/generate-b.js` — calls OpenAI for identity-mode Instagram caption generation
- `api/save-response.js` — stores ratings, forced-choice answers, reuse signals, and feedback in Airtable
- `api/join-waitlist.js` — stores the Nyla waitlist email in Airtable
- `lib/prompts.js` — prompt logic and fallback captions
- `lib/airtable.js` — Airtable helper
- `lib/openai.js` and `lib/generation.js` — utility files kept for compatibility

## Environment variables in Vercel
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `AIRTABLE_TOKEN`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_RESPONSES_TABLE`
- `AIRTABLE_WAITLIST_TABLE`

## Airtable columns
This version stays compatible with the existing Airtable structure. Keep the current tables and columns.

### responses
- `session_id` (single line text)
- `platform` (single line text)
- `platform_other` (single line text)
- `task` (long text)
- `notes` (long text)
- `version_a_generation_id` (single line text)
- `version_b_generation_id` (single line text)
- `version_a_selected_index` (single line text or number)
- `version_b_selected_index` (single line text or number)
- `version_a_selected_draft` (long text)
- `version_b_selected_draft` (long text)
- `version_a_edit_score` (single line text or number)
- `version_a_match_score` (single line text or number)
- `version_b_edit_score` (single line text or number)
- `version_b_match_score` (single line text or number)
- `self_mode` (single line text)
- `self_tone` (single line text or number)
- `self_polish` (single line text or number)
- `self_energy` (single line text or number)
- `self_feel` (long text)
- `self_vibes` (single line text)
- `compare_match` (single line text)
- `compare_post` (single line text)
- `compare_edit` (single line text)
- `compare_ease` (single line text)
- `compare_next_time` (single line text)
- `action_selections` (long text)
- `save_self_intent` (single line text)
- `variation_intent` (single line text)
- `open_feedback` (long text)
- `nyla_interest_score` (single line text or number)
- `nyla_waitlist_intent` (single line text)
- `submit_completed_at` (single line text)
- `created_at` (single line text)

### waitlist
- `email` (email)
- `session_id` (single line text)
- `source` (single line text)
- `created_at` (single line text)

## Local development
```bash
npm install
npm run dev
```

## Deploy
1. Replace the project files with this folder structure.
2. Commit and push to GitHub.
3. Make sure the Vercel environment variables are still set.
4. Redeploy in Vercel.
