import {observable,action,configure} from 'mobx'
import {getQueryMap} from '../../utils/common'

configure({enforceActions:"observed"})
class AppStore {
  @observable name = ''

  @action
  getParamFromURL = ()=>{
    const params = getQueryMap(window.location.href)
    this.name = params && params.name
  }
}
export default new AppStore()