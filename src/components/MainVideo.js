// Main Video 컴포넌트
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainVideoWrap, Popup } from '../style/MainVideoStyle';
import { VIDEO_LIST_REQUEST } from '../reducers/video';
import MainVideoItem from './MainVideoItem';

const MainVideo = () => {
  const { videoList } = useSelector((store) => store.video);
  const dispatch = useDispatch();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const clickVideoIndex = useCallback((e) => {
    setCurrentVideoIndex(Number(e.target.innerText));
  }, []);

  useEffect(() => {
    dispatch({
      type: VIDEO_LIST_REQUEST,
    });
  }, []);

  const lastIndex = !videoList.length ? 0 : videoList.length - 1;
  useEffect(() => {
    setCurrentVideoIndex(lastIndex);
  }, [lastIndex]);

  return (
    <>
      <MainVideoWrap>
        {videoList.length < 2 ? (
          <MainVideoItem
            className={'on'}
            // videoData={videoList[0]}
            videoData={videoList[0]}
            key={`video ${0}`}
            index={0}
          />
        ) : (
          videoList.map((video, index) => {
            return (
              <MainVideoItem
                className={currentVideoIndex === index ? 'on' : ''}
                videoData={video}
                key={`video ${index}`}
                index={index}
              />
            );
          })
        )}
        {videoList && videoList.length > 1 && (
          <ul className="video-index-button">
            {videoList.map((video, index) => {
              return (
                <li
                  className={currentVideoIndex === index ? 'on' : ''}
                  onClick={clickVideoIndex}
                  key={`videoIndex${index}`}
                >
                  {index}
                </li>
              );
            })}
          </ul>
        )}
      </MainVideoWrap>
    </>
  );
};

export default MainVideo;
