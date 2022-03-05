export default function getCurrentLocation() {
  if (window.location.href.includes('teams')) {
    return 'teams';
  }

  return 'competitions';
}
