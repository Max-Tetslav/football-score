import React from 'react';
import { Card } from 'antd';
import transformDate from '@utils/helpers/transformDate';
import translateMatchStatus from '@utils/helpers/translateMatchStatus';
import cl from './GameCard.module.scss';
import { IMatch } from '../../../models/calendarView';

interface IProps {
  game: IMatch;
}

function GameCard({ game }: IProps) {
  const [date, time] = transformDate(game.utcDate);
  const status = translateMatchStatus(game.status);

  return (
    <Card
      className={cl.card}
      bodyStyle={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '0 20px' }}
    >
      <div className={[cl.cardItemWrapper, cl.cardItemDate].join(' ')}>
        <span className={cl.cardItem}>{date}</span>
        <span className={cl.cardItem}>{time}</span>
      </div>
      <span className={cl.cardItem}>{status}</span>
      <div className={[cl.cardItem, cl.cardItemTeams].join(' ')}>
        <span className={cl.cardItem}>{game.homeTeam.name}</span>
        <span className={cl.cardItem}> - </span>
        <span className={cl.cardItem}>{game.awayTeam.name}</span>
      </div>
      <div className={cl.cardItemWrapper}>
        <span className={cl.cardItem}>{`${
          typeof game.score.fullTime.homeTeam === 'number' ? game.score.fullTime.homeTeam : '-'
        } : ${typeof game.score.fullTime.awayTeam === 'number' ? game.score.fullTime.awayTeam : '-'}`}</span>
        <span className={cl.cardItem}>{`(${
          typeof game.score.extraTime.homeTeam === 'number' ? game.score.extraTime.homeTeam : '-'
        } : ${typeof game.score.extraTime.awayTeam === 'number' ? game.score.extraTime.awayTeam : '-'})`}</span>
        <span className={cl.cardItem}>{`(${
          typeof game.score.penalties.homeTeam === 'number' ? game.score.penalties.homeTeam : '-'
        } : ${typeof game.score.penalties.awayTeam === 'number' ? game.score.penalties.awayTeam : '-'})`}</span>
      </div>
    </Card>
  );
}

export default GameCard;
