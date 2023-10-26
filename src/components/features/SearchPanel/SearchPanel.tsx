import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import CardList from '@/components/features/CardList';
import { getApiData } from '@/services/sw-service';
import type { EmptyObject, IPeople } from '@/types';

import styles from './SearchPanel.module.scss';

const SEARCH_PLACEHOLDER = 'You looking for, who are?';

interface State {
  query: string;
  isLoading: boolean;
  data: IPeople[];
}

export default class SearchPanel extends Component<EmptyObject, State> {
  controller?: AbortController;

  state: State = {
    query: '',
    isLoading: false,
    data: [],
  };

  getData = async () => {
    this.controller = new AbortController();
    this.setState({
      ...this.state,
      isLoading: true,
      data: [],
    });
    const queryParams = this.state.query
      ? [{ key: 'search', value: this.state.query }]
      : [];
    try {
      const data = await getApiData(queryParams, {
        signal: this.controller.signal,
      });
      this.setState({
        ...this.state,
        isLoading: false,
        data: data.results,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return;
        }
      }
      this.setState({
        ...this.state,
        isLoading: false,
      });
      throw error;
    }
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.controller?.abort();
  }

  handleSearch = () => {
    this.getData();
  };

  render() {
    return (
      <div>
        <div className={styles.panel}>
          <TextField
            name="search"
            className={styles.input}
            placeholder={SEARCH_PLACEHOLDER}
            autoComplete="off"
            value={this.state.query}
            onChange={(event) => {
              this.setState({
                query: event.target.value,
              });
            }}
          />
          <Button
            onClick={this.handleSearch}
            startIcon={<FaSearch />}
            className={styles.btn}
            disabled={this.state.isLoading}
          >
            Search
          </Button>
        </div>
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <CardList items={this.state.data} />
        )}
      </div>
    );
  }
}
