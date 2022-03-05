export default function translateMatchStatus(status: string): string {
  switch (status) {
    case 'SCHEDULED':
      return 'Запланирован';
      break;
    case 'LIVE':
      return 'В прямом эфире';
      break;
    case 'IN_PLAY':
      return 'В игре';
      break;
    case 'PAUSED':
      return 'Пауза';
      break;
    case 'FINISHED':
      return 'Завершен';
      break;
    case 'POSTPONED':
      return 'Отложен';
      break;
    case 'SUSPENDED':
      return 'Приостановлен';
      break;
    case 'CANCELED':
      return 'Отменен';
      break;
    default:
      return '';
      break;
  }
}
