import { UserState } from '../../../../../shared/entities/user-state.entity';
import { LetterState } from '../../../../../shared/entities/letter-state.entity';
import { Letter } from '../../../../../shared/entities/letter.entity';

const user_1 = new UserState();
user_1.id = '1';
user_1.receive_time = 100;
user_1.last_login_ip = '192.0.0.1';
user_1.last_login_time = 2000;

const user_2 = new UserState();
user_2.id = '2';
user_2.receive_time = 200;
user_2.last_login_ip = '192.0.0.2';
user_2.last_login_time = 3000;

const user_3 = new UserState();
user_3.id = '3';
user_3.receive_time = 1000;
user_3.last_login_ip = '192.0.0.3';
user_3.last_login_time = 400;

const user_4 = new UserState();
user_4.id = '4';
user_4.receive_time = 500;
user_4.last_login_ip = '192.0.0.4';
user_4.last_login_time = 500;

const letterState = new LetterState();
letterState.letter_id = 1;
letterState.receiver_id = '2';
letterState.send_time = 5000;
letterState.sender_id = '1';

const letter = new Letter();
letter.letter_id = 1;
letter.content = 'Test';

export { user_1, user_2, user_3, user_4, letterState, letter };
