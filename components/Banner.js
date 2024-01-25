import { Fragment } from 'react';

export default function Banner({ title, subTitle, imgUrl }) {
  const handlePlayVideo = () => {
    console.log('Play video');
  };

  return (
    <Fragment>
      <h3>{title}</h3>
      <h3>{subTitle}</h3>
      <button onClick={handlePlayVideo}>Play</button>
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Fragment>
  );
}
