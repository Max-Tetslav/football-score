import { BASE_URL, FOOTBALL_API } from '@utils/constants';
import { ICompsResponse } from '../models/compsView';

export default async function fetchComps(): Promise<ICompsResponse> {
  const url = `${BASE_URL}competitions/`;
  const request = await fetch(url, {
    method: 'GET',
    headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  });

  const response = await request.json();

  return response;
}
