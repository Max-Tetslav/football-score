export default function getCurrentLocation() {
  if (window.location.href.includes('leagues')) {
    return 'competitions';
  }

  return 'teams';
}
