import React, { Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import InjectButton from './Button';
import { Menu as InjectMenu } from 'react-toolbox/lib/menu';

const factory = (Button, Menu) => {
	class MenuButton extends Component {
		state = {
			active: this.props.active
		};

		componentWillReceiveProps(nextProps) {
			if (this.state.active !== nextProps.active) {
				this.setState({ active: nextProps.active });
			}
		}

		handleButtonClick = event => {
			this.setState({ active: !this.state.active });
			if (this.props.onClick) this.props.onClick(event);
		};

		handleMenuHide = () => {
			this.setState({ active: false });
			if (this.props.onHide) this.props.onHide();
		};

		render() {
			const {
				active,
				children,
				className,
				label,
				rightIcon,
				buttonRipple,
				inverse,
				menuRipple,
				onHide, // eslint-disable-line
				onSelect,
				onShow,
				position,
				selectable,
				selected,
				theme,
				...other
			} = this.props;
			return (
				<div
					{...other}
					className={classnames(theme.menuButton, className)}
				>
					<Button
						theme={theme}
						label={label}
						className={theme.menuButton}
						onClick={this.handleButtonClick}
						ripple={buttonRipple}
					>
						{rightIcon ? rightIcon : null}
					</Button>
					<Menu
						active={this.state.active}
						onHide={this.handleMenuHide}
						onSelect={onSelect}
						onShow={onShow}
						position={position}
						ripple={menuRipple}
						selectable={selectable}
						selected={selected}
						theme={theme}
					>
						{children}
					</Menu>
				</div>
			);
		}
	}

	return MenuButton;
};

const MenuButton = factory(InjectButton, InjectMenu);
export default themr('menu')(MenuButton);
export { factory as menuButtonFactory };
export { MenuButton };
