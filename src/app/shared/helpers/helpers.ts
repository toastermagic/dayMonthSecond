import {Injectable} from '@angular/core';

@Injectable()
export class DmsHelpers {
    suppressKey(objIn: Object) {
        let copy = {};

        Object.keys(objIn).forEach((key: string) => {
            if (!key.startsWith('$')) {
                copy[key] = objIn[key];
            }
        });

        return copy;
    }
}