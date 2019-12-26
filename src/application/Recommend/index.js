import React, { useEffect } from 'react'
import Slider from '../../components/slider'
import { useSelector, useDispatch } from 'react-redux'
import * as actionTypes from './store/actionCreators'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/scroll'

function Recommend(props) {
  const { bannerList, recommendList } = useSelector(state => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList'])
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionTypes.getBannerList())
    dispatch(actionTypes.getRecommendList())
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

// 将 ui 组件包装成容器组件
export default React.memo(Recommend)
