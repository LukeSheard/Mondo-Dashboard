import 'isomorphic-fetch';

import {
  call,
  select,
} from 'redux-saga/effects';

import getToken from 'selectors/getToken';

export default function * (url, method = 'GET', body = null) {
  const query = {
    method,
    headers: new Headers({
      'Content-Type':	'application/json',
      Accept: 'application/json, */*',
      Authorization: `Bearer ${yield select(getToken)}`,
    }),
  };

  if (body !== null) {
    query.body = body;
  }

  const request = new Request(url, query);

  try {
    const response = yield call(fetch, request);

    if (response.error) {
      throw new Error(response);
    }

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}