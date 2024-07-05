import { User } from "./userInterface"
import { Letter } from "./letter"

interface Player extends User {
  receiveTime: number,
  sendTime: number,
  isAssign: boolean,
  stash: Array<Letter>
}