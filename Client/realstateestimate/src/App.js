import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { TextField, Typography, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';



function App() {
  const [area, setArea] = useState(0);
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(3);
  const [location, setLocation] = useState("");
  const [price,setPrice]=useState(0);
  const [locationlist,setLocationList]=useState([])

 
  async function  handleSubmit(event)
  {
      event.preventDefault();
      try{
            const response=  await axios.post("http://127.0.0.1:5000/predict_home_price",
              {
                  total_sqft:parseFloat(area),
                  location:location,
                  bhk:bhk,
                  bath:bath
  
              },
              {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
              );
              console.log("Data inserted succesfully!");
              setPrice(response.data.estimated_price)
              setArea(0)
             
          }
          catch(err)
          {
          var msg=err.response.data;
             console.log(err.response.data);
             //setError(msg);
          }
          


          // setAList([...alist,{name:name,address:address,nic:nic,timevalue:timevalue.format('hh:mm A')}]);
         

      }
  const handleBhk = (event) => {
    setBhk(event.target.value);
  };

  const handleBath = (event) => {
    setBath(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };
  useEffect(()=>
    {
     fetch("http://127.0.0.1:5000/get_location_names").then((response)=>
     {
       return response.json();
     }).then((responseData)=>
     {
       console.log(responseData.locations);
       setLocationList(responseData.locations);
     })
 
    },[]);

  return (
    <div className="App">
      <Container>
        <Typography textAlign="center" variant="h4" color="GrayText" marginBottom="25px" marginTop="10px">
          Predict your Dream House
        </Typography>
        <form autoComplete="false" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField sx={{ margin: 1 }} value={area} required onChange={(e) => { setArea(e.target.value) }} variant='outlined' label='Area(square-feet)' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="bhk-label">BHK</InputLabel>
                <Select
                  labelId="bhk-label"
                  id="bhk-select"
                  value={bhk}
                  label="BHK"
                  onChange={handleBhk}
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="bhk-label">Bath</InputLabel>
                <Select
                  labelId="bath-label"
                  id="bath-select"
                  value={bath}
                  label="Bath"
                  onChange={handleBath}
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="bhk-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  id="location-select"
                  value={location}
                  label="location"
                  onChange={handleLocation}
                >{locationlist.map((item)=>(
                  <MenuItem key={item} value={item}>{item}</MenuItem>

                ))}
                 
                </Select>
              </FormControl>
            </Grid>
            <Button sx={{
        marginTop:3,
        marginBottom:5,
        marginLeft:2,
        backgroundColor: '#79CCBE', // Replace with your desired color
        '&:hover': {
          backgroundColor: '#79CCBE', // Replace with your desired hover color
        },
      }} variant="contained"  type="submit" >Estimate Price</Button>
    
          </Grid>

        </form>
        <h2>{price} lakh</h2>
      </Container>
    </div>
  );
}

export default App;
