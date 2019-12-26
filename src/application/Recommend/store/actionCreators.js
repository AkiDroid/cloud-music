import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  // 异步dispatch, 应该是redux-thunk提供的功能
  return (dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners))
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log('轮播图数据传输错误')
    })
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result))
    }).catch(() => {
      console.log('推荐歌单数据传输错误')
    })
  }
}
