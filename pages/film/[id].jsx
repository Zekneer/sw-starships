import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

function Index({ film, starships }) {
  return (
    <Grid 
      container 
      justify="center" 
      alignItems="center" 
    >
      <Grid item>
        <Card>
          <CardHeader title={film.title} />
          <CardContent>
            {film.opening_crawl}
          </CardContent>
          <Typography variant="h4" component="h4" align="center">
              Starships in this movie:
          </Typography>
          <CardActions>
            <List>
              {starships.map(starship => {
                const starshipId = starship.url.match(/(\d+)\/$/)[1];

                return (
                  <Link 
                    href="/starship/[id]" 
                    as={`/starship/${starshipId}`} 
                    key={starship.name}
                  >
                    <ListItem button>
                      <ListItemText>
                          {starship.name}
                      </ListItemText>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

Index.getInitialProps = async function(ctx) {
  const { id = 1 } = ctx.query;
  const response = await axios(`https://swapi.co/api/films/${id}`);
  const film = response.data;

  const starships = await Promise.all(film.starships.map(async starshipUrl => {
    const response  = await axios(starshipUrl);
    return response.data;
  }));
  return {
    film,
    starships,
  };
};

export default Index;
