import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IGoBackProps {
	url?: string
}

const GoBack: FC<IGoBackProps> = ({ url="" }): JSX.Element => {
	return (
		<Link to={ `/home${url}` }>Go back</Link>
	);
};

export default GoBack;
