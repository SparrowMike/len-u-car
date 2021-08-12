import React from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  makeStyles,
  Card,
  CardActions,
  CardMedia,
  Grid,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      // boxShadow: "0 0 1px 1px #9d0208 inset",
      boxShadow: "0 0.6em 0.5em -0.4em lightgrey",
      transform: "translateY(-0.15em)",
      cursor: "pointer",
    },
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

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
  const classes = useStyles();
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

  if (data === undefined) {
    return null;
  }
  const dataLength = data.pages.reduce((counter, page) => {
    return counter + page.results.length;
  }, 0);

  console.log(data?.pages[0].results.slice(0, 5));

  return (
    <div
      className="scrollableDiv"
      style={{ height: "100%", overflowY: "scroll" }}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h1>Loading...</h1>}
        // height={300}
        scrollableTarget="scrollableDiv"
      >
        <Grid container spacing={4}>
          {data.pages.map((car, index) => (
            <React.Fragment key={index}>
              {car.results.map((car) => (
                <Grid item key={car.name} xs={12} sm={6} md={4}>
                  <Card className={classes.root}>
                    <CardHeader title={car.name} subheader={car.model} />
                    <CardMedia
                      className={classes.media}
                      image="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                      onClick={() => console.log(car.model)}
                    />
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>

        {/* {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.results.map((character) => (
              <>
                <p>Name: {character.name}</p>
                <p key={character.model}>Model: {character.model}</p>
              </>
            ))}
          </React.Fragment>
        ))} */}
      </InfiniteScroll>
    </div>
  );
}
