import { ITopFilm } from 'interfaces';
import { images } from 'images';

const TopFilm = ({ name, poster_url, thumbnail_url, slug, year, rank }: ITopFilm) => {
  return (
    <>
      <div
        className='top-film-item relative h-[150px] w-full rounded-p2 p-8'
        style={{
          backgroundImage: `url(${thumbnail_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
        }}
      >
        <div
          className='blur-bg absolute inset-0 h-full w-full rounded-p2'
          style={{
            backgroundImage:
              rank === 1
                ? 'linear-gradient(to right, rgba(204, 5, 5, 0.7), rgba(206, 135, 135, 0.7))'
                : rank === 2
                  ? 'linear-gradient(to right, rgba(220, 0, 239, 0.7), rgba(186, 122, 225, 0.7))'
                  : 'linear-gradient(to right, rgba(5, 13, 204, 0.7), rgba(184, 192, 204, 0.7))',
          }}
        ></div>
        <div className='sticker absolute left-0 top-0 -translate-y-1/2'>
          <img className='h-p12 w-p12' src={poster_url} alt='' />
        </div>
        <div className='relative z-10 flex h-full w-full items-center gap-4'>
          <div className='w-1/5 text-center text-8xl font-extrabold'>{rank}</div>
          <div className='flex h-full w-4/5 flex-col justify-between'>
            <div className='name text-lg font-extrabold uppercase'>{name}</div>
            <div className='year self-end'>{year}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopFilm;
