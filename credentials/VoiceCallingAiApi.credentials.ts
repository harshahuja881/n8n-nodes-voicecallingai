import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VoiceCallingAiApi implements ICredentialType {
	name = 'voiceCallingAiApi';

	displayName = 'VoiceCallingAI API';

	icon = 'file:voiceCallingAi.svg' as const;

	documentationUrl = 'https://voicecallingai.com/developers';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your VoiceCallingAI API key. It starts with "vca_". Paste only the key.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.voicecallingai.com/v1',
			url: '/wallet',
			method: 'GET',
		},
	};
}
