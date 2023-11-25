import {
  getData,
  getDataById,
  getRunningQueriesThunk,
} from '@/services/star-wars';
import HomePage from '@/components/features/HomePage';
import { FIRST_PAGE } from '@/constants';
import { wrapper } from '@/store/store';

export default HomePage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { _details: id, _page } = context.query;
    if (typeof id === 'string') {
      store.dispatch(getDataById.initiate(id));
    }

    const page = typeof _page === 'string' ? Number(_page) : FIRST_PAGE;

    store.dispatch(
      getData.initiate({
        name: store.getState().search.searchTerm,
        page: page,
        limit: store.getState().search.itemPerPage,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
