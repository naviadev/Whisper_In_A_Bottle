import { UserState } from '../../../../../shared/entities/user_state.entity';
import { LetterState } from '../../../../../shared/entities/letter_state.entity';
import { Letter } from '../../../../../shared/entities/letter.entity';
import { LetterSaveDTO } from '@shared/dtos/letter.dto';

const user_1 = new UserState();
user_1.id = 'user1';
user_1.receive_time = 100;
user_1.last_login_ip = '192.0.0.1';
user_1.last_login_time = 2000;

const user_2 = new UserState();
user_2.id = 'user2';
user_2.receive_time = 200;
user_2.last_login_ip = '192.0.0.2';
user_2.last_login_time = 3000;

const user_3 = new UserState();
user_3.id = 'user3';
user_3.receive_time = 1000;
user_3.last_login_ip = '192.0.0.3';
user_3.last_login_time = 400;

const user_4 = new UserState();
user_4.id = 'user4';
user_4.receive_time = 500;
user_4.last_login_ip = '192.0.0.4';
user_4.last_login_time = 500;

const letterState = new LetterState();
letterState.letter_id = 1;
letterState.receiver_id = user_2.id;
letterState.send_time = 5000;
letterState.sender_id = user_1.id;

const letter = new Letter();
letter.content = 'Test';

const letter_2 = new Letter();
letter.content = 'Test';

const userToken_1 = {
  username: 'user1',
  sub: 'user1',
};

const userToken_2 = {
  username: 'user2',
  sub: 'user2',
};

const userToken_3 = {
  username: 'user3',
  sub: 'user3',
};

const saveLetterDto: LetterSaveDTO = {
  userId: 'user1',
  letterId: 1,
};

const saveLetterDto_2: LetterSaveDTO = {
  userId: 'user2',
  letterId: 2,
};

export {
  user_1,
  user_2,
  user_3,
  user_4,
  letterState,
  letter,
  letter_2,
  userToken_1,
  userToken_2,
  userToken_3,
  saveLetterDto,
  saveLetterDto_2,
};
