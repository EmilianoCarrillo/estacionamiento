import { Auto } from './Auto';
import { Usuario } from './Usuario';

export class Reservacion{
  id:string;
  auto :Auto;
  usuario: Usuario;
  cajon: string;
  horaEntrada: any;
  horaSalida: any;
} 