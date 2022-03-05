import { EViews } from '../../models/common';

export default function getCurrentViewTitle() {
  if (window.location.href.includes('teams')) {
    return EViews.Teams;
  }

  return EViews.Comps;
}
