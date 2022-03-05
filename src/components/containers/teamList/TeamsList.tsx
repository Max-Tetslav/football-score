import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Card, Input, Pagination, Result } from 'antd';
import cl from './TeamsList.module.scss';
import useFetching from '../../../hooks/useFetching';
import { useAppSelector, useAppDispatch } from '../../../hooks/appHooks';
import { updateTeams, updateTeamsNum } from '../../../store/reducers/teamsReducer';
import { updateMatches, updateMatchesNum } from '../../../store/reducers/calendarReducer';
import { updateCurrentPageId, updateCurrentPageName } from '../../../store/reducers/currentPageReducer';
import fetchMatches from '../../../services/calendarView';
import fetchTeams from '../../../services/teamsView';
import { ITeam } from '../../../models/teamsView';

const { Content } = Layout;
const { Search } = Input;

function TeamsList() {
  const teamsState: ITeam[] = useAppSelector((state) => state.teams.teams);
  const teamsNumState = useAppSelector((state) => state.teams.teamsNum);
  const dispatch = useAppDispatch();
  const [teams, setTeams] = useState([] as ITeam[]);
  const [searchedTeams, setSearchedTeams] = useState([] as ITeam[]);
  const [searchValue, setSearchValue] = useState('');
  const [teamsNum, setTeamsNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [isTeamsExist, setIsTeamsExist] = useState(true);

  async function linkHandler(name: string, id: number) {
    const matches = await fetchMatches(id, 'teams');

    dispatch(updateCurrentPageId(id));
    dispatch(updateCurrentPageName(name));
    dispatch(updateMatchesNum(matches.count));
    dispatch(updateMatches(matches.matches));
  }

  const searchHandler = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  const paginationHandler = useCallback((pageNumber: number): void => {
    setPageNum(pageNumber);
  }, []);

  const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
    if (teamsState.length === 0) {
      const data = await fetchTeams();
      setTeamsNum(data.count);
      dispatch(updateTeamsNum(data.count));
      dispatch(updateTeams(data.teams));
      const currentTeams = data.teams.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setTeams(currentTeams);
    } else {
      const currentTeams = teamsState.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setTeams(currentTeams);
    }
  });

  useEffect(() => {
    if (searchValue.length) {
      const filteredTeams = teamsState.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      setSearchedTeams(filteredTeams);
      setTeamsNum(filteredTeams.length);
      setPageNum(1);
      const currentTeams = filteredTeams.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      if (currentTeams.length) {
        setTeams(currentTeams);
        setIsTeamsExist(true);
      } else {
        setIsTeamsExist(false);
      }
    } else {
      const currentTeams = teamsState.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setPageNum(1);
      setTeamsNum(teamsNumState);
      setTeams(currentTeams);
      setIsTeamsExist(true);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length) {
      const currentTeams = searchedTeams.filter((item, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setTeams(currentTeams);
    } else {
      const currentTeams = teamsState.filter((item, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setTeamsNum(teamsNumState);
      setTeams(currentTeams);
    }
  }, [pageNum]);

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <Content className={cl.content}>
      <div className={cl.inputContainer}>
        <Search
          placeholder="Название команды"
          allowClear
          enterButton="Поиск"
          size="large"
          className={cl.input}
          onSearch={searchHandler}
        />
      </div>
      {isTeamsExist ? (
        <>
          <div className={cl.cardsContainer}>
            {teams.map((item) => {
              return (
                <Link to={item.id.toString()} key={item.id} onClick={() => linkHandler(item.name, item.id)}>
                  <Card title={item.name} bordered={false} className={cl.card}>
                    <img src={item.crestUrl} alt="team-logo" style={{ width: 100, height: 100 }} />
                  </Card>
                </Link>
              );
            })}
          </div>
          <Pagination
            className={cl.pagination}
            showSizeChanger={false}
            defaultCurrent={1}
            total={teamsNum || teamsNumState}
            defaultPageSize={6}
            current={pageNum}
            onChange={paginationHandler}
            responsive
          />
        </>
      ) : (
        <>
          <Result title="Ничего не найдено" />
          <div />
        </>
      )}
    </Content>
  );
}

export default TeamsList;
