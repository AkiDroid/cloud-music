import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import Slider from '../../components/slider'
import Loading from '../../baseUI/loading/index'
import * as actionTypes from './store/actionCreators'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/scroll'

function Recommend(props) {
  const { bannerList, recommendList } = useSelector(state => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList'])
  }))
  const enterLoading = useSelector(state =>
    state.getIn(['recommend', 'enterLoading']))

  const dispatch = useDispatch()

  useEffect(() => {
    if (!bannerList.size) {
      dispatch(actionTypes.getBannerList())
    }
    if (!recommendList.size) {
      dispatch(actionTypes.getRecommendList())
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      <Loading show={enterLoading}/>
    </Content>
  )
}

// 将 ui 组件包装成容器组件
export default React.memo(Recommend)
