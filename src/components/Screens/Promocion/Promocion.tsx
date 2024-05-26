import { Container } from "@mui/material"
import { TablePromociones } from "../../ui/Tables/TablePromociones/TablePromociones"


export const Promocion = () => {
  return (
    <Container maxWidth="lg" sx={{mt: 10}}>
        <TablePromociones />
    </Container>
  )
}
