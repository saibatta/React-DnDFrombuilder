export const fieldList = [
	{
		id: "form",
		icon: "align-left",
		label: "Form",
		schema: {
			title: "Form Title",
			type: "object",
			properties: {
				fname: { type: "string", title: "First Field Label" },
				lname: { type: "string", title: "Last Field Label" }
			}
		},
		uiSchema: {
			fname: { classNames: "custom-class-name" },
			lname: { classNames: "custom-class-name" },
		},
		editSchema: {
			type: "object",
			properties: {
				title: { type: "string", title: "Form Title" },
				fname_label: { type: "string", title: "First Field Label" },
				fname: { type: "string", title: "First Field Input Value" },
				lname_label: { type: "string", title: "Last Field Label" },
				lname: { type: "string", title: "Last Field Input Value" }
			}
		},
		formData: ""
	},
	{
		id: "input_textarea",
		label: "Input",
		icon: "text-color",
		schema: {
			type: "string",
			title: "Label Name",
			required: "boolean"
		},
		uiSchema: {},
		editSchema: {
			type: "object",
			properties: {
				title: { type: "string", title: "Change Label Name" },
				description: { type: "string", title: "Input Value" }
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
			title: "Label Name"
		},
		uiSchema: {
			"ui:widget": "textarea"
		},
		editSchema: {
			type: "object",
			properties: {
				title: { type: "string", title: "Change Label Name" },
				description: {
					type: "string",
					title: "Input Value"
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
				title: { type: "string", title: "Change Label Name" },
				required: { type: "boolean" }
			}
		},
		formData: false
	}
];
