import React, { useState } from 'react';
import { useDispatch, useEffect } from 'react-redux';
import {
  selectVideo,
  loadVideoDetails,
  IS_VIDEO_SELECT,
  IS_VIDEO_UNSELECT,
} from '../reducers/video';

const VideoItem = ({ video, thumbnail, title, onClickRadio }) => {
  const [isSelect, setSelect] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setSelect(!isSelect);
  };

  const handleChange = () => {
    toggle();
    // isSelect
    //   ? dispatch({ type: IS_VIDEO_SELECT })
    //   : dispatch({ type: IS_VIDEO_UNSELECT });
    //선택한 아이템을 selectedVideo로 담아줌
    dispatch(selectVideo(video));
    //선택한 아이템의 contentDetails를 호출하고 정보를 selectedDetails에 담아줌.
    dispatch(loadVideoDetails(video));
  };

  return (
    <div onClick={onClickRadio}>
      <input
        type="radio"
        name="videoRadio"
        checked={isSelect}
        onChange={handleChange}
      />
      <img src={thumbnail} />
      <div>{title.slice(0, 24).concat('...')}</div>
    </div>
  );
};

export default VideoItem;
