import {observable,action,configure} from 'mobx'


configure({enforceActions:"observed"})
class MainStore {
    @observable isFetching = false
    @action testFetching = (isFetching)=>{
        this.isFetching = isFetching
    }
  
}
export default new MainStore()
