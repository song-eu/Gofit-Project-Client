import React, { useEffect } from 'react';
import MainVideo from '../components/MainVideo';
import SearchPopup from '../components/SearchPopup';
import MainCalendar from '../components/Calendar';

import DaylogInput from '../components/DaylogInput';
import DaylogList from '../components/DaylogList';
import { useDispatch, useSelector } from 'react-redux';
import * as daylogAction from '../reducers/dayLog';
import * as loginAction from '../reducers/user';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { MainWrap, MainTopWrap } from '../style/Main';
import { LOAD_USER_REQUEST } from '../reducers/user';

axios.defaults.withCredentials = true;

const Main = (props) => {
	const daylogs = useSelector((state) => state.dayLog.daylogs);
	const { isLogin, user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(daylogAction.fetchDaylog());
	}, []);

	if (user === null) {
		return <Redirect to="/login" />;
	}

	const handleLogout = () => {
		console.log('logout clicked');
		dispatch(loginAction.postlogout());
	};

	return (
		<MainWrap>
			<MainTopWrap>
				<MainVideo />
				<MainCalendar />
			</MainTopWrap>
			<div>
				<DaylogList daylogs={daylogs} />
			</div>
			<div onClick={handleLogout}> LOGOUT </div>
		</MainWrap>
	);
};

export default Main;
