import { UserState } from '../entities/user-state.entity';
import { LetterState } from '../entities/letter-state.entity';
import { Letter } from '../entities/letter.entity';

const user_1 = new UserState();
user_1.id = '1';
user_1.receiveTime = 100;
user_1.lastLoginIp = '192.0.0.1';
user_1.lastLoginTime = 2000;

const user_2 = new UserState();
user_2.id = '2';
user_2.receiveTime = 200;
user_2.lastLoginIp = '192.0.0.2';
user_2.lastLoginTime = 3000;

const user_3 = new UserState();
user_3.id = '3';
user_3.receiveTime = 1000;
user_3.lastLoginIp = '192.0.0.3';
user_3.lastLoginTime = 400;

const user_4 = new UserState();
user_4.id = '4';
user_4.receiveTime = 500;
user_4.lastLoginIp = '192.0.0.4';
user_4.lastLoginTime = 500;

const letterState = new LetterState();
letterState.letterId = 1;
letterState.receiverId = '2';
letterState.sendTime = 5000;
letterState.senderId = '1';

const letter = new Letter();
letter.letterId = 1;
letter.content = 'Test';

export { user_1, user_2, user_3, user_4, letterState, letter };
