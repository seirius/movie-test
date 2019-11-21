import * as bcrypt from 'bcryptjs';

export function crypt(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    reject(err);
                } else {
                    bcrypt.hash(password, salt, (err2, hash) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            resolve(hash);
                        }
                    })
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}