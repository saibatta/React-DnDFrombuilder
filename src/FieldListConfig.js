export const fieldList = [
	{
		id: "input_textarea",
		label: "Input",
		icon: "text-color",
		schema: {
			type: "string",
			title: "Initial input Label"
		},
		uiSchema: {},
		editSchema: {
			type: "object",
			properties: {
				title: { type: "string", title: "Change Label" },
				description: {
					type: "string",
					title: "Input Value changes Change Label"
				}
			}
		},
		formData: ""
	},
	{
		id: "multilinetext",
		icon: "align-left",
		label: "Text",
		schema: {
			type: "string",
			title: "Initial input Label"
		},
		uiSchema: {
			"ui:widget": "textarea"
		},
		editSchema: {
			type: "object",
			properties: {
				title: { type: "string", title: "Change Label" },
				description: {
					type: "string",
					title: "Input Value changes Change Label"
				}
			}
		},
		formData: ""
	},
	{
		id: "checkbox",
		icon: "check",
		label: "Checkbox",
		schema: {
			type: "boolean",
			title: "Checkbox"
		},
		uiSchema: {
			title: {
				"ui:widget": "checkbox"
			}
		},
		editSchema: {
			type: "object",
			properties: {
				title: { type: "string", title: "Label" },
				required: { type: "boolean" }
			}
		},
		formData: {}
	}
];
