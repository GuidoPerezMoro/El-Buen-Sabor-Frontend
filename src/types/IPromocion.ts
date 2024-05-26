import DataModel from "./DataModel";

export default interface IPromocion extends DataModel<IPromocion>{
  id: number;
  denominacion: string;
  fechaDesde: string;
  fechaHasta: string;
  horaDesde: string;
  horaHasta: string;
  descripcionDescuento: string;
  precioPromocional: number;
  tipoPromocion: string;
  idSucursales: number[];
  detalles: {
    cantidad: number;
    idArticulo: number;
  }[];
}