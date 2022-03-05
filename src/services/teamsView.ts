import { BASE_URL, FOOTBALL_API } from '@utils/constants';
import { ITeamsResponse } from '../models/teamsView';

export default async function fetchTeams(): Promise<ITeamsResponse> {
  const url = `${BASE_URL}teams/`;

  const request = await fetch(url, {
    method: 'GET',
    headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  });

  const response = await request.json();

  return response;
}
