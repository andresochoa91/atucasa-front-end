import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IGoBackProps {
	url?: string,
	message?: string
}

const GoBack: FC<IGoBackProps> = ({ url="", message="to home page" }): JSX.Element => {
	return (
		<Link to={ `/home${url}` }>{`Go back ${message}`}</Link>
	);
};

export default GoBack;
