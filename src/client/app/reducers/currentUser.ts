/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/items';
import { CurrentUserState } from '../types/redux/currentUser';
import { userApi } from '../redux/api/userApi';
import { authApi } from '../redux/api/authApi';
import { setToken } from '../utils/token';

/*
* Defines store interactions when version related actions are dispatched to the store.
*/
const defaultState: CurrentUserState = {
	isFetching: false,
	profile: null,
	token: null
};

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: defaultState,
	reducers: {
		requestCurrentUser: state => {
			state.isFetching = true
		},
		receiveCurrentUser: (state, action: PayloadAction<User>) => {
			state.isFetching = false
			state.profile = action.payload
		},
		clearCurrentUser: state => {
			state.profile = null
		},
		setUserToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				userApi.endpoints.getUserDetails.matchFulfilled,
				(state, api) => {
					state.profile = api.payload
				}
			)
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, api) => {
					// User has logged in update state, and write to local storage
					state.profile = { email: api.payload.email, role: api.payload.role }
					state.token = api.payload.token
					setToken(state.token)
				}
			)
	}
})