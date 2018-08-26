import React from 'react';
import { themr } from 'react-css-themr';

import { FontIcon } from 'react-toolbox/lib/font_icon';

import defaultTheme from './Field.scss';

const withIcon = Component => {
	return ({
		theme,
		ref = null,
		id,
		name,
		type = 'text',
		value = '',
		label,
		onFieldChange,
		onClearClick,
		required,
		clearable,
		...others
	}) => {
		return (
			<div className={theme.formGroup}>
				<FontIcon value={'search'} />
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
				{clearable ? (
					<FontIcon onClick={onClearClick} value={'clear'} />
				) : null}
			</div>
		);
	};
};

const Input = props => <input {...props} />;
const TextArea = props => <textarea {...props} />;

const InputField = withIcon(Input);
const InputTextArea = withIcon(TextArea);

const ThemedInputField = themr('InputField', defaultTheme)(InputField);
const ThemedInputTextArea = themr('InputTextArea', defaultTheme)(InputTextArea);

export default ThemedInputField;

export { ThemedInputField as InputField, ThemedInputTextArea as InputTextArea };
