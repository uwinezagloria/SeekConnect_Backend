import crypto from "crypto"
export function generateRandomToken() {
    return crypto.randomBytes(20).toString('hex');
}