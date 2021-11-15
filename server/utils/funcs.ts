import { customAlphabet } from "nanoid";

// const lowercase = "abcdefghijklmnopqrstuvwxyz";
// const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "1234567890";
// const nanoid = customAlphabet(lowercase + uppercase + digits, 8);
const nanoid = customAlphabet(digits, 8);

export const getUniqueShortID = () => nanoid();
