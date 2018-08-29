import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import cn from 'classnames';

import { IconButton } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import {
	Card as RTCard,
	CardMedia as RTCardMedia,
	CardTitle as RTCardTitle,
	CardText as RTCardText
} from 'react-toolbox/lib/card';

const TooltipIconButton = Tooltip(IconButton);

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
			portfolioUrl,
			cardText,
			avatar,
			user,
			userSubtitle,
			fullImage,
			likes,
			...others
		} = this.props;

		const { isLoading, imageURL } = this.state;

		return (
			<RTCard {...others} theme={theme}>
				<RTCardMedia
					contentOverlay
					theme={theme}
					className={cn({ [theme.isLoading]: isLoading })}
					aspectRatio={aspectRatio}
					image={imageURL}
					children={
						isLoading ? null : (
							<RTCardTitle
								theme={theme}
								className={cn({ [theme.isLoading]: isLoading })}
								avatar={avatar}
								title={user}
								subtitle={userSubtitle}
							/>
						)
					}
				/>
				<RTCardText
					theme={theme}
					className={cn({ [theme.isLoading]: isLoading })}
				>
					<TooltipIconButton
						theme={theme}
						tooltipPosition={'top'}
						tooltip={`${likes} Likes`}
						tooltipDelay={300}
						icon={'thumb_up_alt'}
					/>
					<TooltipIconButton
						theme={theme}
						href={portfolioUrl}
						tooltipPosition={'top'}
						target={'_blank'}
						icon={'local_see'}
						tooltip={`View user's portfolio page`}
						tooltipDelay={300}
					/>
					<TooltipIconButton
						theme={theme}
						tooltipPosition={'top'}
						className={theme.saveButton}
						href={fullImage}
						icon={'aspect_ratio'}
						tooltip={'View full image'}
						tooltipDelay={300}
					/>
				</RTCardText>
			</RTCard>
		);
	}
}

const ThemedCard = themr('Card', defaultTheme)(Card);
export default ThemedCard;
