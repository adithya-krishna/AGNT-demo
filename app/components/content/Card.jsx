import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import cn from 'classnames';

import {
	Card as RTCard,
	CardMedia as RTCardMedia,
	CardTitle as RTCardTitle,
	CardText as RTCardText
} from 'react-toolbox/lib/card';

// import Button from 'components/buttons/Button';
// import ViewportContainer from 'components/content/ViewportContainer';

import defaultTheme from './Card.scss';

class Card extends Component {
	state = {
		imageURL: '',
		isLoading: true
	};

	preloadImage = path => {
		return new Promise((resolve, reject) => {
			var image = new Image();
			image.onload = () => {
				resolve(path);
			};
			image.onerror = () => {
				reject(path);
			};
			image.src = path;
		});
	};

	// experimental async component did mount.
	// test here
	componentDidMount = async () => {
		const { image } = this.props;
		const imageURL = await this.preloadImage(image);
		this.setState({ imageURL, isLoading: false });
	};

	render() {
		const {
			theme,
			aspectRatio = 'square',
			image,
			title,
			subtitle,
			cardText,
			...others
		} = this.props;

		const { isLoading, imageURL } = this.state;

		return (
			<RTCard {...others} theme={theme}>
				<RTCardMedia
					theme={theme}
					className={cn({ [theme.isLoading]: isLoading })}
					aspectRatio={aspectRatio}
					image={imageURL}
				/>
				<RTCardTitle
					theme={theme}
					className={cn({ [theme.isLoading]: isLoading })}
					title={title}
					subtitle={subtitle}
				/>
				<RTCardText
					theme={theme}
					className={cn({ [theme.isLoading]: isLoading })}
				>
					{cardText}
				</RTCardText>
			</RTCard>
		);
	}
}

const ThemedCard = themr('Card', defaultTheme)(Card);
export default ThemedCard;
