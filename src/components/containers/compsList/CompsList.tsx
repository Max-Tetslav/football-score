import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Pagination, Layout, Card, Result } from 'antd';
import cl from './CompsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks';
import useFetching from '../../../hooks/useFetching';
import { updateComps, updateCompsNum } from '../../../store/reducers/compsReducer';
import { updateMatches, updateMatchesNum } from '../../../store/reducers/calendarReducer';
import { updateCurrentPageId, updateCurrentPageName } from '../../../store/reducers/currentPageReducer';
import fetchMatches from '../../../services/calendarView';
import fetchComps from '../../../services/compsView';
import { IComp, ICompsResponse } from '../../../models/compsView';

const { Content } = Layout;
const { Search } = Input;

function CompsList() {
  const compsState: IComp[] = useAppSelector((state) => state.comps.comps);
  const compsNumState: number = useAppSelector((state) => state.comps.compsNum);
  const dispatch = useAppDispatch();
  const [comps, setComps] = useState([] as IComp[]);
  const [searchedComps, setSearchedComps] = useState([] as IComp[]);
  const [searchValue, setSearchValue] = useState('');
  const [compsNum, setCompsNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [isCompsExist, setIsCompsExist] = useState(true);

  async function linkHandler(name: string, id: number): Promise<void> {
    try {
      const matches = await fetchMatches(id, 'competitions');

      dispatch(updateCurrentPageName(name));
      dispatch(updateCurrentPageId(id));
      dispatch(updateMatchesNum(matches.count));
      dispatch(updateMatches(matches.matches));
    } catch (err) {
      setIsCompsExist(false);
    }
  }

  const searchHandler = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  const paginationHandler = useCallback((pageNumber: number): void => {
    setPageNum(pageNumber);
  }, []);

  const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
    if (compsState.length === 0) {
      const data: ICompsResponse = await fetchComps();
      setCompsNum(data.count);
      dispatch(updateCompsNum(data.count));
      dispatch(updateComps(data.competitions));
      const currentComps = data.competitions.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setComps(currentComps);
    } else {
      const currentComps = compsState.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setComps(currentComps);
    }
  });

  useEffect((): void => {
    if (searchValue.length) {
      const filteredComps = compsState.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      setSearchedComps(filteredComps);
      setCompsNum(filteredComps.length);
      setPageNum(1);
      const currentComps = filteredComps.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      if (currentComps.length) {
        setComps(currentComps);
        setIsCompsExist(true);
      } else {
        setIsCompsExist(false);
      }
    } else {
      const currentComps = compsState.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setPageNum(1);
      setCompsNum(compsNumState);
      setComps(currentComps);
      setIsCompsExist(true);
    }
  }, [searchValue]);

  useEffect((): void => {
    if (searchValue.length) {
      const currentComps = searchedComps.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setComps(currentComps);
    } else {
      const currentComps = compsState.filter((_, index) => index < 6 * pageNum && index >= 6 * pageNum - 6);
      setCompsNum(compsNumState);
      setComps(currentComps);
    }
  }, [pageNum]);

  useEffect((): void => {
    fetchWords();
  }, []);

  return (
    <Content className={cl.content}>
      <div className={cl.inputContainer}>
        <Search
          placeholder="Название лиги"
          allowClear
          enterButton="Поиск"
          size="large"
          className={cl.input}
          onSearch={searchHandler}
        />
      </div>
      {isCompsExist ? (
        <>
          <div className={cl.cardsContainer}>
            {comps.map((item) => {
              return (
                <Link to={item.id.toString()} onClick={() => linkHandler(item.name, item.id)} key={item.id}>
                  <Card bordered={false} className={cl.card}>
                    <h3>{item.name}</h3>
                    <p>{item.area.name}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
          <Pagination
            className={cl.pagination}
            showSizeChanger={false}
            defaultCurrent={1}
            total={compsNum || compsNumState}
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

export default CompsList;
