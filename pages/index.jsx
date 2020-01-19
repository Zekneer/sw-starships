import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

function Index({ films }) {  
  return (
    <Grid 
      container 
      justify="center" 
      alignItems="center" 
    >
      <Grid item>
        <Card>
          <List>
            {films.map((film, id) => {
              return (
                <Link 
                  href="/film/[id]" 
                  as={`/film/${id + 1}`} 
                  key={film.episode_id}
                >
                  <ListItem button>
                    <ListItemText>
                        {film.title}
                    </ListItemText>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

Index.getInitialProps = async function() {
  const response = await axios("https://swapi.co/api/films");
  return {
    films: response.data.results,
  };
};

export default Index;
