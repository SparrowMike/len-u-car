import React from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

type CharactersPage = {
  results: Character[];
  next: number | undefined;
};
type Character = {
  name: string;
  model: string;
  title: string;
};

async function getData({ pageParam = 1 }) {
  const response = await fetch(
    `https://swapi.dev/api/vehicles/?page=${pageParam}`
    // `https://api.themoviedb.org/3/discover/movie?api_key=28f61172b752209fb2807f08057c9e1f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageParam}&with_watch_monetization_types=flatrate`
  );
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const dataFromServer = await response.json();
  assertIsCharacterResponse(dataFromServer);
  const data: CharactersPage = {
    results: dataFromServer.results,
    next: dataFromServer.next === null ? undefined : pageParam + 1,
  };
  return data;
}

type CharacterResponse = {
  results: Character[];
  next: string;
};
function assertIsCharacterResponse(
  response: any
): asserts response is CharacterResponse {
  if (!("results" in response && "next" in response)) {
    throw new Error("Not results");
  }
  if (response.results.length > 0) {
    const firstResult = response.results[0];
    if (!("name" in firstResult)) {
      throw new Error("Not characters");
    }
  }
}

export function PaginationTEST() {
  const {
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery<CharactersPage, Error>("characters", getData, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  console.log(data);

  if (data === undefined) {
    return null;
  }
  const dataLength = data.pages.reduce((counter, page) => {
    return counter + page.results.length;
  }, 0);

  return (
    <div
      className="scrollableDiv"
      // style={{ height: "100%", overflowY: "scroll" }}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        height={300}
        hasMore={!!hasNextPage}
        loader={<div>Loading...</div>}
        // scrollableTarget="scrollableDiv"
      >
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.results.map((character) => (
              <>
                <p>Name: {character.name}</p>
                <p key={character.model}>Model: {character.model}</p>
              </>
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
}
