import { Box, CircularProgress } from "@mui/material";

function Loader(){
 return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
    <CircularProgress color="inherit" />
    </Box>
 )
}

export default Loader;