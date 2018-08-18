import { encode, decode } from 'quoted-printable';

export const qpEncode = (text: string) => encode(text);

export const qpDecode = (data: string) => decode(data);
