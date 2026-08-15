import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class VoiceCallingAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VoiceCallingAI',
		name: 'voiceCallingAi',
		icon: 'file:voiceCallingAi.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Place human-sounding AI voice calls with VoiceCallingAI',
		defaults: {
			name: 'VoiceCallingAI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'voiceCallingAiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.voicecallingai.com/v1',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Place a Call',
						value: 'placeCall',
						description: 'Place an AI voice call to a phone number',
						action: 'Place a call',
						routing: {
							request: {
								method: 'POST',
								url: '/calls',
							},
						},
					},
					{
						name: 'Get Call Status',
						value: 'getCallStatus',
						description: 'Retrieve the status of a previously placed call',
						action: 'Get call status',
						routing: {
							request: {
								method: 'GET',
								url: '=/call-requests/{{$parameter["callRequestId"]}}',
							},
						},
					},
				],
				default: 'placeCall',
			},
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the VoiceCallingAI agent that will make the call',
				displayOptions: {
					show: {
						operation: ['placeCall'],
					},
				},
				routing: {
					request: {
						body: {
							agent_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'to',
				type: 'string',
				required: true,
				default: '',
				placeholder: '+919909931217',
				description:
					'The phone number to call, in E.164 format (include the country code, e.g. +91)',
				displayOptions: {
					show: {
						operation: ['placeCall'],
					},
				},
				routing: {
					request: {
						body: {
							to: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['placeCall'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the person being called, available to the agent',
						routing: {
							request: {
								body: {
									variables: {
										name: '={{$value}}',
									},
								},
							},
						},
					},
					{
						displayName: 'External Reference',
						name: 'externalRef',
						type: 'string',
						default: '',
						description: 'Your own reference ID for this call (e.g. an order number)',
						routing: {
							request: {
								body: {
									external_ref: '={{$value}}',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'Call Request ID',
				name: 'callRequestId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID returned when the call was placed',
				displayOptions: {
					show: {
						operation: ['getCallStatus'],
					},
				},
			},
		],
	};
}
