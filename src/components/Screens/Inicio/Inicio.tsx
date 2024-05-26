import { Box, Grid, Container, Typography } from "@mui/material";
import ChartCard from "../../ui/Cards/ChartCard/ChartCard";
import BaseBar from "../../ui/Charts/BaseBar";
import BasePie from "../../ui/Charts/BasePie";
import InicioCard from "../../ui/Cards/InicioCard/InicioCard";
import { useParams } from "react-router-dom";


// Contenido para las tarjetas de inicio
const productosContent = {
    url: "https://w6h5a5r4.rocketcdn.me/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg",
    title: "Productos",
    content:
      "Agrega productos novedosos, edita los precios y ten contentos a tus clientes.",
  };

  const promocionesContent = {
    url: "https://www.grandespymes.com.ar/wp-content/uploads/2020/07/promociones.jpg",
    title: "Promociones",
    content:
      "Genera promociones para tus distintas sucursales y atrae a nuevos clientes.",
  };

const insumosContent = {
    url: 'https://revistamj.com/wp-content/uploads/2020/08/278_FoodStorage101_Hero_2X-980x461.jpg',
    title: 'Insumos',
    content: 'Agrega, actualiza o elimina los insumos de tu sucursal'
};


// Estilo para las tarjetas
const cardStyle = {
    width: "100%",
    height: "100%",
};

//Renderización del componente
const Inicio: React.FC = () => {
    const { sucursalId } = useParams<{ sucursalId: string }>();
    const id = sucursalId || '';
    return (
        <Box component="main" sx={{ flexGrow: 1, pt: 10}}>
            <Container>
                <Typography component="h1" variant="h5" color="initial" >¡Bienvenido!</Typography>
                        
                <Grid container spacing={3} sx={{ alignContent: 'center' , justifyContent: 'center'}}>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={productosContent}  sucursalId={id} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={promocionesContent}  sucursalId={id}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={insumosContent}  sucursalId={id} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ py: 2, alignContent: 'center' , justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <ChartCard title="Gráfico de Pastel">
                            <BasePie />
                        </ChartCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ChartCard title="Gráfico de Barras">
                            <BaseBar />
                        </ChartCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Inicio;
