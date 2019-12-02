import { Auto } from './Auto';
import { Usuario } from './Usuario';

export class Reservacion{
  auto :Auto;
  usuario: Usuario;
  cajon: string;
  horaEntrada: Date;
  horaSalida: Date;
} 