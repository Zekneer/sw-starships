import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Starship({ starship }) {
  return (
    <Grid 
      container 
      justify="center" 
      alignItems="center" 
    >
      <Grid item>
        <Card>
          <CardHeader title={starship.name} />
          <CardContent>
            <Typography>
                {`Model of starship: ${starship.model}`}
            </Typography>
            <Typography>
                {`Passengers of starship: ${starship.passengers}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Starship.getInitialProps = async function(ctx) {
  const { id = 1 } = ctx.query;
  const response = await axios(`https://swapi.co/api/starships/${id}`);
  const starship = response.data;

  return {
    starship,
  };
};

export default Starship;
