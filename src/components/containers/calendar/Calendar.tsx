import React, { useCallback, useEffect, useState } from 'react';
import { Pagination, Layout, Breadcrumb, DatePicker, PageHeader, Result, Button } from 'antd';
import GameCard from '@components/common/gameCard/GameCard';
import getCurrentLocation from '@utils/helpers/getCurrentLocation';
import getCurrentViewTitle from '@utils/helpers/getCurrentViewTitle';
import { useNavigate } from 'react-router-dom';
import cl from './Calendar.module.scss';
import { useAppSelector } from '../../../hooks/appHooks';
import useFetching from '../../../hooks/useFetching';
import fetchMatches from '../../../services/calendarView';
import { IMatch } from '../../../models/calendarView';

const { RangePicker } = DatePicker;
const { Content } = Layout;
const dateFormat = 'DD/MM/YYYY';

function Calendar() {
  const matchesState: IMatch[] = useAppSelector((state) => state.calendar.matches);
  const matchesNumState = useAppSelector((state) => state.calendar.matchesNum);
  const title = useAppSelector((state) => state.currentPage.name);
  const currentId = useAppSelector((state) => state.currentPage.id);
  const currentPage = getCurrentLocation();
  const [matches, setMatches] = useState([] as IMatch[]);
  const [filteredMatches, setFilteredMatches] = useState([] as IMatch[]);
  const [matchesNum, setMatchesNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const paginationHandler = useCallback((pageNumber: number): void => {
    setPageNum(pageNumber);
  }, []);

  const calendarHandler = useCallback(
    async (_, date: string[]): Promise<void> => {
      const correctDate = date.map((item) => item.split('/').reverse().join('-'));
      const [dateFrom, dateTo] = correctDate;
      const requestedMatches = await fetchMatches(currentId, currentPage, dateFrom, dateTo);

      if (requestedMatches.matches.length < matchesNumState) {
        setFilteredMatches(requestedMatches.matches);
      } else {
        setFilteredMatches([]);
      }

      const currentMatches = requestedMatches.matches.filter((item, index) => {
        return index < 5 * pageNum && index >= 5 * pageNum - 5;
      });

      setMatchesNum(requestedMatches.count);
      setMatches(currentMatches);
      setPageNum(1);
    },
    [currentId, currentPage, pageNum, matches],
  );

  const [fetchTeams, isTeamsLoading, TeamsError] = useFetching(async () => {
    try {
      const currentMatches = matchesState.filter((_, index) => index < 5 * pageNum && index >= 5 * pageNum - 5);
      if (!currentMatches.length) {
        throw new Error('Нет матчей');
      }
      setMatches(currentMatches);
      setMatchesNum(matchesNumState);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    }
  });

  useEffect(() => {
    if (filteredMatches.length) {
      const currentMatches = filteredMatches.filter((_, index) => index < 5 * pageNum && index >= 5 * pageNum - 5);
      setMatchesNum(filteredMatches.length);
      setMatches(currentMatches);
    } else {
      try {
        const currentMatches = matchesState.filter((_, index) => index < 5 * pageNum && index >= 5 * pageNum - 5);
        setMatchesNum(matchesNumState);
        setMatches(currentMatches);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      }
    }
  }, [pageNum]);

  useEffect(() => {
    fetchTeams();
  }, [matchesState]);

  return (
    <Content className={cl.content}>
      <Breadcrumb className={cl.historyPath}>
        <Breadcrumb.Item>{getCurrentViewTitle()}</Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      {isError ? (
        <Result
          status="403"
          title="Произошла ошибка"
          subTitle="Извините, на бесплатном тарифе эти матчи недоступны"
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              Назад
            </Button>
          }
        />
      ) : (
        <>
          <PageHeader className={cl.pageHeader} title="Матчи" subTitle="Выберите дату">
            <RangePicker
              className={cl.dataPicker}
              format={dateFormat}
              onChange={calendarHandler}
              placeholder={['Дата начала', 'Дата окончания']}
            />
          </PageHeader>
          <div className={cl.cardsContainer}>
            {matches.map((item) => {
              return <GameCard game={item} key={item.id} />;
            })}
          </div>
          <Pagination
            className={cl.pagination}
            showSizeChanger={false}
            defaultCurrent={1}
            defaultPageSize={5}
            total={matchesNum}
            current={pageNum}
            onChange={paginationHandler}
            responsive
          />
        </>
      )}
    </Content>
  );
}

export default Calendar;
