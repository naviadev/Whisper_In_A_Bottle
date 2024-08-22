import axios, { AxiosResponse } from "axios";

// eslint-disable-next-line import/no-unresolved
import PlayerDTO from "../../../../../shared/dtos/player.dto";
import REQUEST_PORT from "../../../ts/enums/request_port.enum";
/**
 * * Function : RegisterAxios
 * 작성자 : @naviadev / 2024-07-20
 * 편집자 : @naviadev / 2024-07-20
 * Issue : WIB-14
 * @description : 'RESTful API 서버로 요청을 보내는 Axios 모듈'
 */
const RegisterAxios = async (registerData: PlayerDTO): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__REGISTER_PORT,
      registerData
    );

    console.log(response.data.message);
    console.log(response.status);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("중복");
    console.error(err);
    return false;
  }
};

export default RegisterAxios;
