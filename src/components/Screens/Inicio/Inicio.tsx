import { Box, Grid, Container, Typography } from "@mui/material";
import ChartCard from "../../ui/Cards/ChartCard/ChartCard";
import BaseBar from "../../ui/Charts/BaseBar";
import BasePie from "../../ui/Charts/BasePie";
import InicioCard from "../../ui/Cards/InicioCard/InicioCard";
import { useParams } from "react-router-dom";


// Contenido para las tarjetas de inicio
const promocionesContent = {
    url: 'https://www.grandespymes.com.ar/wp-content/uploads/2020/07/promociones.jpg',
    title: 'Promociones',
    content: 'Personaliza tus ofertas y haz que destaquen para que tus clientes no puedan resistirse.',
};

const productosContent = {
    url: 'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg',
    title: 'Productos',
    content: 'Añade nuevos platos o actualiza los precios para mejorar la experiencia de tus clientes.',
};

const insumosContent = {
    url: 'https://imagenagropecuaria.com/wp-content/uploads/2022/08/comida.j12.jpg',
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
                            <InicioCard content={promocionesContent}  sucursalId={id}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={productosContent}  sucursalId={id} />
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
