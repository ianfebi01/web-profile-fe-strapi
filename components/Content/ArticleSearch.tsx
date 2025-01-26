'use client'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { Configure, SearchBox } from 'react-instantsearch'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import { ApiArticleArticle } from '@/types/generated/contentTypes'
import CustomInfiniteHits from '../CustomInfiniteHits'
import ArticleCard from '../Cards/ArticleCard'
import NoDataFound from '../NoDataFound'
import { NoResultsBoundary } from '../NoResutsBoundary'

const ArticleSearch = () => {
  const { meilisearch } = {
    meilisearch: {
      url: process.env.NEXT_PUBLIC_SEARCH_URL || '',
      key: 'f598c7625ca63ad729f64c8a64501dffbc49235d66a879c77a7638a660407676',
    },
  }

  const { searchClient } = instantMeiliSearch(meilisearch.url, meilisearch.key)

  let timerId: any = undefined
  const timeout = 500

  function queryHook(query: string, search: any) {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => search(query), timeout)
  }

  return (
    <div className="flex flex-col gap-8 h-full pb-4">
      <InstantSearchNext
        indexName="article"
        searchClient={searchClient}
        routing
      >
        <Configure hitsPerPage={9} />
        <div className="flex gap-4 justify-between">
          <SearchBox
            placeholder="Search"
            searchAsYouType={true}
            classNames={{
              form: 'relative flex items-center justify-center relative overflow-visible text-white p-2 group border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default focus-within:border-white/50 border-white/25 md:max-w-xs w-full flex items-center gap-2',
              input:
                'w-full bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none text-base',
              submit: 'absolute right-4',
              submitIcon:
                'w-4 h-4 fill-current group-focus:text-white/50 text-white/25',
              reset: 'absolute right-4 group-focus:text-white/50 text-white/25',
            }}
          ></SearchBox>
        </div>
        <div>
          <NoResultsBoundary fallback={<NoDataFound />}>
            <CustomInfiniteHits
              wrapperClass="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 list-none"
              component={Hit}
            />
          </NoResultsBoundary>
        </div>
      </InstantSearchNext>
    </div>
  )
}

export default ArticleSearch

const Hit = ({
  hit,
}: {
  hit: ApiArticleArticle['attributes'] & { id: string }
}) => (
  <>
    <ArticleCard data={hit} />
  </>
)
