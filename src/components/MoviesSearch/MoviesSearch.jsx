import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchFilms } from '../../shared/services/fetchFilms';

import style from './MoviesSearch.module.css';

import searchIcon from '../img/searchIcon.svg';
import FilmsList from '../FilmsList/FilmsList';

const MoviesSearch = () => {
  const [searchWord, setSearchWord] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [filmsData, setFilmsData] = useState({
    films: [],
    err: null,
    loading: false,
    notFoundMessage: ``,
  });

  const searchParamsWord = searchParams.get('query');

  useEffect(() => {
    searchParamsWord && takeFetchData();
    // eslint-disable-next-line
  }, []);

  const handleChange = useCallback(ev => {
    setSearchWord(ev.target.value);
  }, []);

  const handleSubmit = ev => {
    ev.preventDefault();
    setSearchParams({ query: searchWord });
    searchWord.length && takeFetchData();
  };

  async function takeFetchData() {
    setFilmsData(prevState => {
      return { ...prevState, loading: true };
    });
    try {
      const data = await searchFilms(searchWord || searchParamsWord);
      if (!data.results.length) {
        setFilmsData({
          films: [],
          notFoundMessage: `There is no results for: "${searchWord}"`,
          loading: false,
          err: null,
        });
        return;
      }
      setFilmsData(prevState => {
        return {
          ...prevState,
          films: data.results,
          loading: false,
          notFoundMessage: ``,
        };
      });
    } catch (err) {
      console.log(err);
      setFilmsData(prevState => {
        return { ...prevState, loading: false, err: true };
      });
    }
  }

  return (
    <>
      <div className={style.searchbar}>
        <form className={style.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images..."
            onChange={handleChange}
          />
          <button className={style.submitButton} type="submit">
            <img
              className={style.searchIcon}
              src={searchIcon}
              width="15px"
              alt="Search Icon"
            />
          </button>
        </form>
      </div>
      {filmsData.loading && <h2>Searching...</h2>}
      {filmsData.err && <h2>Something went wrong...</h2>}
      {filmsData.notFoundMessage && <h2>{filmsData.notFoundMessage}</h2>}
      {Boolean(filmsData.films.length) && <FilmsList films={filmsData.films} />}
    </>
  );
};

export default MoviesSearch;
