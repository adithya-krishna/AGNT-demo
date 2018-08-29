import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import cn from 'classnames';

import Button from 'components/buttons/Button';

import defaultTheme from './AppFooter.scss';
import FooterList from 'components/footers/FooterList';
import Divider from 'components/content/Divider';
import {
	Facebook,
	Twitter,
	Instagram,
	Youtube,
	Apple
} from 'components/assets/SVGIcons';
import ViewportContainer from 'components/content/ViewportContainer';

const Copyright = ({ theme }) => (
	<div className={theme.copyright}>
		<h1 className={theme.title}>AGNT</h1>
		<h4 className={theme.subtitle}>&copy; 2018 AGNT inc.</h4>
	</div>
);

class AppFooter extends Component {
	render() {
		const { theme } = this.props;
		return (
			<footer className={theme.footerWrapper}>
				<ViewportContainer theme={theme}>
					<footer className={cn(theme.section, theme.footerTop)}>
						<div className={theme.left}>
							<Button label="English" theme={theme} select flat />
							<Button
								label="Canadian"
								theme={theme}
								select
								flat
							/>
						</div>
						<div className={theme.right}>
							<FooterList
								key={'list-1'}
								theme={theme}
								title={'Artists'}
								links={[
									'Free sign up',
									'Get Discovered',
									'Get More booking',
									'Apply for events'
								]}
							/>
							<FooterList
								key={'list-2'}
								theme={theme}
								title={'Organizers'}
								links={[
									'How it works',
									'Why use AGNT?',
									'Find the right talent',
									'List your events'
								]}
							/>
							<FooterList
								key={'list-3'}
								theme={theme}
								title={'Company'}
								links={['Blog', 'About AGNT', 'Press', 'Help']}
							/>
						</div>
					</footer>
					<Divider theme={theme} />
					<footer className={cn(theme.section, theme.footerBase)}>
						<div className={theme.left}>
							<Copyright theme={theme} />
						</div>
						<div className={theme.right}>
							<FooterList
								horizontal
								key={'list-4'}
								theme={theme}
								links={['Privacy', 'Terms']}
							/>
							<FooterList
								horizontal
								icons
								key={'list-5'}
								theme={theme}
								links={[Facebook, Twitter, Instagram, Youtube]}
							/>
							<Button
								theme={theme}
								className={theme.appStoreButton}
								flat
							>
								<Apple />
								Available on the app store
							</Button>
						</div>
					</footer>
				</ViewportContainer>
			</footer>
		);
	}
}

const ThemedAppFooter = themr('AppFooter', defaultTheme)(AppFooter);
export default ThemedAppFooter;
