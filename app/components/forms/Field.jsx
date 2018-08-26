import React from 'react';
import { themr } from 'react-css-themr';

import defaultTheme from './field.scss';

const withWrappedLabel = Component => {
	return ({
		theme,
		ref = null,
		id,
		name,
		type = 'text',
		value = '',
		label,
		onFieldChange,
		required,
		...others
	}) => {
		return (
			<div className={theme.formGroup}>
				{label ? (
					<label htmlFor={id} className={theme.label}>
						{label}
						{required ? (
							<span className={theme.required}>*</span>
						) : null}
					</label>
				) : null}
				<Component
					ref={ref}
					id={id}
					type={type}
					name={name}
					className={theme.input}
					value={value}
					onChange={onFieldChange}
					{...others}
				/>
			</div>
		);
	};
};

const Input = props => <input {...props} />;
const TextArea = props => <textarea {...props} />;

const InputField = withWrappedLabel(Input);
const InputTextArea = withWrappedLabel(TextArea);

const ThemedInputField = themr('InputField', defaultTheme)(InputField);
const ThemedInputTextArea = themr('InputTextArea', defaultTheme)(InputTextArea);

export default ThemedInputField;

export { ThemedInputField as InputField, ThemedInputTextArea as InputTextArea };
