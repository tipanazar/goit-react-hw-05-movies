import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import style from './filmsList.module.css';

const FilmsList = ({ films }) => {
  const from = useLocation();
  const partOfCode = films.map(film => {
    return (
      <li className={style.filmListItem} key={film.id}>
        <Link to={`/movies/${film.id}`} state={{ from: from }}>
          {film.poster_path ? (
            <img
              className={style.filmListItemImg}
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt="Film Poster"
              loading="lazy"
            ></img>
          ) : (
            <img
              className={style.filmListItemImg}
              src="https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=20&m=1216251206&s=170667a&w=0&h=A72dFkHkDdSfmT6iWl6eMN9t_JZmqGeMoAycP-LMAw4="
              alt="Film Poster"
              loading="lazy"
            ></img>
          )}

          {film.title ? (
            <h4 className={style.filmTitle}>{film.title}</h4>
          ) : (
            <h4 className={style.filmTitle}>{film.original_name}</h4>
          )}
        </Link>
      </li>
    );
  });

  return <ul className={style.filmsList}>{partOfCode}</ul>;
};

export default memo(FilmsList);

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      original_name: PropTypes.string,
    }).isRequired
  ).isRequired,
};
