'use client'
import React from 'react'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import {
  Configure,
  InfiniteHits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch'
import Header from '@/components/Layouts/Header'
import CardPortofolio from '@/components/Cards/CardPortofolio'

export default function PortofolioPage() {
  const { meilisearch } = {
    meilisearch : {
      url : 'http://localhost:7700',
      key : 'fbe33ccf4c2a52274e77427d87f7eb6d6eec951823de9f4a26a972ad889d488d',
    },
  }

  const { searchClient } = instantMeiliSearch( meilisearch.url, meilisearch.key )

  return (
    <main className="main">
      <section id="portofolio"
        className="main__section h-fit bg-dark"
      >
        <div className="main__container mt-20 sm:mt-20 flex flex-col gap-4">
          <Header text="Portofolio"
            link={'/'}
          />

          <div className="flex flex-col gap-8 h-full pb-4">
            <InstantSearch indexName="portofolio"
              searchClient={searchClient}
            >
              <Configure hitsPerPage={9} />
              <div className="flex gap-4 justify-between">
                <SearchBox
                  placeholder="Search"
                  search-as-you-type={false}
                  classNames={{
                    form : 'relative flex items-center justify-center relative overflow-visible text-white p-2 group border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default focus-within:border-white/50 border-white/25 md:max-w-xs w-full flex items-center gap-2',
                    input :
                      'w-full bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none text-base',
                    submit : 'absolute right-4',
                    submitIcon :
                      'w-4 h-4 fill-current group-focus:text-white/50 text-white/25',
                    reset :
                      'absolute right-4 group-focus:text-white/50 text-white/25',
                  }}
                ></SearchBox>
              </div>
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InfiniteHits
                    hitComponent={Hit}
                    showPrevious={false}
                    classNames={{
                      root             : 'flex flex-col gap-8',
                      list             : 'list-none ml-0',
                      loadMore         : 'button button-secondary',
                      disabledLoadMore : 'button button-disabled',
                    }}
                  />
                </div>
              </div>
            </InstantSearch>
          </div>
        </div>
      </section>
    </main>
  )
}

const Hit = ( { hit } ) => (
  //   <article key={hit.id}>
  //     <img src={hit.image}
  //       alt={hit.name}
  //     />
  //     <h1>{hit.name}</h1>
  //     <p>${hit.description}</p>
  //   </article>
  <div key={hit.id}>
    <CardPortofolio data={hit}
      index={1}
      link
      color="bg-dark-secondary"
    />
  </div>
  //   <pre>{JSON.stringify( hit, null, 2 )}</pre>
)
