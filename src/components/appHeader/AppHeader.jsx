import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className='app__header'>
            <h1 className='app__title'>
                <Link to='/marvel-info-portal' href='#'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className='app__menu'>
                <ul>
                    <li>
                        <NavLink
                            to='/marvel-info-portal'
                            style={({ isActive }) => ({
                                color: isActive ? '#9F0013' : 'inherit',
                            })}
														end
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            to='/marvel-info-portal/comics/'
                            style={({ isActive }) => ({
                                color: isActive ? '#9F0013' : 'inherit',
                            })}
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
