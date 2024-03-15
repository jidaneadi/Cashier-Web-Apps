export default function ({store, redirect}) {
  if(!store.getters['auth/authitencated']){
    return redirect('/')
  }
}
