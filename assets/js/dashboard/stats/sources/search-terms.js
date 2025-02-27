import React from 'react';
import FadeIn from '../../fade-in'
import Bar from '../bar'
import MoreLink from '../more-link'
import numberFormatter from '../../util/number-formatter'
import RocketIcon from '../modals/rocket-icon'
import * as api from '../../api'
import LazyLoader from '../../components/lazy-loader'

export default class SearchTerms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
    this.onVisible = this.onVisible.bind(this)
    this.fetchSearchTerms = this.fetchSearchTerms.bind(this)
  }

  onVisible() {
    this.fetchSearchTerms()
    if (this.props.query.period === 'realtime') {
      document.addEventListener('tick', this.fetchSearchTerms)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({loading: true, terms: null})
      this.fetchSearchTerms()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('tick', this.fetchSearchTerms)
  }

  fetchSearchTerms() {
    api.get(`/api/stats/${encodeURIComponent(this.props.site.domain)}/referrers/Google`, this.props.query)
      .then((res) => this.setState({
        loading: false,
        searchTerms: res.search_terms || [],
        notConfigured: res.not_configured,
        isAdmin: res.is_admin
      })).catch((error) =>
        {
            this.setState({ loading: false, searchTerms: [], notConfigured: true, error: true, isAdmin: error.payload.is_admin })
        }
      )
  }

  renderSearchTerm(term) {
    return (
      <div className="flex items-center justify-between my-1 text-sm" key={term.name}>
        <Bar
          count={term.visitors}
          all={this.state.searchTerms}
          bg="bg-blue-50 bg-gray-500 dark:bg-opacity-15"
          maxWidthDeduction="4rem"
        >
          <span className="flex px-2 py-1.5 dark:text-gray-300 z-9 relative break-all">
            <span className="md:truncate block">
              { term.name }
            </span>
          </span>
        </Bar>
        <span className="font-medium dark:text-gray-200">{numberFormatter(term.visitors)}</span>
      </div>
    )
  }

  renderList() {
    if (this.props.query.filters.goal) {
      return (
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm mt-20">
          <RocketIcon />
          <div>Sorry, we cannot show which keywords converted best for goal <b>{this.props.query.filters.goal}</b></div>
          <div>Google does not share this information</div>
        </div>
      )

    } else if (this.state.notConfigured) {
      return (
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm mt-20">
          <RocketIcon />
          <div>
          This site is not connected to Search Console so we cannot show the search phrases.
          {this.state.isAdmin && this.state.error && <><br/><br/><p>Please click below to connect your Search Console account.</p></>}
          </div>
          {this.state.isAdmin && <a href={`/${encodeURIComponent(this.props.site.domain)}/settings/integrations`} className="button mt-4">Connect with Google</a> }
        </div>
      )
    } else if (this.state.searchTerms.length > 0) {
      const valLabel = this.props.query.period === 'realtime' ? 'Current visitors' : 'Visitors'

      return (
        <React.Fragment>
          <div className="flex items-center mt-3 mb-2 justify-between text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wide">
            <span>Search term</span>
            <span>{valLabel}</span>
          </div>

          {this.state.searchTerms.map(this.renderSearchTerm.bind(this))}
        </React.Fragment>
      )
    } else {
      return (
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm mt-20">
          <RocketIcon />
          <div>No search terms were found for this period. Please adjust or extend your time range. Check <a href="https://plausible.io/docs/google-search-console-integration#i-dont-see-google-search-query-data-in-my-dashboard" target="_blank" rel="noreferrer" className="hover:underline text-indigo-700 dark:text-indigo-500">our documentation</a> for more details.</div>
        </div>
      )
    }
  }

  renderContent() {
    if (this.state.searchTerms) {
      return (
        <React.Fragment>
          <h3 className="font-bold dark:text-gray-100">Search Terms</h3>
          { this.renderList() }
          <MoreLink site={this.props.site} list={this.state.searchTerms} endpoint="referrers/Google" className="w-full pb-4 absolute bottom-0 left-0"/>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <div>
        { this.state.loading && <div className="loading mt-44 mx-auto"><div></div></div> }
        <FadeIn show={!this.state.loading} className="flex-grow">
          <LazyLoader onVisible={this.onVisible}>
            { this.renderContent() }
          </LazyLoader>
        </FadeIn>
      </div>
    )
  }
}
