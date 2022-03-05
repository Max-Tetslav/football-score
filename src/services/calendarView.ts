import { BASE_URL, FOOTBALL_API } from '@utils/constants';
import { IMatchesResponse } from '../models/calendarView';

export default async function fetchMatches(
  id: number,
  page: string,
  dateFrom?: string,
  dateTo?: string,
): Promise<IMatchesResponse> {
  const url = dateTo
    ? `${BASE_URL}${page}/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
    : `${BASE_URL}${page}/${id}/matches/`;
  const request = await fetch(url, {
    method: 'GET',
    headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  });

  const response = await request.json();

  return response;
}
