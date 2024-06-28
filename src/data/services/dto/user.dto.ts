export interface UserRequestDTO {
    nombre: string;
    segundoNombre?: string | null;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaDeNacimiento: Date;
    email: string;
    telefono: string;
}

export interface UserResponseDTO {
    id: number;
    nombre: string;
    segundoNombre?: string | null;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaDeNacimiento: Date;
    email: string;
    telefono: string;
}
