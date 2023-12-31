import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';



const App = () => {


    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;


// import Form from './components/Form/Form';
// import { getPosts } from './actions/posts';
// import useStyles from './styles';
// import memories from './images/memories.png';

// // const App = () => {
// //   const [currentId, setCurrentId] = useState(0);
// const App = () => {
//     return (

//         <Container maxWidth="lg">
//       <AppBar className={classes.appBar} position="static" color="inherit">
//         <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
//         <img className={classes.image} src={memories} alt="icon" height="60" />
//       </AppBar>
//       <Grow in>
//         <Container>
//           <Grid container justify="space-between" alignItems="stretch" spacing={3}>
//             <Grid item xs={12} sm={7}>
//               <Posts setCurrentId={setCurrentId} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Form currentId={currentId} setCurrentId={setCurrentId} />
//             </Grid>
//           </Grid>
//         </Container>
//       </Grow>
//     </Container>
        
//   );
// };
// export default App;