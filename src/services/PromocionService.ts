// Importamos el tipo de dato IArticuloManufacturado y la clase BackendClient
import IPromocion from "../types/IPromocion";
import PromocionPost from "../types/post/PromocionPost";
import  BackendClient  from "./BackendClient";

// Clase ProductoService que extiende BackendClient para interactuar con la API de personas
export default class PromocionService extends BackendClient<IPromocion | PromocionPost> {}