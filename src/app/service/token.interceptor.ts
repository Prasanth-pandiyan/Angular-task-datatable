import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export class TokenInterceptor implements HttpInterceptor {
    constructor() { } intercept(request: HttpRequest<any>, next: HttpHandler) {

        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmFzYW50aHJveHgxQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IjBhRHhyNE9QVDlZRlZ4SlYyaXBCeFd2MlBhSWlMWWQyNklOcFpqd3dYbUhIT2dEUXFLZ3FaT1dOUlNONlgyald1NmMifSwiZXhwIjoxNjM5MzA1NDk0fQ.9Ck9_21Z_7iKrldkH-coN38nq-v_mzSHmij5Q24CYB4'
        if (token != 'null') {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(request);
        }

        let newHeaders = request.headers;
        const request2 = request.clone({headers: newHeaders});

        return next.handle(request2).pipe(
            finalize(() => {
            }),
            tap()
        );

    }
}