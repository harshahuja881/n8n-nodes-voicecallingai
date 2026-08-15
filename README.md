# n8n-nodes-voicecallingai

This is an n8n community node. It lets you use [VoiceCallingAI](https://voicecallingai.com) in your n8n workflows.

VoiceCallingAI places human-sounding AI voice calls in 11 Indian languages — for order confirmations, lead follow-ups, reminders, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

To install manually: in n8n, go to **Settings > Community Nodes**, select **Install**, and enter `n8n-nodes-voicecallingai`.

## Operations

- **Place a Call** — place an AI voice call to a phone number using one of your VoiceCallingAI agents.
- **Get Call Status** — retrieve the status of a call you previously placed, using its Call Request ID.

## Credentials

You need a VoiceCallingAI account with API access.

1. Sign up at [voicecallingai.com](https://voicecallingai.com).
2. Find your **API key** in your dashboard (it starts with `vca_`).
3. In n8n, create a new **VoiceCallingAI API** credential and paste in the key.
4. Click **Test** to confirm — it validates the key against the read-only wallet endpoint.

## Usage

### Place a Call

- **Agent ID** — the ID of the agent that should make the call (from your dashboard).
- **Phone Number** — the number to call, in **E.164 format** (include the country code, e.g. `+919909931217`). Numbers without a country code are rejected.
- **Name** (optional) — the contact's name, made available to the agent.
- **External Reference** (optional) — your own reference, e.g. an order number.

The call is placed asynchronously. A successful response returns a Call Request `id` and a `status` of `queued`.

### Get Call Status

- **Call Request ID** — the `id` returned when the call was placed.

Returns the current status of the call.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [VoiceCallingAI API documentation](https://voicecallingai.com/developers)

## License

[MIT](LICENSE)
