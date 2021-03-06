import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as daylogAction from '../reducers/dayLog';
import waterImg from '../../water_icon1.png';

const DaylogEntry = ({ daylog }) => {
  //console.log('daylog entry called');
  //console.log('daylog entry props?', daylog);
  const dispatch = useDispatch();
  const youtubeTimeConvert = (second) => {
    let hour = parseInt(second / 3600);
    let min = parseInt((second - hour * 3600) / 60);
    let sec = parseInt(second - (hour * 3600 + min * 60));

    if (hour.toString().length === 1) hour = '0' + hour;
    if (min.toString().length === 1) min = '0' + min;
    if (sec.toString().length === 1) sec = '0' + sec;
    //console.log('youtube time', second, 'hour', hour, 'min', min, 'sec', sec);
    return hour + ':' + min + ':' + sec;
  };
  const log = {
    videoTitle: daylog.Videos[0].youtubeTitle,
    message: daylog.message,
    weight: daylog.Healthlog.weight,
    videoTime: youtubeTimeConvert(daylog.Videos[0].youtubeTime),
    water: Array.from(Array(daylog.Healthlog.water).keys()),
    tag: daylog.Tags,
  };
  //console.log('videoTitle', videoTitle, 'weight', weight);
  //console.log('log.water', log.water, daylog.Healthlog.water);
  //console.log('get tag data', log.tag);

  const filterTag = (e) => {
    const name = e.target.className;
    //console.log('e.target', e.target);
    //console.log('tag clicked!', name);
    dispatch(daylogAction.filterDaylogTag(name));
  };
  //water === 0 일때 배열 생성됨
  if (daylog.Healthlog.water === null) {
    log.water.pop();
  }
  console.log('log water????', log.water, daylog.Healthlog.water);

  return (
    <div className="daylog-item">
      <div className="title">
        [ {log.videoTitle} ]
        <div className="water-and-health">
          <p> 운동 시간 : {log.videoTime}</p>
          {log.weight !== null && (
            <p className="weight">{' ' + log.weight + ' kg'} </p>
          )}
          {log.water && (
            <ul className="water-log">
              {log.water.map((el) => {
                return (
                  <li>
                    <img src={waterImg} width="24px" height="24px" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="health-feel">{log.message}</div>
      <ul className="tag-list">
        {log.tag &&
          log.tag.map((tag) => {
            //console.log('tag 가져오기 map', tag);
            return (
              <li className={tag.id} onClick={filterTag}>
                {tag.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DaylogEntry;
