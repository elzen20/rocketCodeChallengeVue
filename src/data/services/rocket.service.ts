import { api } from '../network/RocketCodeApiClient'
import { UserRequestDTO, UserResponseDTO } from './dto/user.dto'


export function testBackend( ): Promise<string> {
    return api.get("/api/Holamundo")
}
export function insertUser( data : UserRequestDTO ): Promise<UserResponseDTO> {
    return api.post("/api/users", data)
}