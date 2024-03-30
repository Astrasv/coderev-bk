import jwt, { Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.SECRET_KEY ?? "your-secret-key-here";

interface claims {
    userid: string,
    username : string
}

export default function newToken(payload: claims, days: number): string {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: `${days} days`
    });
    return token; 
}
