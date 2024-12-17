import { Link } from 'react-router-dom';

import { IFilm } from 'interfaces';
import { images } from 'images';

const Film = ({ name, slug, poster_url, className, id, ...props }: IFilm) => {
  return (
    <Link to={`/film-detail/${id}/${slug}`} className={className}>
      <img className='pointer-events-none mb-p2 h-[224px] w-full rounded-p2 sm:h-[238px]' src={poster_url} alt='' />
      <div className='line-clamp-2 h-12 text-lg font-extrabold leading-6' title={name}>
        {name}
      </div>
    </Link>
  );
};

export default Film;
