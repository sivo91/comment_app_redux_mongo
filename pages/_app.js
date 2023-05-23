import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../components/Layout'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/reduxFile/store';
import { Provider } from 'react-redux';


function App({ Component, pageProps: {session, ...pageProps} }) {


  return (
    <>
     
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></Script>
     
        <Provider store={store}>
          <Layout>
                <Component {...pageProps} />
          </Layout>
        </Provider>

        <ToastContainer position='top-left' limit={1} />
    </>
  )
}



export default App;