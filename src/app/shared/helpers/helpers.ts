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

    sanitiseProfile(objIn: Object) {
        let copy = {};

        Object.keys(objIn).forEach((key: string) => {
            if (key.includes('token') ||
                key.includes('firebase') ||
                key.includes('_id') ||
                key === 'identities' ||
                key === 'clientID') {
                return;
            }
            copy[key] = objIn[key];
        });

        return copy;
    }

    generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now(); // use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}